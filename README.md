# lanou

基于redux的考试项目

[![Build Status](https://travis-ci.org/MengStar/lanou.svg?branch=develop)](https://travis-ci.org/MengStar/lanou)

[后端项目地址](https://github.com/MengStar/BMS-BE)

## 演示地址
[在线demo](http://47.93.48.40/home)，最高权限账户 admin admin，可自己注册。

## 安装

```nodemon
npm install
```
## 特性

- 基于[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md),规范Redux应用的开发。`dva`封装了Redux众多特性，相关特性不再重复。
- 使用[ant-design](https://ant.design/docs/react/introduce-cn)ui库。

## 运行

- 开发环境

- `npm run dev` 说明：会启动热加载插件，访问[http://localhost:8000/home](http://localhost:8000/home)。

- 生产环境

- `npm run build `说明：会生成dist文件夹，按需加载js。压缩过程会很慢，耐心等待。
- `node server.js`说明：使用node启动服务器，默认端口:80。单页应用，所有请求被转发到`index.html`。使用cros跨域，未配置反向代理。然后访问[http://localhost/home](http://localhost/home)。

## 注意

- 服务器地址在`utils/config.js`文件中的``const serverUrl = 'http://47.93.48.40:8080` ``设置，默认是我部署在阿里云上的服务器。
- 若不可用，请自己安装服务器，[后端项目地址](https://github.com/MengStar/BMS-BE)，然后修改`serverUrl`即可。
