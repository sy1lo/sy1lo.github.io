# sy1lo — 个人主页

复古视窗风格的个人主页，首页是一台**真的能放歌**的磁带机。手写 HTML / CSS / JS，零依赖、零构建，推到 GitHub Pages 就能跑。

六个页签：首页（磁带机 + 名片）/ 项目 / 相册 / 动态（Steam）/ 友链 / 联系。

---

## 一、这一版改了什么

| 改动 | 说明 |
| --- | --- |
| 删掉「文章」页 | 换成**相册**（图片墙 + 灯箱） |
| 删掉「技能」页 | 换成**动态**（Steam 最近在玩） |
| 页签切换加动画 | 底部滑动指示条 + 内容淡入上移，离开时淡出 |
| 友链只剩 UmieP | `https://umiep.dpdns.org/`，描述从站点抓的 |
| 项目换成真实仓库 | GitHub `mediarouter`、Gitee `cproject`，占位项目全删 |
| 相册 | `pictures/` 里 8 张，压到 1.8 MB，等高图片墙 |

---

## 二、页签切换动画

两层，互相独立：

1. **滑动指示条**（`#tabInk`）：3px 蓝色横条，用 `transform: translate()` + `width` 过渡跟随当前页签，缓动 `cubic-bezier(.34, 1.4, .48, 1)`（略微过冲，像老式软件的物理感）。换行到第二行时会跟着跳到对应行。
2. **内容切换**：旧页 `pageOut` 淡出上移 160ms，新页 `pageIn` 淡入上移 340ms，右栏延迟 40ms，形成轻微错落。

尊重 `prefers-reduced-motion`：开了这个系统设置就全部变成瞬时切换。

---

## 三、相册

`pictures/` 里 8 张图（插画 + 截图），转成 1400px 宽 JPEG，**总计 1.8 MB**：

| 文件 | 内容 | 尺寸 |
| --- | --- | --- |
| photo01 | 蓝发与龙尾 | 1372×870 |
| photo02 | 上伊那ぼたん（竖图） | 1080×2340 |
| photo03 | 两个人的下午 | 1400×1460 |
| photo04 | 花与裙摆 | 1400×1506 |
| photo05 | 金色长发 | 1400×788 |
| photo06–08 | 屏幕截图 13 / 14 / 20 | 1400×876 |

**等高图片墙的实现**（不是简单的 CSS Grid）：

1. 用每张图的真实宽高比算出「这一行铺满容器后高度是多少」。
2. 贪心往后累加，直到高度 ≤ 目标行高（目标行高随容器宽度自适应，桌面约 200px）。
3. 结尾如果只剩 1 张，并进上一行，避免孤零零一张占满整行。
4. 每行一个 flex 容器，行高固定，图宽按比例分配（`flex: ratio 1 0px`）。
5. 窗口 resize 时重算，不会出现空洞。

点任意图片开灯箱：原图查看、说明文字、`1 / 8` 计数、左右翻页、`Esc` 关闭、方向键切换。

---

## 四、Steam 动态（JSON + 前端渲染）

你提的方案完全可行，已经落地了。

### 数据流

```
GitHub Actions (cron 每天两次)
   └→ node scripts/fetch-steam.js
        ├→ Steam Web API (3 个公开接口)
        └→ 写 steam.json，提交回仓库
              └→ 页面 fetch("steam.json") → 自己渲染
```

### 为什么这样做

- **key 不进前端**：`STEAM_API_KEY` 只存在仓库 Secrets，静态页面永远看不到。
- **没有第三方依赖**：不需要 Netlify Functions、Cloudflare Workers 或任何后端。
- **对 Steam 友好**：一天两次请求，不是每次访问都打 API。
- **挂了也不影响页面**：`steam.json` 是普通静态文件，抓取失败时前端显示「暂无数据」，不会白屏。

### 用到的接口（都免费、都只读）

| 接口 | 拿到什么 |
| --- | --- |
| `ISteamUser/GetPlayerSummaries` | 昵称、头像、在线状态、正在玩的游戏 |
| `IPlayerService/GetOwnedGames` | 游戏总数、总时长、每个游戏的时长 |
| `IPlayerService/GetRecentlyPlayedGames` | 最近两周玩过的游戏 |

### 配置步骤

1. **拿 API Key**：访问 https://steamcommunity.com/dev/apikey，域名随便填（如 `sy1lo.github.io`），得到一串 key。
2. **拿 SteamID64**：打开自己的 Steam 个人资料页，URL 里如果是 `/id/xxx` 这种自定义名，去 https://steamid.io 查一下，拿 17 位数字的 `7656...` 那串。
3. **确认隐私设置**：Steam → 隐私设置 → **游戏详情必须设为「公开」**，否则 `GetOwnedGames` 会返回空。
4. **加 Secrets**：仓库 → Settings → Secrets and variables → Actions → 新建两个：
   - `STEAM_API_KEY` = 你的 key
   - `STEAM_ID` = 你的 7656...
5. **手动跑一次**：Actions → `Update Steam data` → Run workflow。跑完 `steam.json` 会被提交。
6. **改个人主页链接**：`assets/js/data.js` 里的 `steam.profileUrl` 换成你的 Steam 主页地址（页面右上「查看主页 ↗」用的）。

之后每天 06:00 / 18:00（北京时间）自动更新。想改频率就改 `.github/workflows/steam.yml` 里的 `cron`。

### 页面怎么渲染

- **左栏**：头像 + 昵称 + 在线状态（绿点在线 / 红点忙碌 / 灰点离线）+ 三个统计（游戏数 / 总时长 / 最近两周款数）+ 最近两周游戏卡（封面 + 时长，点开进商店页）。
- **右栏**：全时长榜（前 6，带条形图）。
- **首页迷你面板**：最近 3 个，直接显示在侧栏。

本地想手动跑一次（不通过 Actions）：

```bash
STEAM_API_KEY=xxx STEAM_ID=7656... node scripts/fetch-steam.js
```

（Windows PowerShell 用 `$env:STEAM_API_KEY="xxx"` 的写法。）

---

## 五、项目（真实仓库）

| 项目 | 平台 | 语言 | 状态 |
| --- | --- | --- | --- |
| MediaRouter | GitHub | Rust | 维护中 |
| CProject | Gitee | C | 开发中 |

卡片上有 `GH` / `GE` 标记区分来源，点「源码」直接跳到对应仓库。

> MediaRouter 的描述是从 GitHub API 抓的；CProject 仓库没有填描述，所以页面只显示「C 语言练习仓库」。想改文案就改 `data.js` 里的 `summary`。

---

## 六、联系方式

**联系页（`#contact`）**

- 大号邮箱 `2135619868@qq.com` + 复制 + 打开邮件客户端
- QQ `2135619868` + 复制
- ELSEWHERE 5 个入口：GitHub / Gitee / Email / QQ / Bilibili

**友链页（`#friends`）**

- 只有 UmieP 一个站点
- 申请友链：四条标准 + 一键发邮件
- 我的信息卡：纯文本 / Markdown / HTML 三种格式一键复制

---

## 七、上线

```bash
git add .
git commit -m "init"
git push
# Settings → Pages → Deploy from a branch → main / (root)
```

访问 `https://sy1lo.github.io/`。

注意：`.gitignore` 已经把 `music/` 和 `pictures/` 排除了（那是源文件，共约 120 MB）。部署用的是 `assets/audio/`（27 MB）和 `assets/photos/`（1.8 MB）。

---

## 八、改内容只改一个文件

**`assets/js/data.js`**

| 字段 | 作用 | 出现在 |
| --- | --- | --- |
| `site` | 名字、邮箱、QQ、GitHub/Gitee/Bilibili、自我介绍、近况 | 标题栏、名片、关于我、联系 |
| `tracks` | 磁带架（`src` 音频、`dur` 秒、`note` 听感） | 首页播放器 |
| `projects` | 项目（`host` 是 github/gitee，`repo` 是仓库地址） | 项目页、首页精选 |
| `photos` | 相册（`src`、`w`、`h`、`caption`、`tag`） | 相册页、首页迷你 |
| `friends` | 友链 | 友链页、首页迷你 |
| `socials` | 联系页入口 | 联系页 |
| `steam` | `profileUrl` 和 `refreshHint` | 动态页 |

加图片：丢进 `assets/photos/`，在 `photos` 里加一条，`w`/`h` 填真实像素（不填会导致图片墙算错行）。

---

## 九、快捷键

| 键 | 作用 |
| --- | --- |
| `Space` | 播放 / 暂停 |
| `Esc` | 暂停（灯箱打开时是关闭灯箱） |
| `←` `→` | 波形前后 5 秒 / 灯箱翻页 |
| `1`–`6` | 切换页签 |

---

## 十、结构

```
index.html                      页面骨架（6 个页签 + 灯箱）
steam.json                      Steam 数据（Actions 自动写入）
scripts/fetch-steam.js          Steam 抓取脚本
.github/workflows/steam.yml     定时任务
assets/css/style.css            全部样式
assets/js/data.js               内容数据 —— 唯一需要改的文件
assets/js/app.js                交互逻辑
assets/audio/track01-06.mp3     6 首歌（160 kbps，27 MB）
assets/photos/photo01-08.jpg    8 张图（1.8 MB）
assets/fonts/                   自托管像素字体 + OFL 许可
assets/favicon.svg              站点图标
assets/preview.png              分享卡片 1200×630
.nojekyll                       跳过 Jekyll
music/  pictures/               原始素材（已在 .gitignore 里）
```

---

## 十一、上线前检查清单

- [ ] `data.js`：`site.url` 改成实际域名
- [ ] `data.js`：`steam.profileUrl` 改成你的 Steam 主页
- [ ] 仓库 Secrets：`STEAM_API_KEY`、`STEAM_ID`
- [ ] Steam 隐私设置：游戏详情 = 公开
- [ ] Actions 手动跑一次，确认 `steam.json` 有内容
- [ ] `index.html`：`<title>`、`og:url`、`og:image`
- [ ] `assets/preview.png`：换成自己的分享图

## 许可

页面代码 MIT。字体 SIL OFL 1.1（`assets/fonts/OFL-*.txt`）。音乐和图片版权归原作者，仅作个人主页展示。
