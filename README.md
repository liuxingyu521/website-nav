<p align="center">
  <a href="https://liuxingyu521.github.io/website-nav" target="_blank">
    <img src="./public/logo.png" alt="website-nave-logo">
  </a>
</p>

![Build and Deploy](https://github.com/liuxingyu521/website-nav/actions/workflows/deploy.yml/badge.svg)

# Website nav

用来记录日常工作中用到的网站，方便随时随地查阅。

**网站持续收录ing...** (欢迎在 [这里](https://github.com/liuxingyu521/website-nav/issues/new?assignees=&labels=new-link&template=new-link.yml&title=%E3%80%90%E6%96%B0%E5%A2%9E%E5%AE%9E%E7%94%A8%E7%BD%91%E7%AB%99%E3%80%91) 推荐分享其他实用网站)

## 特点

- `cmd + k` 全局搜索网站关键字
- `github` 账号登录快捷推荐实用网站
- 移动端适配

## 预览

![website-nav screenshot](./website-nav.screenshot.png)

## 项目开发

本项目基于 vue3 + vite2 搭建，开发流程如下

```shell
# 1. 克隆项目代码
$ git clone git@github.com:liuxingyu521/website-nav.git

# 2. 安装依赖
$ pnpm install

# 3. 启动本地服务
$ pnpm dev
```

所有网站的收录文件在 `/src/config/websites/` 下存放。

## 感谢

本项目使用了 [Webstack.cc](http://webstack.cc/cn/index.html)（设计师网址导航） 的设计风格，简约清爽，在此感谢主题作者 [ViggoZ](https://github.com/ViggoZ) :heart:
