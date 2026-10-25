# sy1lo — 个人主页

复古视窗风格的个人主页，首页是一台**真的能放歌**的磁带机。手写 HTML / CSS / JS，零依赖、零构建，推到 GitHub Pages 就能跑。

六个页签：首页（磁带机 + 名片）/ 项目 / 相册 / 动态（Steam）/ 友链 / 联系。

---

## 一、改内容：用图形化编辑器

**不用改代码了。** 双击打开根目录的 `editor.html`（用 Chrome 或 Edge），就能用表单改所有内容。

### 第一次使用

1. 双击 `editor.html`，浏览器打开
2. 点右上角 **选择网站目录**
3. 选中这个文件夹（包含 `index.html` 的那个）→ 点「选择文件夹」→ 允许读写

授权一次后浏览器会记住，**以后打开直接改、直接保存**。

### 之后每次

改完 → 点 **保存到 data.js**（或按 `Ctrl+S`）→ 刷新网页就能看到。

### 七个标签页

| 标签 | 能改什么 |
| --- | --- |
| **基本信息** | 名字、身份、标语、邮箱、QQ、所在地、起始年份、状态徽章、版本号、站点地址、GitHub/Gitee/Bilibili、自我介绍段落、近况、Steam 配置 |
| **相册** | 每张图的标题、分类标签、说明；点「+ 加一张图片」会自动复制文件并读宽高 |
| **歌曲** | 曲名、艺人、专辑、年份、听感备注；点「+ 加一首歌」自动复制音频并读时长 |
| **项目** | 名称、简介、年份、状态、色条、仓库地址、技术栈、标签 |
| **友链** | 站点名、描述、网址、标签 |
| **入口** | 联系页的那些链接 |
| **界面文案** | **105 条**页面上固定的说明文字，按页面中文分组 |

### 关于「界面文案」

这一页解决的是「说明文字不知道在哪改」的问题。所有硬编码文案都按页面分组列出来了：

```
相册页 · 说明         ← 你截图里那两块
相册页 · HOW IT WORKS
项目页 · 图例
友链页 · 申请友链
联系页 · 可以聊
...
```

有搜索框，输「说明」或「HOW」就能直接定位。改完保存即可。

### 浏览器不支持怎么办

Firefox / Safari 不支持目录授权。这时点 **导出 JSON** 下载 `data.js`，手动替换 `assets/js/data.js` 即可。

---

## 二、页面结构

| 页签 | 内容 |
| --- | --- |
| 首页 | 磁带机（6 首真歌）+ 名片 + 关于我 + 近况 + 侧栏（磁带架/均衡器/曲目信息/项目/相册/Steam/友链/时钟） |
| 项目 | 真实仓库卡片（GitHub `mediarouter`、Gitee `cproject`）+ 年份归档 + 图例 |
| 相册 | 等高图片墙 + 分类筛选 + 灯箱（8 张图，1.8 MB） |
| 动态 | Steam 最近在玩 + 时长榜（JSON + 前端渲染） |
| 友链 | UmieP + 申请规则 + 我的信息卡（三种格式一键复制） |
| 联系 | 邮箱 / QQ / 5 个入口 + 时区 |

---

## 三、Steam 动态

数据流：

```
GitHub Actions (cron 每天两次)
   └→ scripts/fetch-steam.js
        ├→ Steam Web API（3 个公开接口）
        ├→ 封面图下载到 assets/steam/
        └→ 写 steam.json，提交回仓库
              └→ 页面 fetch("steam.json") → 渲染
```

**为什么这样设计**：API key 只存仓库 Secrets，前端看不到；没有第三方依赖；抓取失败时页面显示「暂无数据」不会白屏；封面图本地化，国内也能看。

### 配置（只需一次）

1. **拿 API Key**：https://steamcommunity.com/dev/apikey ，域名填 `sy1lo.github.io`
2. **拿 SteamID64**：https://steamid.io 输入你的主页地址，取 `steamID64`（`7656...` 开头）
3. **游戏详情设为公开**：Steam → 隐私设置 → 游戏详情 → 公开（**不做这步接口会返回空**）
4. **加 Secrets**：https://github.com/sy1lo/sy1lo.github.io/settings/secrets/actions
   - `STEAM_API_KEY`
   - `STEAM_ID`
5. **手动跑一次**：https://github.com/sy1lo/sy1lo.github.io/actions/workflows/steam.yml → Run workflow
6. **改主页地址**：编辑器「基本信息 → Steam 配置 → Steam 主页地址」

之后每天北京时间 06:00 / 18:00 自动更新。

---

## 四、页签切换动画

- **滑动指示条**：3px 蓝色横条跟随当前页签，缓动带轻微过冲
- **内容切换**：旧页淡出 160ms，新页淡入 340ms，右栏延迟 40ms
- 切页瞬时回到顶部（避免平滑滚动和淡出动画叠加）
- `scrollbar-gutter: stable` + `overflow-y: auto` 预留滚动条宽度，长页面切短页面不会左右跳动

---

## 五、相册图片墙

不是简单的 CSS Grid，是真正的等高排布：

1. 按每张图真实宽高比算「这行铺满后多高」
2. 贪心累加，直到高度 ≤ 目标行高（随容器宽度自适应）
3. 结尾只剩 1 张就并进上一行
4. 每行一个 flex 容器，行高固定，图宽按比例分配
5. 窗口 resize / 图片加载完 / 容器宽度变化 都会重算

**加图不用手填宽高**——编辑器会自动读取。

---

## 六、快捷键

| 键 | 作用 |
| --- | --- |
| `Space` | 播放 / 暂停 |
| `Esc` | 暂停（灯箱打开时是关闭） |
| `←` `→` | 波形前后 5 秒 / 灯箱翻页 |
| `1`–`6` | 切换页签 |
| `Ctrl+S` | 编辑器里保存 |

---

## 七、文件结构

```
index.html                      页面骨架（6 页签 + 灯箱）
editor.html                     ★ 图形化编辑器（本地用，不部署）
assets/js/data.js               全部内容数据（编辑器读写这个文件）
assets/js/app.js                交互逻辑
assets/css/style.css            全部样式
assets/audio/track01-06.mp3     6 首歌（160 kbps，27 MB）
assets/photos/photo01-08.jpg    8 张图（1.8 MB）
assets/fonts/                   自托管像素字体 + OFL 许可
assets/favicon.svg              站点图标
assets/preview.png              分享卡片 1200×630
steam.json                      Steam 数据（Actions 自动写入）
scripts/fetch-steam.js          Steam 抓取脚本
.github/workflows/steam.yml     定时任务
music/  pictures/               原始素材（.gitignore 已排除）
```

---

## 八、数据文件说明

`assets/js/data.js` 里的字段：

| 字段 | 内容 |
| --- | --- |
| `site` | 你本人：名字、邮箱、QQ、社交、自我介绍、近况 |
| `tracks` | 磁带架上的歌 |
| `projects` | 项目 |
| `photos` | 相册 |
| `friends` | 友链 |
| `socials` | 联系页入口 |
| `steam` | Steam 配置 |
| `ui` | 界面文案（105 条，key 对应 HTML 的 `data-ui`） |
| `uiGroup` | 文案的中文分组（给编辑器显示用） |

> **建议只用编辑器改。** 手改时注意：`ui` 的 key 必须和 `index.html` 里的 `data-ui` 属性一致；`photos` 的 `w`/`h` 填错会让图片墙排布错乱。

---

## 九、部署

```bash
git add .
git commit -m "update content"
git push
```

约 1 分钟后 https://sy1lo.github.io/ 生效。

---

## 十、上线前检查

- [ ] Steam Secrets 配好并跑过一次
- [ ] `assets/preview.png` 换成自己的分享图（可选）
- [ ] `music/`、`pictures/` 保持在 `.gitignore` 里（源文件不进部署）

## 许可

页面代码 MIT。字体 SIL OFL 1.1（`assets/fonts/OFL-*.txt`）。音乐和图片版权归原作者，仅作个人主页展示。
