// 全屏背景的需要导入这些js
const {
  root: siteRoot = "/source/"
} = hexo.config;
hexo.extend.injector.register("body_begin", `<div id="web_bg"></div>`);
hexo.extend.injector.register(
  "body_end",
  `<script src="${siteRoot}js/backgroundize.js"></script>
  <link defer rel="stylesheet" href="${siteRoot}css/backgroundize.css" />
  `
);