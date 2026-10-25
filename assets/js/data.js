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
  }
};
