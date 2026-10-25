/* ============================================================
   站点内容 —— 只改这个文件，页面自动更新
   ------------------------------------------------------------
   site      你本人：名字、邮箱、QQ、社交账号、自我介绍、近况
   tracks    磁带架上的 6 首歌（音频在 assets/audio/）
   projects  项目（GitHub / Gitee 上的真实仓库）
   photos    相册（图片在 assets/photos/）
   friends   友情链接
   socials   别的入口（GitHub / Gitee / 邮箱 / QQ / Bilibili）
   ============================================================ */

const DATA = {

  /* ---------- 你本人 ---------- */
  site: {
    name: "sy1lo",
    handle: "@sy1lo",
    role: "yuri爱好者",
    tagline: "vibe-coding享受者",
    email: "2135619868@qq.com",
    qq: "2135619868",
    url: "https://sy1lo.github.io/",
    location: "China",
    since: 2026,
    status: "开放合作",          // 标题栏徽章
    version: "v2026.10",
    github: "https://github.com/sy1lo",
    gitee: "https://gitee.com/lsy1105",
    bilibili: "https://space.bilibili.com/453959410",
    about: [
      "最鼓励同学之人。",
      "世界最能绷之人。",
      "世界最懒惰之人。"
    ],
    /* 近况：首页 NOW 面板 */
    now: [
      { k: "在做", v: "活着" },
      { k: "在读", v: "《一周一次买下同班同学的那些事》" },
      { k: "在听", v: "Luv (sic) pt4 — Nujabes & Shing02" },
      { k: "在学", v: "电子科学与技术" }
    ],
    nowUpdated: "2026-10-25"
  },

  /* ---------- 磁带架：6 首歌 ---------- */
  /* src 是实际音频文件，dur 是秒（由 ffmpeg 读出） */
  tracks: [
    {
      id: "luvsic4",
      title: "Luv (sic) pt4",
      artist: "Nujabes & Shing02",
      album: "Luv (sic) Hexalogy",
      year: 2005,
      src: "assets/audio/track01.mp3",
      dur: 312.45,
      stripe: "blue",
      note: [
        "不听这辈子白活了。",
        "pt1-6加起来30分钟,不听这辈子白活了。",
        "不了解Shing02,但是不听这辈子白活了。"
      ]
    },
    {
      id: "kiminiaeta",
      title: "君に会えた日",
      artist: "鬼頭明里 & 伊藤美来",
      album: "君に会えた日",
      year: 2021,
      src: "assets/audio/track02.mp3",
      dur: 177.37,
      stripe: "pink",
      note: [
        "两分钟五十七秒太短太短了。",
        "看一辈子安达与岛村。",
        "适合在天气很好的时候听。"
      ]
    },
    {
      id: "coloryournight",
      title: "Color Your Night",
      artist: "Lotus Juice · 高橋あず美 · ATLUS GAME MUSIC",
      album: "ペルソナ3 リロード オリジナル・サウンドトラック",
      year: 2024,
      src: "assets/audio/track03.mp3",
      dur: 227.29,
      stripe: "lime",
      note: [
        "潮到你了小妹妹。",
        "豪到你了小妹妹。",
        "染上夜色。"
      ]
    },
    {
      id: "babydontcry",
      title: "Baby, Don't Cry (인어의 눈물)",
      artist: "EXO",
      album: "The 1st Album XOXO (KISS&HUG)",
      year: 2013,
      src: "assets/audio/track04.mp3",
      dur: 235.96,
      stripe: "gray",
      note: [
        "好听。",
        "b(￣▽￣)d",
        "豪庭。"
      ]
    },
    {
      id: "thankyou",
      title: "サンキュー！！",
      artist: "HOME MADE 家族",
      album: "ロックザワールド",
      year: 2004,
      src: "assets/audio/track05.mp3",
      dur: 252.60,
      stripe: "blue",
      note: [
        "死神BLEACH",
        "BLEACH死神",
        "死神BLEACH"
      ]
    },
    {
      id: "worldismine",
      title: "世界第一公主殿下 (ワールドイズマイン)",
      artist: "Re starlight",
      album: "超かぐや姫！",
      year: 2025,
      src: "assets/audio/track06.mp3",
      dur: 207.57,
      stripe: "lime",
      note: [
        "咔哇哟！",
        "超辉夜姬！",
        "不听别活了！"
      ]
    }
  ],

  /* ---------- 项目（真实仓库） ---------- */
  /* status: live 维护中 / wip 开发中 / arch 已归档
     host: github / gitee
     stripe: blue pink lime gray */
  projects: [
    {
      id: "mediarouter",
      title: "MediaRouter",
      subtitle: "本地媒体库 + 规则路由启动器",
      summary: "按「分类 + 扩展名」把文件交给指定的播放器 / 阅读器打开。Windows 上的右键菜单替代品，省掉每次「打开方式」。",
      year: 2026,
      status: "live",
      host: "github",
      lang: "Rust",
      tags: ["Rust", "Windows", "CLI"],
      stack: "Rust · Windows",
      repo: "https://github.com/sy1lo/mediarouter",
      stripe: "blue"
    },
    {
      id: "cproject",
      title: "CProject",
      subtitle: "C 语言练习仓库",
      summary: "",
      year: 2026,
      status: "wip",
      host: "gitee",
      lang: "C",
      tags: ["C"],
      stack: "C · MIT",
      repo: "https://gitee.com/lsy1105/cproject",
      stripe: "lime"
    }
  ],

  /* ---------- 相册 ---------- */
  /* src 在 assets/photos/，w/h 是实际像素（用于占位，避免加载时抖动） */
  photos: [
    { src: "assets/photos/photo01.jpg", w: 1372, h: 870,  tag: "插画", caption: "蓝发与龙尾" },
    { src: "assets/photos/photo02.jpg", w: 1080, h: 2340, tag: "插画", caption: "上伊那ぼたん" },
    { src: "assets/photos/photo03.jpg", w: 1400, h: 1460, tag: "插画", caption: "两个人的下午" },
    { src: "assets/photos/photo04.jpg", w: 1400, h: 1506, tag: "插画", caption: "花与裙摆" },
    { src: "assets/photos/photo05.jpg", w: 1400, h: 788,  tag: "截图", caption: "金色长发" },
    { src: "assets/photos/photo06.jpg", w: 1400, h: 876,  tag: "截图", caption: "屏幕截图 13" },
    { src: "assets/photos/photo07.jpg", w: 1400, h: 876,  tag: "截图", caption: "屏幕截图 14" },
    { src: "assets/photos/photo08.jpg", w: 1400, h: 876,  tag: "截图", caption: "屏幕截图 20" }
  ],

  /* ---------- 友情链接 ---------- */
  friends: [
    {
      name: "UmieP",
      desc: "一枚热爱动画与轻小说、养着两只机器人伙伴的私人偶像制作人",
      url: "https://umiep.dpdns.org/",
      tags: ["动画", "轻小说"]
    }
  ],

  /* ---------- 别的入口 ---------- */
  socials: [
    { label: "GitHub",   handle: "@sy1lo",            url: "https://github.com/sy1lo", kind: "代码" },
    { label: "Gitee",    handle: "lsy1105",           url: "https://gitee.com/lsy1105", kind: "代码" },
    { label: "Email",    handle: "2135619868@qq.com", url: "mailto:2135619868@qq.com", kind: "邮件" },
    { label: "QQ",       handle: "2135619868",        url: "tencent://message/?uin=2135619868", kind: "即时" },
    { label: "Bilibili", handle: "space.bilibili.com/453959410", url: "https://space.bilibili.com/453959410", kind: "视频" }
  ],

  /* ---------- Steam 动态 ---------- */
  /* 数据由 .github/workflows/steam.yml 定时抓取，写到 steam.json；
     页面只 fetch 同源文件，不直接调 Steam API（避免泄露 key）。 */
  steam: {
    profileUrl: "https://steamcommunity.com/id/YOUR_STEAM_VANITY",
    refreshHint: "每天 06:00 / 18:00（北京时间）自动更新"
  },

  /* ---------- 界面文案（可用 editor.html 图形化修改） ---------- */
  /* key 与 index.html 里的 data-ui 属性一一对应。 */
  /* 改了这里，对应位置的文字会被替换；删掉某条则回退到 HTML 里的默认值。 */
  ui: {
    /* 动态页 · 时长榜 */
    "feed.p2.h1": "MOST PLAYED / 时长榜",
    "feed.p2.k1": "ALL TIME",

    /* 动态页 · 数据怎么来的 */
    "feed.p3.h1": "HOW / 数据怎么来的",
    "feed.p3.k1": "JSON + 前端渲染",
    "feed.p3.p1": "更新频率：每天两次。",
    "feed.p3.l1": "API key 只存在仓库 Secrets 里，前端永远看不到。",

    /* 动态页 · 最近在玩 */
    "feed.p1.h1": "STEAM / 最近在玩",
    "feed.p1.k1": "—",
    "feed.p1.k2": "0 GAMES",

    /* 动态页 · 最近在玩 · 副标题 */
    "feed.p1.h2": "RECENT / 最近两周",

    /* 联系页 · 可以聊 */
    "contact.p2.h1": "WHAT TO SAY / 可以聊",
    "contact.p2.k1": "YES",
    "contact.p2.l1": "前端 / 界面 / 像素字体相关的问题，尽量答。",
    "contact.p2.l2": "开源项目的小 bug、文档错误，直接发 issue 更快。",
    "contact.p2.l3": "想用我的东西做个什么东西，说一声就行。",
    "contact.p2.l4": "单纯想说「这个界面挺怪的」，也收。",

    /* 联系页 · 联系 */
    "contact.p1.h1": "CONTACT / 联系",
    "contact.p1.k1": "REPLY ≤ 48H",
    "contact.p1.k2": "5 LINKS",
    "contact.p1.p1": "邮件标题写清来意会快很多，比如「友链申请 / 你的站点名」。",

    /* 联系页 · 联系 · 副标题 */
    "contact.p1.h2": "ELSEWHERE / 我的主页",

    /* 联系页 · 请别发 */
    "contact.p3.h1": "WHAT NOT / 请别发",
    "contact.p3.k1": "NO",
    "contact.p3.p1": "不回不是没礼貌，是邮箱里这类太多了。",
    "contact.p3.l1": "「帮我免费做个网站，很简单」。",
    "contact.p3.l2": "SEO 外链、软文、课程推广、招聘群发。",
    "contact.p3.l3": "要微信号再聊三天的商务流程。",

    /* 联系页 · 时区 */
    "contact.p4.h1": "TIME / 时区",
    "contact.p4.k1": "GMT+8",

    /* 首页 · 磁带架 */
    "home.p4.h1": "TAPE SHELF / 磁带架",
    "home.p4.k1": "6 TRACKS",

    /* 首页 · 此刻 */
    "home.p11.h1": "LOCAL / 此刻",
    "home.p11.k1": "GMT+8",

    /* 首页 · 关于我 */
    "home.p2.h1": "PROFILE / 关于我",
    "home.p2.k1": "README.md",
    "home.p2.p1": "把一个个人主页做成一台老式软件，能点的地方都真的能点。",
    "home.p2.p2": "给我发邮件 复制邮箱 复制 QQ GitHub ↗ Gitee ↗ 邮箱：2135619868@qq.com · QQ：2135619868 · 通常 48 小时内回。",

    /* 首页 · 近况 */
    "home.p3.h1": "NOW / 近况",
    "home.p3.k1": "更新于 —",

    /* 首页 · 曲目信息 */
    "home.p6.h1": "TRACK INFO / 曲目信息",
    "home.p6.k1": "LOCAL FILE",

    /* 首页 · 相册 */
    "home.p8.h1": "GALLERY / 相册",
    "home.p8.m1": "全部 →",

    /* 首页 · 项目 */
    "home.p7.h1": "WORKS / 项目",
    "home.p7.m1": "全部 →",

    /* 首页 · 友链 */
    "home.p10.h1": "FRIENDS / 友链",
    "home.p10.m1": "全部 →",

    /* 首页 · 正在放 */
    "home.p1.h1": "NOW PLAYING / 正在放",
    "home.p1.k1": "DECK 01 · 真·音频",
    "home.p1.p1": "Nujabes & Shing02",

    /* 首页 · 正在放 · 副标题 */
    "home.p1.h2": "Luv (sic) pt4",

    /* 首页 · 最近 */
    "home.p9.h1": "STEAM / 最近",
    "home.p9.m1": "全部 →",

    /* 首页 · EQUALIZER */
    "home.p5.h1": "EQUALIZER",
    "home.p5.k1": "REACTIVE",

    /* 相册页 · 说明 */
    "gallery.p2.h1": "ABOUT / 说明",
    "gallery.p2.k1": "300",
    "gallery.p2.p1": "这里放平时存的插画和截图。有些是喜欢的作品，有些是自己截的，来源都记在文件名和说明里。",
    "gallery.p2.p2": "图片都压过，单张 130–370 KB，整册不到 2 MB。",

    /* 相册页 · 相册 */
    "gallery.p1.h1": "GALLERY / 相册",
    "gallery.p1.k1": "8 PHOTOS",

    /* 相册页 · HOW IT WORKS */
    "gallery.p3.h1": "HOW IT WORKS",
    "gallery.p3.k1": "JUSTIFIED",
    "gallery.p3.l1": "按行排布，每行等高，宽度按图片比例分配。",
    "gallery.p3.l2": "窗口变化会重新计算行，不会出现尴尬的空洞。",
    "gallery.p3.l3": "图片带真实宽高，加载时不抖动。",

    /* 项目页 · 代码仓库 */
    "works.p4.h1": "CODE / 代码仓库",
    "works.p4.k1": "2 SITES",
    "works.p4.l1": "GitHub",
    "works.p4.l2": "github.com/sy1lo",
    "works.p4.l3": "Gitee",
    "works.p4.l4": "gitee.com/lsy1105",

    /* 项目页 · 归档 */
    "works.p2.h1": "BY YEAR / 归档",
    "works.p2.k1": "ALL TIME",

    /* 项目页 · 图例 */
    "works.p3.h1": "STATUS / 图例",
    "works.p3.k1": "LEGEND",
    "works.p3.l1": "维护中",
    "works.p3.l2": "还在更新，欢迎提 issue",
    "works.p3.l3": "开发中",
    "works.p3.l4": "能用，但随时会改",
    "works.p3.l5": "已归档",
    "works.p3.l6": "不再更新，代码留着",

    /* 项目页 · 项目 */
    "works.p1.h1": "WORKS / 项目",
    "works.p1.k1": "2 ITEMS",
    "works.p1.p1": "只有真实仓库。GitHub 和 Gitee 上都算，点「源码」直接过去。",

    /* 页脚 */
    "global.colophon": "© 2026 sy1lo · 手写代码 · 无追踪",
    "global.noscript": "这个主页用 JavaScript 渲染列表和播放器。开启后再来看，或者直接发邮件给我。",

    /* 友链页 · 申请友链 */
    "friends.p2.h1": "APPLY / 申请友链",
    "friends.p2.k1": "OPEN",
    "friends.p2.p1": "欢迎交换链接，先看看这几条，省得来回问：",
    "friends.p2.l1": "站点有自己的内容，不是纯转载或采集站。",
    "friends.p2.l2": "半年内更新过，能正常访问（HTTPS 更好）。",
    "friends.p2.l3": "先把我的链接挂上去，再来邮件告诉我。",
    "friends.p2.l4": "只收个人站点；公司站、导流站、批量生成站不接。",

    /* 友链页 · 说明 */
    "friends.p4.h1": "NOTE / 说明",
    "friends.p4.k1": "HONEST",
    "friends.p4.p1": "友链不是交换流量，是「这几个人写的东西我愿意推荐」。所以我会真的点进去看。",
    "friends.p4.p2": "如果哪天关站了，我会把链接挪到归档，不会装作没发生过。",

    /* 友链页 · 我的信息 */
    "friends.p3.h1": "MY CARD / 我的信息",
    "friends.p3.k1": "COPY ME",
    "friends.p3.p1": "直接复制下面任意一段，比手打省事。",

    /* 友链页 · 友情链接 */
    "friends.p1.h1": "FRIENDS / 友情链接",
    "friends.p1.k1": "1 SITE",
    "friends.p1.p1": "这些人的博客我基本每期都看。顺序不分先后，链接都能打开。",

    /* 状态栏 */
    "global.statusbar": "手写 HTML / CSS / JS · 无追踪",
  },

  /* ---------- 界面文案的分组（编辑器用来显示中文分类，不影响页面） ---------- */
  uiGroup: {
    "contact.p1.h1": "联系页 · 联系",
    "contact.p1.h2": "联系页 · 联系 · 副标题",
    "contact.p1.k1": "联系页 · 联系",
    "contact.p1.k2": "联系页 · 联系",
    "contact.p1.p1": "联系页 · 联系",
    "contact.p2.h1": "联系页 · 可以聊",
    "contact.p2.k1": "联系页 · 可以聊",
    "contact.p2.l1": "联系页 · 可以聊",
    "contact.p2.l2": "联系页 · 可以聊",
    "contact.p2.l3": "联系页 · 可以聊",
    "contact.p2.l4": "联系页 · 可以聊",
    "contact.p3.h1": "联系页 · 请别发",
    "contact.p3.k1": "联系页 · 请别发",
    "contact.p3.l1": "联系页 · 请别发",
    "contact.p3.l2": "联系页 · 请别发",
    "contact.p3.l3": "联系页 · 请别发",
    "contact.p3.p1": "联系页 · 请别发",
    "contact.p4.h1": "联系页 · 时区",
    "contact.p4.k1": "联系页 · 时区",
    "feed.p1.h1": "动态页 · 最近在玩",
    "feed.p1.h2": "动态页 · 最近在玩 · 副标题",
    "feed.p1.k1": "动态页 · 最近在玩",
    "feed.p1.k2": "动态页 · 最近在玩",
    "feed.p2.h1": "动态页 · 时长榜",
    "feed.p2.k1": "动态页 · 时长榜",
    "feed.p3.h1": "动态页 · 数据怎么来的",
    "feed.p3.k1": "动态页 · 数据怎么来的",
    "feed.p3.l1": "动态页 · 数据怎么来的",
    "feed.p3.p1": "动态页 · 数据怎么来的",
    "friends.p1.h1": "友链页 · 友情链接",
    "friends.p1.k1": "友链页 · 友情链接",
    "friends.p1.p1": "友链页 · 友情链接",
    "friends.p2.h1": "友链页 · 申请友链",
    "friends.p2.k1": "友链页 · 申请友链",
    "friends.p2.l1": "友链页 · 申请友链",
    "friends.p2.l2": "友链页 · 申请友链",
    "friends.p2.l3": "友链页 · 申请友链",
    "friends.p2.l4": "友链页 · 申请友链",
    "friends.p2.p1": "友链页 · 申请友链",
    "friends.p3.h1": "友链页 · 我的信息",
    "friends.p3.k1": "友链页 · 我的信息",
    "friends.p3.p1": "友链页 · 我的信息",
    "friends.p4.h1": "友链页 · 说明",
    "friends.p4.k1": "友链页 · 说明",
    "friends.p4.p1": "友链页 · 说明",
    "friends.p4.p2": "友链页 · 说明",
    "gallery.p1.h1": "相册页 · 相册",
    "gallery.p1.k1": "相册页 · 相册",
    "gallery.p2.h1": "相册页 · 说明",
    "gallery.p2.k1": "相册页 · 说明",
    "gallery.p2.p1": "相册页 · 说明",
    "gallery.p2.p2": "相册页 · 说明",
    "gallery.p3.h1": "相册页 · HOW IT WORKS",
    "gallery.p3.k1": "相册页 · HOW IT WORKS",
    "gallery.p3.l1": "相册页 · HOW IT WORKS",
    "gallery.p3.l2": "相册页 · HOW IT WORKS",
    "gallery.p3.l3": "相册页 · HOW IT WORKS",
    "global.colophon": "页脚",
    "global.noscript": "页脚",
    "global.statusbar": "状态栏",
    "home.p1.h1": "首页 · 正在放",
    "home.p1.h2": "首页 · 正在放 · 副标题",
    "home.p1.k1": "首页 · 正在放",
    "home.p1.p1": "首页 · 正在放",
    "home.p10.h1": "首页 · 友链",
    "home.p10.m1": "首页 · 友链",
    "home.p11.h1": "首页 · 此刻",
    "home.p11.k1": "首页 · 此刻",
    "home.p2.h1": "首页 · 关于我",
    "home.p2.k1": "首页 · 关于我",
    "home.p2.p1": "首页 · 关于我",
    "home.p2.p2": "首页 · 关于我",
    "home.p3.h1": "首页 · 近况",
    "home.p3.k1": "首页 · 近况",
    "home.p4.h1": "首页 · 磁带架",
    "home.p4.k1": "首页 · 磁带架",
    "home.p5.h1": "首页 · EQUALIZER",
    "home.p5.k1": "首页 · EQUALIZER",
    "home.p6.h1": "首页 · 曲目信息",
    "home.p6.k1": "首页 · 曲目信息",
    "home.p7.h1": "首页 · 项目",
    "home.p7.m1": "首页 · 项目",
    "home.p8.h1": "首页 · 相册",
    "home.p8.m1": "首页 · 相册",
    "home.p9.h1": "首页 · 最近",
    "home.p9.m1": "首页 · 最近",
    "works.p1.h1": "项目页 · 项目",
    "works.p1.k1": "项目页 · 项目",
    "works.p1.p1": "项目页 · 项目",
    "works.p2.h1": "项目页 · 归档",
    "works.p2.k1": "项目页 · 归档",
    "works.p3.h1": "项目页 · 图例",
    "works.p3.k1": "项目页 · 图例",
    "works.p3.l1": "项目页 · 图例",
    "works.p3.l2": "项目页 · 图例",
    "works.p3.l3": "项目页 · 图例",
    "works.p3.l4": "项目页 · 图例",
    "works.p3.l5": "项目页 · 图例",
    "works.p3.l6": "项目页 · 图例",
    "works.p4.h1": "项目页 · 代码仓库",
    "works.p4.k1": "项目页 · 代码仓库",
    "works.p4.l1": "项目页 · 代码仓库",
    "works.p4.l2": "项目页 · 代码仓库",
    "works.p4.l3": "项目页 · 代码仓库",
    "works.p4.l4": "项目页 · 代码仓库",
  },
};
