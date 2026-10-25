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
    role: "前端工程师 / 像素爱好者",
    tagline: "把一个个人主页做成一台老式软件，能点的地方都真的能点",
    email: "2135619868@qq.com",
    qq: "2135619868",
    url: "https://sy1lo.github.io/",
    location: "China",
    since: 2019,
    status: "开放合作",          // 标题栏徽章
    version: "v2026.10",
    github: "https://github.com/sy1lo",
    gitee: "https://gitee.com/lsy1105",
    bilibili: "https://space.bilibili.com/453959410",
    about: [
      "我写前端，也画像素，喜欢做那种「一眼就知道是手工做的」界面。",
      "白天在团队里做设计系统，晚上折腾自己的小工具。这个主页是第三版，前两版都不好意思放出来。",
      "我对「能点」这件事有执念：界面上的每个按钮、每根进度条，最好都真的有用，否则就不该画出来。"
    ],
    /* 近况：首页 NOW 面板 */
    now: [
      { k: "在做", v: "重写这个主页的第四版（前三版都在 git 历史里）" },
      { k: "在读", v: "《设计中的设计》原研哉" },
      { k: "在听", v: "Luv (sic) pt4 — Nujabes & Shing02" },
      { k: "在学", v: "Rust 的所有权模型（第三次重学）" }
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
        "鼓点永远慢半拍，正好适合深夜改 bug 的时候循环。",
        "Shing02 的日语说唱像在跟你聊天，不是在表演。",
        "这一首我大概听了两百遍，每次都能从里面捞出一点新的层次。"
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
        "两分钟五十七秒，短到刚好够从车库走到工位。",
        "副歌那一下突然亮起来的部分，是我这一整年最喜欢的几秒。",
        "适合在天气很好的时候听，不适合在写文档的时候听——会走神。"
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
        "游戏里夜里的那段，没有战斗压力，只有路灯和便利店。",
        "编曲干净得可怕：鼓、贝斯、人声，别的什么都没加。",
        "做界面做累了就放这首，假装自己走在没有人打扰的街上。"
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
        "2013 年的歌，放到今天依然不过时，这件事本身就很厉害。",
        "人声编排是一层一层叠上去的，戴耳机会听见很多第一次没注意到的细节。",
        "情绪很满，但不会吵，这一点很难做到。"
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
        "副歌只有一个词反复唱，但一点都不腻。",
        "这种歌会让人觉得「今天好像也还行」。",
        "放在播放列表最后，用来收尾。"
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
        "翻唱版本，比原版更亮一点，鼓也更硬。",
        "这首歌的结构很教科书：前半段克制，副歌直接放开。",
        "适合在需要一点气势的时候听，比如周五下午。"
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
