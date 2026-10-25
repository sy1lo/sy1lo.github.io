/* ============================================================
   站点内容 —— 只改这个文件，页面自动更新
   ------------------------------------------------------------
   建议用根目录的 editor.html 图形化编辑，不用手写。
   site      你本人：名字、邮箱、QQ、社交账号、自我介绍、近况
   tracks    磁带架上的歌（音频在 assets/audio/）
   projects  项目
   photos    相册（图片在 assets/photos/）
   friends   友情链接
   socials   别的入口
   steam     Steam 动态配置
   ui        界面文案（key 与 index.html 的 data-ui 对应）
   ============================================================ */

const DATA = {
  "site": {
    "name": "sy1lo",
    "handle": "@sy1lo",
    "role": "yuri爱好者",
    "tagline": "vibe-coding享受者",
    "email": "2135619868@qq.com",
    "qq": "2135619868",
    "url": "https://sy1lo.github.io/",
    "location": "China",
    "since": 2026,
    "status": "欢迎你",
    "version": "v2026.10",
    "github": "https://github.com/sy1lo",
    "gitee": "https://gitee.com/lsy1105",
    "bilibili": "https://space.bilibili.com/453959410",
    "about": [
      "最鼓励同学之人",
      "世界最能绷之人",
      "世界最懒惰之人"
    ],
    "now": [
      {
        "k": "在做",
        "v": "做人"
      },
      {
        "k": "在读",
        "v": "《一周一次买下同班同学的那些事》"
      },
      {
        "k": "在听",
        "v": "Luv (sic) pt4 — Nujabes & Shing02"
      },
      {
        "k": "在学",
        "v": "电子科学与技术"
      }
    ],
    "nowUpdated": "2026-10-25"
  },
  "tracks": [
    {
      "id": "luvsic4",
      "title": "Luv (sic) pt4",
      "artist": "Nujabes & Shing02",
      "album": "Luv (sic) Hexalogy",
      "year": 2005,
      "src": "assets/audio/track01.mp3",
      "dur": 312.45,
      "stripe": "blue",
      "note": [
        "不听这辈子白活了。",
        "pt1-6加起来30分钟,不听这辈子白活了。",
        "不了解Shing02,但是不听这辈子白活了。"
      ]
    },
    {
      "id": "kiminiaeta",
      "title": "君に会えた日",
      "artist": "鬼頭明里 & 伊藤美来",
      "album": "君に会えた日",
      "year": 2021,
      "src": "assets/audio/track02.mp3",
      "dur": 177.37,
      "stripe": "pink",
      "note": [
        "两分钟五十七秒太短太短了。",
        "看一辈子安达与岛村。",
        "适合在天气很好的时候听。"
      ]
    },
    {
      "id": "coloryournight",
      "title": "Color Your Night",
      "artist": "Lotus Juice · 高橋あず美 · ATLUS GAME MUSIC",
      "album": "ペルソナ3 リロード オリジナル・サウンドトラック",
      "year": 2024,
      "src": "assets/audio/track03.mp3",
      "dur": 227.29,
      "stripe": "lime",
      "note": [
        "潮到你了小妹妹。",
        "豪到你了小妹妹。",
        "染上夜色。"
      ]
    },
    {
      "id": "babydontcry",
      "title": "Baby, Don't Cry (인어의 눈물)",
      "artist": "EXO",
      "album": "The 1st Album XOXO (KISS&HUG)",
      "year": 2013,
      "src": "assets/audio/track04.mp3",
      "dur": 235.96,
      "stripe": "gray",
      "note": [
        "好听。",
        "b(￣▽￣)d",
        "豪庭。"
      ]
    },
    {
      "id": "thankyou",
      "title": "サンキュー！！",
      "artist": "HOME MADE 家族",
      "album": "ロックザワールド",
      "year": 2004,
      "src": "assets/audio/track05.mp3",
      "dur": 252.6,
      "stripe": "blue",
      "note": [
        "死神BLEACH",
        "BLEACH死神",
        "死神BLEACH"
      ]
    },
    {
      "id": "worldismine",
      "title": "世界第一公主殿下 (ワールドイズマイン)",
      "artist": "Re starlight",
      "album": "超かぐや姫！",
      "year": 2025,
      "src": "assets/audio/track06.mp3",
      "dur": 207.57,
      "stripe": "lime",
      "note": [
        "咔哇哟！",
        "超辉夜姬！",
        "不听别活了！"
      ]
    }
  ],
  "projects": [
    {
      "id": "mediarouter",
      "title": "MediaRouter",
      "subtitle": "本地媒体库 + 规则路由启动器",
      "summary": "按「分类 + 扩展名」把文件交给指定的播放器 / 阅读器打开",
      "year": 2026,
      "status": "live",
      "host": "github",
      "lang": "Rust",
      "tags": [
        "Rust",
        "Windows",
        "CLI"
      ],
      "stack": "Rust · Windows",
      "repo": "https://github.com/sy1lo/mediarouter",
      "stripe": "blue"
    },
    {
      "id": "cproject",
      "title": "CProject",
      "subtitle": "C 语言练习仓库",
      "summary": "",
      "year": 2026,
      "status": "wip",
      "host": "gitee",
      "lang": "C",
      "tags": [
        "C"
      ],
      "stack": "C · MIT",
      "repo": "https://gitee.com/lsy1105/cproject",
      "stripe": "lime"
    }
  ],
  "photos": [
    {
      "src": "assets/photos/MH.jpg",
      "w": 850,
      "h": 604,
      "tag": "插画",
      "caption": "MH"
    },
    {
      "src": "assets/photos/HG.jpg",
      "w": 1119,
      "h": 1317,
      "tag": "插画",
      "caption": "..."
    },
    {
      "src": "assets/photos/photo02.jpg",
      "w": 1080,
      "h": 2340,
      "tag": "插画",
      "caption": "上伊那ぼたん"
    },
    {
      "src": "assets/photos/photo05.jpg",
      "w": 1400,
      "h": 788,
      "tag": "插画",
      "caption": "辉夜姬"
    },
    {
      "src": "assets/photos/dm.jpg",
      "w": 4096,
      "h": 3072,
      "tag": "照片",
      "caption": "呆猫"
    },
    {
      "src": "assets/photos/photo03.jpg",
      "w": 1400,
      "h": 1460,
      "tag": "插画",
      "caption": "シーナ"
    },
    {
      "src": "assets/photos/photo04.jpg",
      "w": 1400,
      "h": 1506,
      "tag": "插画",
      "caption": "雨月忍"
    },
    {
      "src": "assets/photos/photo06.jpg",
      "w": 1400,
      "h": 876,
      "tag": "截图",
      "caption": "MHWI01"
    },
    {
      "src": "assets/photos/photo07.jpg",
      "w": 1400,
      "h": 876,
      "tag": "截图",
      "caption": "MHWI02"
    },
    {
      "src": "assets/photos/photo08.jpg",
      "w": 1400,
      "h": 876,
      "tag": "截图",
      "caption": "MHWI03"
    },
    {
      "src": "assets/photos/Imoto_Life.jpg",
      "w": 1892,
      "h": 2800,
      "tag": "插画",
      "caption": "Imoto Life"
    },
    {
      "src": "assets/photos/ren.jpg",
      "w": 871,
      "h": 1095,
      "tag": "插画",
      "caption": "忍"
    },
    {
      "src": "assets/photos/ls.jpeg",
      "w": 1341,
      "h": 1221,
      "tag": "插画",
      "caption": "恋死"
    },
    {
      "src": "assets/photos/adachi.jpg",
      "w": 1868,
      "h": 2108,
      "tag": "插画",
      "caption": "安岛"
    },
    {
      "src": "assets/photos/O.jpg",
      "w": 2000,
      "h": 3423,
      "tag": "插画",
      "caption": "O"
    },
    {
      "src": "assets/photos/illust_80096226_20261012_103233.png",
      "w": 1200,
      "h": 900,
      "tag": "插画",
      "caption": "illust"
    }
  ],
  "friends": [
    {
      "name": "UmieP",
      "desc": "一只热爱动画与轻小说、养着两只机器人伙伴的私人偶像制作人",
      "url": "https://umiep.dpdns.org/",
      "tags": [
        "动画",
        "轻小说",
        "偶像大师"
      ]
    }
  ],
  "socials": [
    {
      "label": "GitHub",
      "handle": "@sy1lo",
      "url": "https://github.com/sy1lo",
      "kind": "代码"
    },
    {
      "label": "Gitee",
      "handle": "lsy1105",
      "url": "https://gitee.com/lsy1105",
      "kind": "代码"
    },
    {
      "label": "Email",
      "handle": "2135619868@qq.com",
      "url": "mailto:2135619868@qq.com",
      "kind": "邮件"
    },
    {
      "label": "QQ",
      "handle": "2135619868",
      "url": "tencent://message/?uin=2135619868",
      "kind": "即时"
    },
    {
      "label": "Bilibili",
      "handle": "space.bilibili.com/453959410",
      "url": "https://space.bilibili.com/453959410",
      "kind": "视频"
    }
  ],
  "steam": {
    "profileUrl": "https://steamcommunity.com/id/YOUR_STEAM_VANITY",
    "refreshHint": "每天 06:00 / 18:00（北京时间）自动更新"
  },
  "ui": {
    "feed.p2.h1": "MOST PLAYED / 时长榜",
    "feed.p2.k1": "ALL TIME",
    "feed.p3.h1": "WELCOME / 欢迎",
    "feed.p3.k1": "HELLO",
    "feed.p3.p1": "更新频率：每天 06:00 / 18:00（北京时间）自动更新",
    "feed.p3.l1": "欢迎加好友！",
    "feed.p3.l2": "一起打游戏！",
    "feed.p3.l3": "怪物猎人！",
    "feed.p3.l4": "也打手游！",
    "feed.p1.h1": "STEAM / 最近在玩",
    "feed.p1.h2": "RECENT / 最近两周",
    "contact.p2.h1": "WHAT TO SAY / 可以聊",
    "contact.p2.k1": "YES",
    "contact.p2.l1": "GAME",
    "contact.p2.l2": "NOVEL",
    "contact.p2.l3": "YURI",
    "contact.p2.l4": "钝角",
    "contact.p1.h1": "CONTACT / 联系",
    "contact.p1.k1": "REPLY ≤ 48H",
    "contact.p1.p1": "别开我盒",
    "contact.p1.h2": "ELSEWHERE / 我的主页",
    "contact.p3.h1": "WHAT NOT / 请别发",
    "contact.p3.k1": "NO",
    "contact.p3.p1": "~~~",
    "contact.p3.l1": "GAY",
    "contact.p3.l2": "Ad",
    "contact.p3.l3": "STUDY",
    "contact.p4.h1": "TIME / 时区",
    "contact.p4.k1": "GMT+8",
    "home.p4.h1": "MUSIC / 音乐",
    "home.p11.h1": "LOCAL / 此刻",
    "home.p11.k1": "GMT+8",
    "home.p2.h1": "PROFILE / 关于我",
    "home.p2.k1": "README.md",
    "home.p3.h1": "NOW / 近况",
    "home.p6.h1": "TRACK INFO / 曲目信息",
    "home.p6.k1": "LOCAL FILE",
    "home.p8.h1": "GALLERY / 相册",
    "home.p8.m1": "全部 →",
    "home.p7.h1": "WORKS / 项目",
    "home.p10.h1": "FRIENDS / 友链",
    "home.p10.m1": "全部 →",
    "home.p1.h1": "NOW PLAYING / 正在放",
    "home.p1.k1": "DECK 01 · 真·音频",
    "home.p9.h1": "STEAM / 最近",
    "home.p9.m1": "全部 →",
    "home.p5.h1": "EQUALIZER",
    "home.p5.k1": "REACTIVE",
    "gallery.p2.h1": "ABOUT / 说明",
    "gallery.p2.k1": "300",
    "gallery.p2.p1": "存的插画和截图。",
    "gallery.p2.p2": "看心情放在这里",
    "gallery.p1.h1": "GALLERY / 相册",
    "gallery.p3.h1": "INTEREST",
    "gallery.p3.k1": "LOVE",
    "gallery.p3.l1": "Adachi and Shimamura",
    "gallery.p3.l2": "Monster Hunter World",
    "gallery.p3.l3": "Imoto Life",
    "works.p4.h1": "CODE / 代码仓库",
    "works.p4.k1": "2 SITES",
    "works.p4.l1": "GitHub",
    "works.p4.l2": "github.com/sy1lo",
    "works.p4.l3": "Gitee",
    "works.p4.l4": "gitee.com/lsy1105",
    "works.p2.h1": "BY YEAR / 归档",
    "works.p2.k1": "ALL TIME",
    "works.p3.h1": "STATUS / 图例",
    "works.p3.k1": "LEGEND",
    "works.p3.l1": "维护中",
    "works.p3.l2": "欢迎提议",
    "works.p3.l3": "开发中",
    "works.p3.l4": "随时会改",
    "works.p3.l5": "已归档",
    "works.p3.l6": "不再更新",
    "works.p1.h1": "WORKS / 项目",
    "works.p1.p1": "只有真实仓库。GitHub 和 Gitee 上都算，点「源码」直接过去。",
    "global.colophon": "© 2026 sy1lo · 奶蛙＞噜噜",
    "global.noscript": "这个主页用 JavaScript 渲染列表和播放器。开启后再来看，或者直接发邮件给我。",
    "friends.p2.h1": "APPLY / 申请友链",
    "friends.p2.k1": "OPEN",
    "friends.p2.p1": "欢迎交换链接：",
    "friends.p2.l1": "站点属于个人。",
    "friends.p2.l2": "半年内更新过。",
    "friends.p2.l3": "记得把我的链接挂上去。",
    "friends.p2.l4": "676767",
    "friends.p4.h1": "NOTE / 说明",
    "friends.p4.k1": "HONEST",
    "friends.p4.p1": "有人看吗",
    "friends.p4.p2": "有人在看吗",
    "friends.p3.h1": "MY CARD / 我的信息",
    "friends.p3.k1": "COPY ME",
    "friends.p3.p1": "复制到剪切板。",
    "friends.p1.h1": "FRIENDS / 友情链接",
    "friends.p1.p1": "给你挂网上——",
    "global.statusbar": "{url} · HTML / CSS / JS"
  },
  "uiGroup": {
    "contact.p1.h1": "联系页 · 联系",
    "contact.p1.h2": "联系页 · 联系 · 副标题",
    "contact.p1.k1": "联系页 · 联系",
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
    "feed.p2.h1": "动态页 · 时长榜",
    "feed.p2.k1": "动态页 · 时长榜",
    "feed.p3.h1": "动态页 · 数据怎么来的",
    "feed.p3.k1": "动态页 · 数据怎么来的",
    "feed.p3.l1": "动态页 · 数据怎么来的",
    "feed.p3.l2": "动态页 · 数据怎么来的",
    "feed.p3.l3": "动态页 · 数据怎么来的",
    "feed.p3.l4": "动态页 · 数据怎么来的",
    "feed.p3.p1": "动态页 · 数据怎么来的",
    "friends.p1.h1": "友链页 · 友情链接",
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
    "home.p1.k1": "首页 · 正在放",
    "home.p10.h1": "首页 · 友链",
    "home.p10.m1": "首页 · 友链",
    "home.p11.h1": "首页 · 此刻",
    "home.p11.k1": "首页 · 此刻",
    "home.p2.h1": "首页 · 关于我",
    "home.p2.k1": "首页 · 关于我",
    "home.p3.h1": "首页 · 近况",
    "home.p4.h1": "首页 · 磁带架",
    "home.p5.h1": "首页 · EQUALIZER",
    "home.p5.k1": "首页 · EQUALIZER",
    "home.p6.h1": "首页 · 曲目信息",
    "home.p6.k1": "首页 · 曲目信息",
    "home.p7.h1": "首页 · 项目",
    "home.p8.h1": "首页 · 相册",
    "home.p8.m1": "首页 · 相册",
    "home.p9.h1": "首页 · 最近",
    "home.p9.m1": "首页 · 最近",
    "works.p1.h1": "项目页 · 项目",
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
    "works.p4.l4": "项目页 · 代码仓库"
  }
};
