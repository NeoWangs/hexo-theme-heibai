# hexo-theme-heibai 黑白双式

> 知其白，守其黑，为天下式。——《道德经》

一款黑白双主题的 Hexo 博客主题。默认「知白」（米白纸色），一键切换「守黑」（墨黑），
用户的选择会记入 `localStorage`，下次访问自动保持。

设计融合了中西两种气质：英文大标题用 Space Grotesk 无衬线体撑起版面骨架，
中文正文用思源宋体（Noto Serif SC）铺陈书卷气，竖排诗词、朱红印章、
「完」字落款等细节则来自传统书画的版式语言。

## 页面

| 页面 | 说明 |
|---|---|
| 首页 | 大字主视觉 + 竖排诗词 + 跑马灯 + 四分类入口 + 近期文章 |
| 分类列表页 | 干净 URL（如 `/developer/`），文章按年份分组，年份用描边大字排版，支持分页 |
| 文章页 | 阅读时长估算、上一篇/下一篇、Gitalk 评论、MathJax 公式、朱红「完」字落款 |
| 关于/时间线页 | 左栏自我介绍 + 竖排诗词，右栏手工维护的大事记时间线 |

移动端自适应：窄屏下导航折叠为汉堡菜单，各页面栅格自动堆叠为单列。

## 依赖

- Hexo 6.x
- [hexo-renderer-ejs](https://github.com/hexojs/hexo-renderer-ejs)
- [hexo-renderer-stylus](https://github.com/hexojs/hexo-renderer-stylus)
- [hexo-pagination](https://github.com/hexojs/hexo-pagination)

```bash
npm install hexo-renderer-ejs hexo-renderer-stylus hexo-pagination --save
```

## 安装

```bash
cd your-hexo-site
git clone git@github.com:NeoWangs/hexo-theme-heibai.git themes/heibai
```

修改站点根目录 `_config.yml`：

```yaml
theme: heibai
```

## 配置

所有配置都在主题目录的 `_config.yml` 里，改完 `hexo clean && hexo server` 预览。

### 主题外观

```yaml
accent: "#C3272B"        # 强调色（印章红）
default_theme: light      # 默认配色：light=知白 / dark=守黑
brand_mark: 王白之印       # 顶栏印章文字，按字数自动排布成近似方形网格（4字2×2、6字3×2……）
show_ticker: true         # 首页跑马灯开关
```

### 分类

主题围绕「四分类」设计。`name` 必须与文章 front-matter 里的 `categories` 值一致，
主题会为每个分类生成干净 URL（`/developer/` 等）：

```yaml
categories:
  - name: developer      # 对应文章的 categories: developer
    en: DEVELOPER         # 列表页大标题 / 首页卡片英文名
    cn: 开发              # 中文名
    desc: 前端 · 图形 · 实验  # 首页卡片描述
  # ... 共四个
```

文章 front-matter 示例：

```yaml
---
title: 文章标题
date: 2026-01-01 12:00:00
categories: developer
tags: CSS3
---
```

### 首页主视觉（hero）

```yaml
hero:
  since: 'SINCE 2011 — HELLO WORLD'   # 顶部小字
  title_line1: "MR."                   # 大标题第一行
  title_line2_prefix: "DRIVE"          # 大标题第二行（中间会插入强调色的 "2"）
  title_line2_suffix: "FAR"
  title_cn: 开过头先生                  # 中文名
  subtitle: 写代码，也读诗              # 副题
  motto: 知其白，守其黑，为天下式        # 座右铭
  poem:
    lines: 莫听穿林打叶声……             # 竖排诗词
    author: 苏轼 · 定风波
```

### 关于/时间线页

先在站点里新建页面：

```bash
hexo new page about
```

把 `source/about/index.md` 的 front-matter 改为：

```markdown
---
title: 关于
layout: about
---
```

然后在主题配置里维护左栏文字与右栏大事记：

```yaml
about:
  title_line1: HELLO
  title_line2: WORLD
  text:                    # 左栏自我介绍，每项一行
    - 第一行
    - 第二行
  poem:
    lines: 君不见高堂明镜悲白发……
    author: 李白 · 将进酒

timeline:                  # 手工维护的大事记，与文章无关
  - year: "2011"
    title: 博客开张，Hello World
    desc: 第一篇文章……
```

### 页脚

```yaml
footer:
  couplet: ["海内存知己", "天涯若比邻"]   # 竖排对联，第二句为强调色
  links:                                # 友链
    - name: 友链名称
      url: https://example.com
  social:                               # 社交账号
    - name: GitHub
      url: https://github.com/yourname
  contact_email: you@example.com
  copyright: "© 2011–2026"
  beian:                                # ICP 备案（不需要可留空文字）
    text: 浙ICP备xxxxxxxx号
    url: http://beian.miit.gov.cn/
```

### 评论（Gitalk）

基于 GitHub Issue 的 [Gitalk](https://github.com/gitalk/gitalk) 评论。
需要先建一个存评论的公开仓库，并注册 GitHub OAuth App：

```yaml
comments:
  enable: true
  owner: yourname          # GitHub 用户名
  admin: yourname
  repo: your-comments-repo  # 仓库名（不是完整 URL）
  clientID: xxxx            # OAuth App 的 Client ID
  clientSecret: xxxx        # OAuth App 的 Client Secret
  language: zh-CN
```

不需要评论就设 `enable: false`。

### 数学公式

```yaml
mathjax: true   # 加载 MathJax 3，支持 LaTeX 公式
```

### 文章页侧边竖排文字

```yaml
article_aside: 天行有常，不为尧存，不为桀亡
```

## 开发

纯逻辑模块（按年分组、阅读时长估算）有单元测试，使用 Node 内置 test runner：

```bash
node --test test/lib-posts.test.js
```

## License

[MIT](LICENSE)
