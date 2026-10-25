#!/usr/bin/env node
/**
 * 给 index.html 里的 CSS / JS 引用加上新的版本号。
 * ------------------------------------------------------------
 * 为什么需要：
 *   GitHub Pages 对所有文件返回 `Cache-Control: max-age=600`，
 *   同一个 URL 在 10 分钟内会被浏览器直接使用本地缓存，
 *   不发请求也不校验。改了 data.js 之后，访客可能仍看到旧内容。
 *
 *   给 URL 加 `?v=时间戳` 后，URL 变了，浏览器必须重新下载。
 *
 * 由 .github/workflows/bump-version.yml 在每次 push 时自动运行，
 * 也可以本地手动跑：node scripts/bump-version.js
 */

const fs = require("fs");
const path = require("path");

const FILE = path.join(process.cwd(), "index.html");

if (!fs.existsSync(FILE)) {
  console.error("找不到 index.html");
  process.exit(1);
}

let html = fs.readFileSync(FILE, "utf8");

const d = new Date();
const stamp =
  d.getFullYear() +
  String(d.getMonth() + 1).padStart(2, "0") +
  String(d.getDate()).padStart(2, "0") +
  "-" +
  String(d.getHours()).padStart(2, "0") +
  String(d.getMinutes()).padStart(2, "0");

const before = html;
html = html.replace(/(\?v=)[0-9A-Za-z\-]+/g, "$1" + stamp);

if (html === before) {
  console.log("没有需要更新的版本号（可能是文件里还没有 ?v= 参数）");
  process.exit(0);
}

fs.writeFileSync(FILE, html, "utf8");

const refs = [...html.matchAll(/(?:href|src)="([^"]+\?v=[^"]+)"/g)].map((m) => m[1]);
console.log("版本号:", stamp);
console.log("已更新 " + refs.length + " 处引用:");
refs.forEach((r) => console.log("  " + r));
