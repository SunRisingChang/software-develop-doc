import { defineConfig } from "vitepress";

export default defineConfig({
  title: "软件开发文档",
  description: "软件开发相关文档记录",
  base: "/software-develop-doc/",
  assetsDir: "static",
  appearance: "dark",
  lastUpdated: true,
  lang: "zh-Hans",
  outDir: "./docs",
  head: [["link", { rel: "icon", type: "image/png", href: "favicon.svg" }]],
  themeConfig: {
    logo: "/favicon.svg",
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/SunRisingChang/software-develop-doc.git",
      },
    ],
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "最后更新于",
    },
    footer: {
      copyright: "Copyright © 2019-present Sunrise",
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            displayDetails: "详细列表",
            backButtonTitle: "返回",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
    sidebar: [
      {
        text: "Node",
        collapsed: false,
        items: [
          {
            text: "脚本常用库",
            link: "/mds/node/脚本常用库.md",
          },
        ],
      },
      {
        text: "Git",
        collapsed: false,
        items: [
          {
            text: "常用命令",
            link: "/mds/git/git常用命令.md",
          },
        ],
      },
      {
        text: "其它",
        collapsed: false,
        items: [
          {
            text: "开发环境优化",
            link: "/mds/other/开发环境优化.md",
          },
        ],
      },
    ],
    outline: {
      label: "目录",
    },
  },
  markdown: {
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
  },
});
