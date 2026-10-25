/* ============================================================
   应用逻辑 —— 无依赖，数据全部来自 data.js
   磁带架里是真实音频（assets/audio/*.mp3），由 <audio> 播放
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const fmt = (sec) => {
    if (!isFinite(sec) || sec < 0) sec = 0;
    return pad(Math.floor(sec / 60)) + ":" + pad(Math.floor(sec % 60));
  };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SITE = DATA.site;
  const TRACKS = DATA.tracks;
  const PROJECTS = DATA.projects;
  const PHOTOS = DATA.photos;

  const STRIPE = {
    blue: "var(--blue)",
    yellow: "var(--yellow)",
    pink: "var(--pink)",
    lime: "var(--lime)",
    gray: "var(--ink-faint)"
  };

  /* ============================================================
     主题
     ============================================================ */
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  if (localStorage.getItem("site-theme") === "dark") root.dataset.theme = "dark";

  function syncTheme() {
    const dark = root.dataset.theme === "dark";
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.textContent = dark ? "DARK" : "LIGHT";
    themeBtn.title = dark ? "切换到浅色" : "切换到深色";
  }
  syncTheme();
  themeBtn.addEventListener("click", () => {
    if (root.dataset.theme === "dark") {
      delete root.dataset.theme;
      localStorage.removeItem("site-theme");
    } else {
      root.dataset.theme = "dark";
      localStorage.setItem("site-theme", "dark");
    }
    syncTheme();
  });

  /* ============================================================
     Toast + 复制
     ============================================================ */
  const toastEl = $("#toast");
  let toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 1900);
  }

  async function copy(text, okMsg) {
    try {
      await navigator.clipboard.writeText(text);
      toast(okMsg || "已复制");
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0;left:-9999px";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      ta.remove();
      toast(ok ? (okMsg || "已复制") : "复制失败，请手动选择");
      return ok;
    }
  }

  /* ============================================================
     播放器：真实音频
     ============================================================ */
  const audio = $("#audio");
  const cassette = $("#cassette");
  const shelf = $("#shelf");
  const wave = $("#wave");
  const waveBars = $("#waveBars");
  const waveFill = $("#waveFill");
  const waveHead = $("#waveHead");
  const btnPlay = $("#btnPlay");
  const statusEl = $("#playStatus");
  const vol = $("#vol");

  const player = { index: 0, shuffle: false, loop: false };

  (function buildWave() {
    let seed = 20261025;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const base = document.createDocumentFragment();
    const fill = document.createDocumentFragment();
    for (let i = 0; i < 104; i++) {
      const env = Math.sin((i / 104) * Math.PI) * 0.55 + 0.45;
      const h = Math.round(12 + rnd() * 88 * env);
      const a = el("span");
      a.style.height = h + "%";
      const b = a.cloneNode();
      b.style.height = h + "%";
      base.appendChild(a);
      fill.appendChild(b);
    }
    waveBars.appendChild(base);
    waveFill.appendChild(fill);
  })();

  function paintProgress() {
    const dur = audio.duration && isFinite(audio.duration) ? audio.duration : TRACKS[player.index].dur;
    const t = audio.currentTime || 0;
    const pct = dur ? Math.max(0, Math.min(1, t / dur)) * 100 : 0;
    waveFill.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    waveHead.style.left = pct + "%";
    wave.setAttribute("aria-valuenow", String(Math.round(pct)));
    wave.setAttribute("aria-valuetext", fmt(t) + " / " + fmt(dur));
    $("#timeNow").textContent = fmt(t);
    $("#timeTotal").textContent = fmt(dur);
  }

  function renderShelf() {
    shelf.innerHTML = "";
    TRACKS.forEach((t, i) => {
      const b = el("button", "track");
      b.type = "button";
      b.dataset.i = String(i);
      b.setAttribute("role", "option");
      b.setAttribute("aria-selected", String(i === player.index));
      b.style.setProperty("--stripe", STRIPE[t.stripe] || STRIPE.blue);
      b.innerHTML =
        `<span class="track__body">
           <span class="track__title">${esc(t.title)}</span>
           <span class="track__sub">${esc(t.artist)}</span>
         </span>
         <span class="track__side" aria-hidden="true">${pad(i + 1)}<small>${fmt(t.dur).slice(0, 2)}</small></span>`;
      b.classList.toggle("is-active", i === player.index);
      shelf.appendChild(b);
    });
    $("#shelfCount").textContent = TRACKS.length + " TRACKS";
  }

  function renderLinerNotes(t) {
    const list = $("#trackNotes");
    list.innerHTML = "";
    (t.note || []).forEach((line, i) => {
      list.appendChild(el("li", null, `<b>${pad(i + 1)}</b><p>${esc(line)}</p>`));
    });
  }

  function loadTrack(i, autoplay) {
    const t = TRACKS[i];
    if (!t) return;
    player.index = i;

    audio.src = t.src;
    audio.load();

    $("#npTitle").textContent = t.title;
    $("#npArtist").textContent = t.artist;
    $("#npTag").textContent = String(t.year);
    $("#cassetteTitle").textContent = t.title;
    $("#cassetteSub").textContent = t.artist.toUpperCase();

    $("#infoTrack").textContent = t.title;
    $("#infoArtist").textContent = t.artist;
    $("#infoAlbum").textContent = t.album;
    $("#infoYear").textContent = String(t.year);
    $("#infoQuality").textContent = "MP3 · 160 kbps · 44.1 kHz";
    $("#infoFile").textContent = t.src.replace("assets/audio/", "");

    renderLinerNotes(t);
    paintProgress();

    $$(".track", shelf).forEach((b) => {
      const on = Number(b.dataset.i) === i;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", String(on));
    });

    const cur = $(".track.is-active", shelf);
    if (cur) {
      const top = cur.offsetTop - shelf.offsetTop;
      if (top < shelf.scrollTop || top + cur.offsetHeight > shelf.scrollTop + shelf.clientHeight) {
        shelf.scrollTop = Math.max(0, top - shelf.clientHeight / 2 + cur.offsetHeight / 2);
      }
    }

    if (autoplay) play(); else setPausedUI();
  }

  function play() {
    const p = audio.play();
    if (p && p.catch) {
      p.catch(() => {
        toast("浏览器拦住了自动播放，请再点一次播放");
        setPausedUI();
      });
    }
  }

  function setPlayingUI() {
    btnPlay.classList.add("is-playing");
    btnPlay.setAttribute("aria-pressed", "true");
    btnPlay.title = "暂停";
    cassette.classList.add("is-spinning");
    statusEl.textContent = "PLAYING";
    $("#eq").classList.add("is-live");
  }

  function setPausedUI() {
    btnPlay.classList.remove("is-playing");
    btnPlay.setAttribute("aria-pressed", "false");
    btnPlay.title = "播放";
    cassette.classList.remove("is-spinning");
    statusEl.textContent = audio.currentTime > 0 ? "PAUSED" : "STOPPED";
    $("#eq").classList.remove("is-live");
  }

  audio.addEventListener("play", setPlayingUI);
  audio.addEventListener("pause", setPausedUI);
  audio.addEventListener("timeupdate", paintProgress);
  audio.addEventListener("loadedmetadata", paintProgress);
  audio.addEventListener("ended", () => {
    if (player.loop) {
      audio.currentTime = 0;
      play();
      return;
    }
    next(true);
  });
  audio.addEventListener("error", () => {
    if (!audio.src) return;
    statusEl.textContent = "LOAD ERROR";
    toast("音频加载失败，检查 assets/audio/ 里的文件");
  });

  function next(auto) {
    let i;
    if (player.shuffle) {
      i = player.index;
      while (i === player.index && TRACKS.length > 1) i = Math.floor(Math.random() * TRACKS.length);
    } else {
      i = (player.index + 1) % TRACKS.length;
    }
    loadTrack(i, auto || !audio.paused);
  }

  function prev() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    loadTrack((player.index - 1 + TRACKS.length) % TRACKS.length, !audio.paused);
  }

  shelf.addEventListener("click", (e) => {
    const b = e.target.closest(".track");
    if (b) loadTrack(Number(b.dataset.i), true);
  });
  shelf.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    if (!e.target.closest(".track")) return;
    e.preventDefault();
    loadTrack((player.index + (e.key === "ArrowDown" ? 1 : -1) + TRACKS.length) % TRACKS.length, false);
  });

  btnPlay.addEventListener("click", () => {
    if (audio.paused) play(); else audio.pause();
  });
  $("#btnNext").addEventListener("click", () => next(false));
  $("#btnPrev").addEventListener("click", prev);
  $("#btnStop").addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    paintProgress();
    statusEl.textContent = "STOPPED";
  });
  $("#btnShuffle").addEventListener("click", (e) => {
    player.shuffle = !player.shuffle;
    e.currentTarget.setAttribute("aria-pressed", String(player.shuffle));
    syncMode();
    toast(player.shuffle ? "随机播放已开启" : "随机播放已关闭");
  });
  $("#btnLoop").addEventListener("click", (e) => {
    player.loop = !player.loop;
    e.currentTarget.setAttribute("aria-pressed", String(player.loop));
    syncMode();
    toast(player.loop ? "单曲循环已开启" : "单曲循环已关闭");
  });

  function syncMode() {
    const parts = [player.shuffle ? "随机" : "顺序"];
    if (player.loop) parts.push("循环");
    $("#modeChip").textContent = parts.join(" · ");
  }

  function paintVol() {
    const v = Number(vol.value);
    audio.volume = v / 100;
    vol.style.setProperty("--val", v + "%");
    $("#volValue").textContent = "/ " + v;
  }
  vol.addEventListener("input", paintVol);
  audio.volume = Number(vol.value) / 100;
  paintVol();

  let dragging = false;
  function seekTo(clientX) {
    const r = wave.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    const dur = audio.duration && isFinite(audio.duration) ? audio.duration : TRACKS[player.index].dur;
    audio.currentTime = pct * dur;
    paintProgress();
  }
  wave.addEventListener("pointerdown", (e) => {
    dragging = true;
    seekTo(e.clientX);
    try { wave.setPointerCapture(e.pointerId); } catch { /* 合成事件 */ }
  });
  wave.addEventListener("pointermove", (e) => { if (dragging) seekTo(e.clientX); });
  wave.addEventListener("pointerup", () => { dragging = false; });
  wave.addEventListener("pointercancel", () => { dragging = false; });
  wave.addEventListener("keydown", (e) => {
    const dur = audio.duration && isFinite(audio.duration) ? audio.duration : TRACKS[player.index].dur;
    if (e.key === "ArrowRight") audio.currentTime = Math.min(dur, audio.currentTime + 5);
    else if (e.key === "ArrowLeft") audio.currentTime = Math.max(0, audio.currentTime - 5);
    else if (e.key === "Home") audio.currentTime = 0;
    else if (e.key === "End") audio.currentTime = Math.max(0, dur - 0.5);
    else return;
    e.preventDefault();
    paintProgress();
  });

  (function buildEq() {
    const eq = $("#eq");
    for (let i = 0; i < 30; i++) {
      const s = el("span");
      const h = 18 + Math.abs(Math.sin(i * 1.7)) * 74;
      s.style.setProperty("--h", h.toFixed(0) + "%");
      s.style.height = h.toFixed(0) + "%";
      s.style.setProperty("--dur", (0.7 + (i % 5) * 0.16).toFixed(2) + "s");
      s.style.animationDelay = (-(i * 0.13)).toFixed(2) + "s";
      eq.appendChild(s);
    }
  })();

  $("#btnSettings").addEventListener("click", (e) => {
    const extra = $("#infoExtra");
    const open = extra.hidden;
    extra.hidden = !open;
    e.currentTarget.setAttribute("aria-expanded", String(open));
    e.currentTarget.textContent = (open ? "−" : "+") + " 更多信息";
  });

  /* ============================================================
     页签（带切换动画）
     ============================================================ */
  const tabbar = $("#tabbar");
  const tabs = $$(".tab", tabbar);
  const pages = $$(".page");
  const TITLES = {};
  tabs.forEach((t) => (TITLES[t.dataset.page] = t.dataset.title));

  const INK = $("#tabInk");
  let currentPage = "home";
  let switching = false;

  function moveInk(tab, animate) {
    if (!INK || !tab) return;
    tabbar.classList.add("has-ink");
    const r = tab.getBoundingClientRect();
    const base = tabbar.getBoundingClientRect();
    const x = r.left - base.left + tabbar.scrollLeft;
    const y = r.bottom - base.top + tabbar.scrollTop + 3;
    INK.style.width = r.width + "px";
    INK.style.transform = `translate(${x}px, ${y}px)`;
    if (!animate || reduceMotion) INK.style.transition = "none";
    else INK.style.transition = "";
  }

  function go(page, push = true) {
    const tab = tabs.find((t) => t.dataset.page === page);
    if (!tab) return;

    const same = page === currentPage;
    if (same && pages.some((p) => p.dataset.page === page && !p.hidden)) {
      // 已经在这一页，只同步状态
      return;
    }

    tabs.forEach((t) => {
      const on = t === tab;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    moveInk(tab, true);

    // 先瞬时回到顶部再播动画：否则「长页面滚到一半切到短页面」时，
    // 平滑滚动会和淡出动画叠在一起，观感像卡住
    if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: "auto" });

    const outgoing = pages.find((p) => p.classList.contains("is-active"));
    const incoming = pages.find((p) => p.dataset.page === page);
    if (!incoming) return;

    const commit = () => {
      pages.forEach((p) => {
        const on = p.dataset.page === page;
        p.classList.toggle("is-active", on);
        p.hidden = !on;
        p.classList.remove("is-leaving");
      });
      incoming.classList.add("is-entering");
      // 下一帧移除类，让动画从头播
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          incoming.classList.remove("is-entering");
          switching = false;
        });
      });
      // 页面此刻才真正可见，依赖布局的渲染必须放在这之后
      afterShow(page);
    };

    if (reduceMotion || !outgoing || outgoing === incoming || switching) {
      commit();
    } else {
      switching = true;
      outgoing.classList.add("is-leaving");
      outgoing.classList.remove("is-active");
      // 等淡出结束再换内容；时长与 CSS 保持一致
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        commit();
      };
      outgoing.addEventListener("animationend", finish, { once: true });
      setTimeout(finish, 200);
    }

    currentPage = page;
    $("#winTitle").textContent = SITE.name + " — " + TITLES[page];
    if (push && location.hash.slice(1) !== page) history.replaceState(null, "", "#" + page);
  }

  /* 页面切换后要做的收尾：必须等页面真的显示（hidden=false）再跑，
     否则 clientWidth 为 0，图片墙算不出行 */
  function afterShow(page) {
    if (page === "home") paintProgress();
    if (page === "contact") tickClock();
    if (page === "feed") renderSteam();
    if (page === "gallery") layoutWall();
  }

  tabbar.addEventListener("click", (e) => {
    const b = e.target.closest(".tab");
    if (b) go(b.dataset.page);
  });
  tabbar.addEventListener("keydown", (e) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = tabs.length - 1;
    tabs[n].focus();
    go(tabs[n].dataset.page);
  });

  document.addEventListener("click", (e) => {
    const g = e.target.closest("[data-goto]");
    if (!g) return;
    e.preventDefault();
    go(g.dataset.goto);
  });

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    const active = tabs.find((t) => t.classList.contains("is-active"));
    if (active) moveInk(active, false);
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (wallIsVisible()) layoutWall();
    }, 80);
  });

  /* ============================================================
     首页
     ============================================================ */
  function renderHome() {
    $("#idName").textContent = SITE.name;
    $("#idRole").textContent = SITE.role;
    $("#idBase").textContent = SITE.location;
    $("#idSince").textContent = String(SITE.since);
    $("#idMail").textContent = SITE.email;
    $("#idStatus").textContent = SITE.status;
    $("#statusBadge").textContent = SITE.status;
    const d = new Date();
    $("#idNo").textContent = "NO. " + d.getFullYear() + "-" + pad(d.getMonth() + 1);
    $("#version").textContent = SITE.version;
    $("#heroLede").textContent = SITE.tagline;
    $("#nowUpdated").textContent = "更新于 " + SITE.nowUpdated;

    $("#mailBtn").href = "mailto:" + SITE.email;
    $("#mailTplHint").textContent = SITE.email;
    $("#qqHint").textContent = SITE.qq;
    $("#ghBtn").href = SITE.github;
    $("#giteeBtn").href = SITE.gitee;

    const about = $("#aboutText");
    about.innerHTML = "";
    SITE.about.forEach((p) => about.appendChild(el("p", null, esc(p))));

    const fw = $("#aboutFacts");
    fw.innerHTML = "";
    [
      ["ROLE", SITE.role],
      ["BASE", SITE.location],
      ["SINCE", String(SITE.since)],
      ["MAIL", SITE.email]
    ].forEach(([k, v]) => fw.appendChild(el("span", "fact", `<b>${esc(k)}</b>${esc(v)}`)));

    const now = $("#nowList");
    now.innerHTML = "";
    SITE.now.forEach((n) => {
      now.appendChild(el("li", null, `<b>${esc(n.k)}</b><span>${esc(n.v)}</span>`));
    });

    /* 项目 */
    const pw = $("#pinnedList");
    pw.innerHTML = "";
    PROJECTS.forEach((p) => {
      const b = el("button", "pinrow");
      b.type = "button";
      b.style.setProperty("--stripe", STRIPE[p.stripe] || STRIPE.blue);
      b.innerHTML =
        `<span class="pinrow__title">${esc(p.title)}</span>
         <span class="pinrow__sub">${esc(p.tags.join(" · "))}</span>
         <span class="pinrow__go">→</span>`;
      b.addEventListener("click", () => go("works"));
      pw.appendChild(b);
    });
    $("#pinnedMore").textContent = `全部 ${PROJECTS.length} →`;

    /* 相册迷你 */
    const gm = $("#galleryMini");
    gm.innerHTML = "";
    PHOTOS.slice(0, 4).forEach((ph, i) => {
      const b = el("button", "thumb");
      b.type = "button";
      b.setAttribute("aria-label", ph.caption);
      b.innerHTML = `<img src="${esc(ph.src)}" alt="${esc(ph.caption)}" width="${ph.w}" height="${ph.h}" loading="lazy" decoding="async">`;
      b.addEventListener("click", () => { go("gallery"); openLightbox(i); });
      gm.appendChild(b);
    });

    /* 友链迷你 */
    const fm = $("#friendsMini");
    fm.innerHTML = "";
    DATA.friends.slice(0, 4).forEach((f) => {
      const a = el("a", "minifriend");
      a.href = f.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `<span class="minifriend__dot" aria-hidden="true"></span>
        <span class="minifriend__name">${esc(f.name)}</span>
        <span class="minifriend__arrow">↗</span>`;
      fm.appendChild(a);
    });

    const kv = $("#quickStats");
    kv.innerHTML = "";
    [
      ["曲目", TRACKS.length],
      ["项目", PROJECTS.length],
      ["图片", PHOTOS.length],
      ["友链", DATA.friends.length]
    ].forEach(([k, v]) => kv.appendChild(el("div", "kv__row", `<dt>${k}</dt><dd>${v}</dd>`)));
  }
  renderHome();

  $("#copyMailHome").addEventListener("click", () => copy(SITE.email, "邮箱已复制"));
  $("#copyQqHome").addEventListener("click", () => copy(SITE.qq, "QQ 号已复制"));

  /* ============================================================
     项目
     ============================================================ */
  const STATUS = {
    live: { label: "维护中", cls: "live" },
    wip: { label: "开发中", cls: "wip" },
    arch: { label: "已归档", cls: "arch" }
  };
  const HOST = {
    github: { label: "GitHub", icon: "GH" },
    gitee: { label: "Gitee", icon: "GE" }
  };

  function thumb(p) {
    const c = STRIPE[p.stripe] || STRIPE.blue;
    const seed = p.title.length + p.year;
    const bars = Array.from({ length: 5 }, (_, i) => {
      const h = 6 + ((seed * (i + 3)) % 22);
      return `<rect x="${10 + i * 11}" y="${38 - h}" width="7" height="${h}" fill="var(--ink)" opacity=".5"/>`;
    }).join("");
    return `<svg viewBox="0 0 74 52" preserveAspectRatio="none" aria-hidden="true">
      <rect width="74" height="52" fill="var(--paper-3)"/>
      <rect width="74" height="52" fill="${c}" opacity=".2"/>
      <g stroke="var(--ink)" stroke-width=".5" opacity=".22">
        ${Array.from({ length: 6 }, (_, i) => `<path d="M0 ${6 + i * 9}h74"/>`).join("")}
      </g>
      ${bars}
      <rect x="4" y="4" width="66" height="44" fill="none" stroke="var(--ink)" stroke-width="1"/>
      <text x="8" y="14" font-family="Silkscreen, monospace" font-size="7" fill="var(--ink)">${esc(String(p.year))}</text>
      <text x="8" y="46" font-family="Silkscreen, monospace" font-size="6" fill="var(--ink)" opacity=".8">PROJECT</text>
    </svg>`;
  }

  (function renderWorks() {
    const workList = $("#workList");
    workList.innerHTML = "";
    PROJECTS.forEach((p) => {
      const st = STATUS[p.status];
      const host = HOST[p.host] || HOST.github;
      const card = el("article", "work");
      card.style.setProperty("--stripe", STRIPE[p.stripe] || STRIPE.blue);
      card.innerHTML =
        `<div class="work__thumb">${thumb(p)}</div>
         <div class="work__body">
           <div class="work__top">
             <h3 class="work__title">${esc(p.title)}</h3>
             <span class="status status--${st.cls}"><i></i>${st.label}</span>
           </div>
           <p class="work__desc">${esc(p.summary || p.subtitle)}</p>
           <div class="work__tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
           <div class="work__stack">
             <span class="host host--${p.host}">${host.icon}</span>
             ${esc(p.stack)}
           </div>
           <div class="work__actions">
             <a class="chip chip--btn chip--accent" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">
               ${host.label} 源码 ↗
             </a>
           </div>
         </div>`;
      workList.appendChild(card);
    });
    $("#workCount").textContent = PROJECTS.length + " ITEMS";

    const wrap = $("#yearList");
    const by = {};
    PROJECTS.forEach((p) => (by[p.year] = by[p.year] || []).push(p));
    wrap.innerHTML = "";
    Object.keys(by).sort((a, b) => b - a).forEach((y) => {
      wrap.appendChild(el("li", null,
        `<b>${y}</b><span>${by[y].map((p) => esc(p.title)).join(" · ")}</span><small>${by[y].length}</small>`));
    });
  })();

  /* ============================================================
     相册：等高图片墙
     ============================================================ */
  const wall = $("#photoWall");
  const photoTags = $("#photoTags");
  let photoTag = "all";
  let wallItems = [];
  let wallRetry = 0;

  const ALL_PHOTO_TAGS = ["all"].concat([...new Set(PHOTOS.map((p) => p.tag))]);

  ALL_PHOTO_TAGS.forEach((t, i) => {
    const b = el("button", "tag tag--btn" + (i === 0 ? " is-on" : ""), t === "all" ? "全部" : esc(t));
    b.type = "button";
    b.dataset.t = t;
    b.setAttribute("aria-pressed", String(i === 0));
    photoTags.appendChild(b);
  });

  photoTags.addEventListener("click", (e) => {
    const b = e.target.closest("[data-t]");
    if (!b) return;
    photoTag = b.dataset.t;
    $$("[data-t]", photoTags).forEach((x) => {
      x.classList.toggle("is-on", x === b);
      x.setAttribute("aria-pressed", String(x === b));
    });
    buildWall();
  });

  function currentPhotos() {
    return photoTag === "all" ? PHOTOS : PHOTOS.filter((p) => p.tag === photoTag);
  }

  function buildWall() {
    const list = currentPhotos();
    wallItems = list;
    $("#photoEmpty").hidden = list.length > 0;
    $("#photoCount").textContent = list.length + " PHOTOS";
    // 页面不可见时算不出宽度，等显示后再排（见 afterShow）
    if (!wallIsVisible()) return;
    layoutWall();
  }

  /* 相册页是否处于可见状态 */
  function wallIsVisible() {
    const pageEl = $("#page-gallery");
    return !!pageEl && !pageEl.hidden && wall && wall.clientWidth > 0;
  }

  /* 等高排布：先按比例把图片切成行，每行一个 flex 容器，行高固定 */
  function layoutWall() {
    if (!wall) return;
    const photos = currentPhotos();
    const containerW = wall.clientWidth;

    /* 容器还没宽度（页面隐藏 / 刚插入 DOM / 正在动画），
       等下一帧再试，最多重试 8 帧，避免死循环 */
    if (containerW <= 0) {
      if (wallRetry < 8) {
        wallRetry += 1;
        requestAnimationFrame(layoutWall);
      }
      return;
    }
    wallRetry = 0;

    const gap = 6;
    // 目标行高：桌面约 200px，窄屏自动收小
    const targetH = Math.max(130, Math.min(230, containerW * 0.235));

    /* 1. 分组：贪心填满，直到该行按满宽铺开的高度 <= 目标行高 */
    const rows = [];
    let i = 0;
    while (i < photos.length) {
      let sum = 0;
      let end = i;
      for (let j = i; j < photos.length; j++) {
        sum += (photos[j].w || 1) / (photos[j].h || 1);
        const n = j - i + 1;
        end = j;
        const h = (containerW - gap * (n - 1)) / sum;
        if (h <= targetH) break;
      }

      const items = [];
      let s = 0;
      for (let k = i; k <= end; k++) {
        const ratio = (photos[k].w || 1) / (photos[k].h || 1);
        items.push({ i: k, ratio });
        s += ratio;
      }
      rows.push({ items, sum: s });
      i = end + 1;
    }

    /* 2. 结尾只剩一张：并进上一行，避免孤零零一张占满整行 */
    if (rows.length > 1 && rows[rows.length - 1].items.length === 1) {
      const last = rows.pop();
      const prev = rows[rows.length - 1];
      prev.items.push(...last.items);
      prev.sum += last.sum;
    }

    /* 3. 计算每行最终高度：撑满宽度；最后一行不强行拉高 */
    rows.forEach((rd, ri) => {
      const isLast = ri === rows.length - 1;
      const n = rd.items.length;
      let h = (containerW - gap * (n - 1)) / rd.sum;
      rd.partial = false;
      if (isLast) {
        h = Math.min(h, targetH);
        const usedW = rd.sum * h + gap * (n - 1);
        rd.partial = usedW < containerW * 0.94;
      }
      rd.h = h;
    });

    /* 2. 渲染：每行一个容器，行高固定，图宽按比例分配 */
    wall.innerHTML = "";
    rows.forEach((rd) => {
      const rowEl = el("div", "wall-row");
      rowEl.style.height = Math.round(rd.h) + "px";
      rowEl.style.gap = gap + "px";
      if (rd.partial) rowEl.classList.add("is-partial");

      rd.items.forEach((it) => {
        const ph = photos[it.i];
        const b = el("button", "wall-item");
        b.type = "button";
        b.dataset.i = String(it.i);
        if (rd.partial) {
          b.style.width = Math.round(rd.h * it.ratio) + "px";
          b.style.flex = "0 0 auto";
        } else {
          b.style.flex = `${it.ratio} 1 0px`;
        }
        b.innerHTML =
          `<img src="${esc(ph.src)}" alt="${esc(ph.caption)}" width="${ph.w}" height="${ph.h}" decoding="async">
           <span class="wall-item__cap">${esc(ph.caption)}</span>`;
        b.addEventListener("click", () => openLightbox(it.i));
        rowEl.appendChild(b);
      });      wall.appendChild(rowEl);
    });

    wallItems = photos;
  }

  /* 灯箱 */
  const lightbox = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  const lbCount = $("#lbCount");
  let lbIndex = 0;

  function openLightbox(i) {
    if (!wallItems.length) return;
    lbIndex = Math.max(0, Math.min(i, wallItems.length - 1));
    paintLightbox();
    lightbox.hidden = false;
    document.body.classList.add("is-locked");
    $("#lbClose").focus();
  }

  function paintLightbox() {
    const ph = wallItems[lbIndex];
    if (!ph) return;
    lbImg.src = ph.src;
    lbImg.alt = ph.caption;
    lbCap.textContent = ph.caption;
    lbCount.textContent = (lbIndex + 1) + " / " + wallItems.length;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("is-locked");
  }

  function stepLightbox(d) {
    if (!wallItems.length) return;
    lbIndex = (lbIndex + d + wallItems.length) % wallItems.length;
    paintLightbox();
  }

  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => stepLightbox(-1));
  $("#lbNext").addEventListener("click", () => stepLightbox(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target.closest("[data-lb-close]")) closeLightbox();
  });

  buildWall();

  /* ============================================================
     Steam 动态
     ============================================================ */
  let steamData = null;
  let steamLoaded = false;

  function steamTime(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d)) return "—";
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ` +
      `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function renderSteam() {
    if (steamLoaded) {
      paintSteam();
      return;
    }
    fetch("steam.json", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then((d) => {
        steamData = d;
        steamLoaded = true;
        paintSteam();
      })
      .catch(() => {
        steamData = null;
        steamLoaded = true;
        paintSteam();
      });
  }

  function paintSteam() {
    const d = steamData;
    const hasData = !!(d && (d.profile || d.stats || (d.recent && d.recent.length)));

    $("#steamUpdated").textContent = d && d.updatedAt ? "更新于 " + steamTime(d.updatedAt) : "尚未更新";

    const avatar = $("#steamAvatar");
    if (d && d.profile && d.profile.avatar) {
      avatar.innerHTML = `<img src="${esc(d.profile.avatar)}" alt="" loading="lazy" decoding="async">`;
    } else {
      avatar.innerHTML = `<span class="steam-hero__ph" aria-hidden="true">?</span>`;
    }

    $("#steamName").textContent = d && d.profile ? d.profile.name : "—";
    const stateEl = $("#steamState");
    if (d && d.profile) {
      const inGame = d.profile.inGame ? ` · 正在玩 ${esc(d.profile.inGame)}` : "";
      stateEl.innerHTML = `<i class="steam-dot" data-state="${d.profile.state}"></i>${esc(d.profile.stateText)}${inGame}`;
    } else {
      stateEl.textContent = hasData ? "—" : "还没有数据，先去配置 Steam Secrets";
    }

    const profileBtn = $("#steamProfile");
    const url = (d && d.profile && d.profile.profileUrl) || (DATA.steam && DATA.steam.profileUrl) || "#";
    profileBtn.href = url;

    const stats = $("#steamStats");
    stats.innerHTML = "";
    if (d && d.stats) {
      [
        ["游戏数", d.stats.totalGames ?? "—"],
        ["总时长", d.stats.totalHours ? d.stats.totalHours + " 小时" : "—"],
        ["最近两周", d.recent && d.recent.length ? d.recent.length + " 款" : "—"]
      ].forEach(([k, v]) => stats.appendChild(el("div", "steam-stat", `<dt>${k}</dt><dd>${v}</dd>`)));
    } else {
      [["游戏数", "—"], ["总时长", "—"], ["最近两周", "—"]]
        .forEach(([k, v]) => stats.appendChild(el("div", "steam-stat", `<dt>${k}</dt><dd>${v}</dd>`)));
    }

    /* 最近两周 */
    const recent = $("#steamRecent");
    recent.innerHTML = "";
    const rec = (d && d.recent) || [];
    $("#recentCount").textContent = rec.length + " GAMES";
    if (!rec.length) {
      recent.appendChild(el("p", "steam-empty",
        hasData ? "最近两周没怎么玩。" : "数据还没抓到。配置好 Secrets 后，Actions 会自动生成 steam.json。"));
    } else {
      rec.forEach((g) => {
        const a = el("a", "game");
        a.href = `https://store.steampowered.com/app/${g.appid}/`;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        const cover = g.cover
          ? `<img src="${esc(g.cover)}" alt="" loading="lazy" decoding="async">`
          : "";
        a.innerHTML =
          `<span class="game__cover${cover ? "" : " is-empty"}">${cover}</span>
           <span class="game__body">
             <span class="game__name">${esc(g.name)}</span>
             <span class="game__time">最近两周 ${esc(g.human)}</span>
           </span>
           <span class="game__arrow">↗</span>`;
        recent.appendChild(a);
      });
    }

    /* 时长榜 */
    const top = $("#steamTop");
    top.innerHTML = "";
    const tops = (d && d.topGames) || [];
    if (!tops.length) {
      top.appendChild(el("p", "steam-empty", "还没有时长数据。"));
    } else {
      const max = tops[0].minutes || 1;
      tops.forEach((g, i) => {
        const row = el("a", "toprow");
        row.href = `https://store.steampowered.com/app/${g.appid}/`;
        row.target = "_blank";
        row.rel = "noopener noreferrer";
        row.innerHTML =
          `<span class="toprow__no">${pad(i + 1)}</span>
           <span class="toprow__body">
             <span class="toprow__name">${esc(g.name)}</span>
             <span class="toprow__bar"><i style="width:${Math.round((g.minutes / max) * 100)}%"></i></span>
           </span>
           <span class="toprow__time">${esc(g.human)}</span>`;
        top.appendChild(row);
      });
    }

    /* 首页迷你 */
    const mini = $("#steamMini");
    mini.innerHTML = "";
    if (!hasData) {
      mini.appendChild(el("p", "steam-empty", "还没有 Steam 数据。"));
    } else {
      const items = (d.recent && d.recent.length ? d.recent : (d.topGames || [])).slice(0, 3);
      if (!items.length) {
        mini.appendChild(el("p", "steam-empty", "最近没在玩什么。"));
      } else {
        items.forEach((g) => {
          const a = el("a", "steam-mini__row");
          a.href = `https://store.steampowered.com/app/${g.appid}/`;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.innerHTML =
            `<span class="steam-mini__name">${esc(g.name)}</span>
             <span class="steam-mini__time">${esc(g.human)}</span>`;
          mini.appendChild(a);
        });
      }
    }

    if (DATA.steam && DATA.steam.refreshHint) {
      $("#steamHint").textContent = "更新频率：" + DATA.steam.refreshHint;
    }
  }

  /* 首屏也预取一次，让首页迷你面板有数据 */
  renderSteam();

  /* ============================================================
     友链
     ============================================================ */
  (function renderFriends() {
    const wrap = $("#friendList");
    wrap.innerHTML = "";
    DATA.friends.forEach((f) => {
      const a = el("a", "friend");
      a.href = f.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      let host = "";
      try { host = new URL(f.url).host.replace(/^www\./, ""); } catch { host = f.url; }
      a.innerHTML =
        `<span class="friend__head">
           <span class="friend__name">${esc(f.name)}</span>
           <span class="friend__arrow">↗</span>
         </span>
         <span class="friend__desc">${esc(f.desc)}</span>
         <span class="friend__foot">
           <span class="friend__host">${esc(host)}</span>
           ${f.tags.map((t) => `<span class="tag tag--sm">${esc(t)}</span>`).join("")}
         </span>`;
      wrap.appendChild(a);
    });
    $("#friendCount").textContent = DATA.friends.length + (DATA.friends.length > 1 ? " SITES" : " SITE");
  })();

  const avatarUrl = SITE.url.replace(/\/$/, "") + "/assets/favicon.svg";
  const cardText = `名称：${SITE.name}
描述：${SITE.tagline}
链接：${SITE.url}
头像：${avatarUrl}`;
  const cardMd = `- **名称**：${SITE.name}
- **描述**：${SITE.tagline}
- **链接**：[${SITE.url}](${SITE.url})
- **头像**：${avatarUrl}`;
  const cardHtml = `<a href="${SITE.url}" target="_blank" rel="noopener">
  <img src="${avatarUrl}" width="16" height="16" alt="">
  ${SITE.name}
</a> — ${SITE.tagline}`;

  $("#myCard").textContent = cardText;
  $$("[data-copy]").forEach((b) => {
    b.addEventListener("click", () => copy($("#" + b.dataset.copy).textContent, "友链信息已复制"));
  });
  $("#copyMd").addEventListener("click", () => copy(cardMd, "Markdown 已复制"));
  $("#copyHtml").addEventListener("click", () => copy(cardHtml, "HTML 已复制"));
  $("#applyMail").href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("友链申请 / 你的站点名");

  /* ============================================================
     联系
     ============================================================ */
  (function renderContact() {
    const big = $("#mailBig");
    big.textContent = SITE.email;
    big.href = "mailto:" + SITE.email;
    $("#mailTemplate").href = "mailto:" + SITE.email + "?subject=" +
      encodeURIComponent("你好，来自你的个人主页");
    $("#copyMailBig").addEventListener("click", () => copy(SITE.email, "邮箱已复制"));

    const qqBig = $("#qqBig");
    qqBig.textContent = SITE.qq;
    $("#copyQqBig").addEventListener("click", () => copy(SITE.qq, "QQ 号已复制"));

    const list = $("#socialList");
    list.innerHTML = "";
    DATA.socials.forEach((s) => {
      const li = el("li");
      const a = el("a", "social");
      a.href = s.url;
      if (/^https?:/.test(s.url)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.innerHTML =
        `<span class="social__kind">${esc(s.kind)}</span>
         <span class="social__label">${esc(s.label)}</span>
         <span class="social__handle">${esc(s.handle)}</span>
         <span class="social__arrow">↗</span>`;
      li.appendChild(a);
      list.appendChild(li);
    });
    $("#socialCount").textContent = DATA.socials.length + " LINKS";

    const kv = $("#contactKv");
    kv.innerHTML = "";
    [
      ["时区", "Asia/Shanghai · GMT+8"],
      ["回复", "通常 48 小时内"],
      ["语言", "中文 / English"],
      ["状态", SITE.status]
    ].forEach(([k, v]) => kv.appendChild(el("div", "kv__row", `<dt>${k}</dt><dd>${v}</dd>`)));
  })();

  /* ============================================================
     时钟
     ============================================================ */
  function tickClock() {
    const d = new Date();
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    const wd = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][d.getDay()];
    const date = `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} / ${wd}`;
    ["#clock", "#clock2"].forEach((sel) => { const n = $(sel); if (n) n.textContent = time; });
    ["#clockDate", "#clockDate2"].forEach((sel) => { const n = $(sel); if (n) n.textContent = date; });
    $("#statusClock").textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ============================================================
     全局快捷键
     ============================================================ */
  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement && document.activeElement.tagName;
    const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

    // 灯箱优先
    if (!lightbox.hidden) {
      if (e.key === "Escape") { e.preventDefault(); closeLightbox(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); stepLightbox(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); stepLightbox(-1); }
      return;
    }
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === "Escape") {
      if (!audio.paused) audio.pause();
      return;
    }
    if (e.key >= "1" && e.key <= "6") {
      const t = tabs[Number(e.key) - 1];
      if (t) { e.preventDefault(); go(t.dataset.page); }
      return;
    }
    if (e.code === "Space" && !(e.target instanceof Element && e.target.closest("button, a, input, textarea"))) {
      e.preventDefault();
      if (audio.paused) play(); else audio.pause();
    }
  });

  /* ============================================================
     初始化
     ============================================================ */
  renderShelf();
  loadTrack(0, false);
  syncMode();

  $("#statusMid").textContent = SITE.url.replace(/^https?:\/\//, "").replace(/\/$/, "") +
    " · 手写 HTML / CSS / JS · 无追踪";
  $("#colophon").textContent = `© ${new Date().getFullYear()} ${SITE.name} · 手写代码 · 无追踪`;

  const initial = location.hash.slice(1);
  const startPage = tabs.some((t) => t.dataset.page === initial) ? initial : "home";
  currentPage = startPage;
  tabs.forEach((t) => {
    const on = t.dataset.page === startPage;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
  });
  pages.forEach((p) => {
    const on = p.dataset.page === startPage;
    p.classList.toggle("is-active", on);
    p.hidden = !on;
  });
  $("#winTitle").textContent = SITE.name + " — " + TITLES[startPage];
  requestAnimationFrame(() => {
    const active = tabs.find((t) => t.classList.contains("is-active"));
    if (active) moveInk(active, false);
    afterShow(startPage);
  });

  window.addEventListener("hashchange", () => {
    const p = location.hash.slice(1);
    if (tabs.some((t) => t.dataset.page === p)) go(p, false);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !audio.paused) audio.pause();
  });
})();
