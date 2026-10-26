#!/usr/bin/env node
/**
 * 抓取 Steam 公开数据 → steam.json
 * ------------------------------------------------------------
 * 由 GitHub Actions 定时运行，也支持本地手动跑：
 *   STEAM_API_KEY=xxx STEAM_ID=7656... node scripts/fetch-steam.js
 *
 * 只用两个官方接口，都不需要登录：
 *   1) IPlayerService/GetOwnedGames          —— 游戏库（数量、总时长、最近玩的）
 *   2) IPlayerService/GetRecentlyPlayedGames —— 最近两周玩过的
 *   3) ISteamUser/GetPlayerSummaries         —— 昵称、头像、状态、当前游戏
 *
 * 需要的配置：
 *   STEAM_API_KEY   Steam Web API Key（https://steamcommunity.com/dev/apikey）
 *   STEAM_ID        64 位 SteamID（个人资料页 URL 里的那串数字）
 *
 * 任何一个接口失败都不会让整个脚本挂掉，字段会退化为 null，
 * 前端会显示「暂无数据」而不是报错。
 */

const fs = require("fs");
const path = require("path");

const API_KEY = process.env.STEAM_API_KEY || "";
const STEAM_ID = process.env.STEAM_ID || "";

const OUT = path.join(process.cwd(), "steam.json");
const COVER_DIR = path.join(process.cwd(), "assets", "steam");

/**
 * Steam 的封面图在 cdn.akamai.steamstatic.com，国内经常打不开。
 * 所以抓取时顺手把封面下载到 assets/steam/，页面用同源图片，
 * 不依赖外网 CDN，也不会被墙。
 */
async function cacheCover(appid, name) {
  const file = `${appid}.jpg`;
  const dest = path.join(COVER_DIR, file);
  const rel = `assets/steam/${file}`;

  if (fs.existsSync(dest) && fs.statSync(dest).size > 1024) return rel;

  const url = `https://cdn.akamai.steamstatic.com/steam/apps/${appid}/header.jpg`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "sy1lo-site-steam-fetcher" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1024) throw new Error("too small");
    fs.mkdirSync(COVER_DIR, { recursive: true });
    fs.writeFileSync(dest, buf);
    return rel;
  } catch (e) {
    console.warn(`cover failed for ${name} (${appid}): ${e.message}`);
    return null;
  }
}

async function getJSON(url) {
  const res = await fetch(url, { headers: { "User-Agent": "sy1lo-site-steam-fetcher" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json();
}

/** 秒 → "123.4 小时" / "12 分钟" */
function humanTime(seconds) {
  if (!seconds || seconds < 60) return `${Math.round(seconds / 60)} 分钟`;
  const hours = seconds / 3600;
  if (hours < 1) return `${Math.round(seconds / 60)} 分钟`;
  return `${hours.toFixed(1)} 小时`;
}

async function main() {
  if (!API_KEY || !STEAM_ID) {
    console.error("缺少 STEAM_API_KEY 或 STEAM_ID 环境变量");
    process.exit(1);
  }

  const base = "https://api.steampowered.com";
  const out = {
    updatedAt: new Date().toISOString(),
    profile: null,
    stats: null,
    recent: [],
    topGames: [],
    error: null
  };

  /* ---- 1. 玩家资料 ---- */
  try {
    const d = await getJSON(
      `${base}/ISteamUser/GetPlayerSummaries/v2/?key=${API_KEY}&steamids=${STEAM_ID}`
    );
    const p = d?.response?.players?.[0];
    if (p) {
      out.profile = {
        name: p.personaname,
        avatar: p.avatarfull || p.avatarmedium || p.avatar,
        profileUrl: p.profileurl,
        state: p.personastate,          // 0 离线 1 在线 2 忙碌 3 离开 4 打盹 5 想交易 6 想玩
        stateText: ["离线", "在线", "忙碌", "离开", "打盹", "想交易", "想玩游戏"][p.personastate] || "未知",
        inGame: p.gameextrainfo || null,
        gameId: p.gameid || null,
        country: p.loccountrycode || null,
        createdAt: p.timecreated ? new Date(p.timecreated * 1000).toISOString() : null
      };
    }
  } catch (e) {
    out.error = out.error || `profile: ${e.message}`;
    console.error("profile failed:", e.message);
  }

  /* ---- 2. 游戏库 ---- */
  let games = [];
  try {
    const d = await getJSON(
      `${base}/IPlayerService/GetOwnedGames/v1/?key=${API_KEY}&steamid=${STEAM_ID}` +
      `&include_appinfo=1&include_played_free_games=1&skip_unvetted_apps=0`
    );
    games = d?.response?.games || [];
    out.stats = {
      totalGames: d?.response?.game_count ?? games.length,
      totalMinutes: games.reduce((a, g) => a + (g.playtime_forever || 0), 0),
      totalHours: +(games.reduce((a, g) => a + (g.playtime_forever || 0), 0) / 60).toFixed(1)
    };
  } catch (e) {
    out.error = out.error || `owned: ${e.message}`;
    console.error("owned failed:", e.message);
  }

  /* ---- 3. 最近两周 ---- */
  try {
    const d = await getJSON(
      `${base}/IPlayerService/GetRecentlyPlayedGames/v1/?key=${API_KEY}&steamid=${STEAM_ID}&count=8`
    );
    const raw = d?.response?.games || [];
    out.recent = [];
    for (const g of raw) {
      const cover = await cacheCover(g.appid, g.name);
      out.recent.push({
        appid: g.appid,
        name: g.name,
        minutes: g.playtime_2weeks || 0,
        minutesTotal: g.playtime_forever || 0,
        human: humanTime((g.playtime_2weeks || 0) * 60),
        cover
      });
    }
  } catch (e) {
    out.error = out.error || `recent: ${e.message}`;
    console.error("recent failed:", e.message);
  }

  /* ---- 4. 玩得最多的游戏 ---- */
  const top = games
    .slice()
    .sort((a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0))
    .slice(0, 6)
    .filter((g) => (g.playtime_forever || 0) > 0);

  out.topGames = [];
  for (const g of top) {
    const cover = await cacheCover(g.appid, g.name);
    out.topGames.push({
      appid: g.appid,
      name: g.name,
      minutes: g.playtime_forever || 0,
      hours: +((g.playtime_forever || 0) / 60).toFixed(1),
      human: humanTime((g.playtime_forever || 0) * 60),
      cover
    });
  }

  /* ---- 写文件 ----
     每 30 分钟跑一次，如果数据没实质变化就不写，
     避免每天 48 次无意义的提交把 git 历史淹没。
     updatedAt 每次都不同，比对时先去掉它。 */
  const strip = (o) => {
    const c = JSON.parse(JSON.stringify(o));
    delete c.updatedAt;
    return JSON.stringify(c);
  };

  let prev = null;
  if (fs.existsSync(OUT)) {
    try { prev = JSON.parse(fs.readFileSync(OUT, "utf8")); } catch { prev = null; }
  }

  const unchanged = prev && strip(prev) === strip(out);

  if (unchanged) {
    console.log("数据无变化，跳过写入（避免空提交）");
    console.log(
      `profile=${out.profile?.name || "-"} games=${out.stats?.totalGames ?? "-"} ` +
      `hours=${out.stats?.totalHours ?? "-"} recent=${out.recent.length} top=${out.topGames.length}`
    );
    return;
  }

  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`wrote ${OUT}`);
  console.log(
    `profile=${out.profile?.name || "-"} games=${out.stats?.totalGames ?? "-"} ` +
    `hours=${out.stats?.totalHours ?? "-"} recent=${out.recent.length} top=${out.topGames.length}`
  );
  if (out.error) console.log("partial errors:", out.error);
}

main().catch((e) => {
  console.error("fatal:", e);
  process.exit(1);
});
