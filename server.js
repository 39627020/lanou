"use strict";
const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const compression = require('compression');

// File sizes after gzip:
//
// 467.06 KB  dist\dashboard.79f3b96e6f185894b160.js
// 417.43 KB  dist\users.79f3b96e6f185894b160.js
// 282.45 KB  dist\UIElement-iconfont.79f3b96e6f185894b160.js
// 281.06 KB  dist\papers.79f3b96e6f185894b160.js
// 279.82 KB  dist\testItems.79f3b96e6f185894b160.js
// 271.06 KB  dist\exams.79f3b96e6f185894b160.js
// 255.33 KB  dist\UIElement-editor.79f3b96e6f185894b160.js
// 252.44 KB  dist\UIElement-layer.79f3b96e6f185894b160.js
// 252.24 KB  dist\UIElement-dataTable.79f3b96e6f185894b160.js
// 252.02 KB  dist\UIElement-search.79f3b96e6f185894b160.js
// 251.99 KB  dist\UIElement-dropOption.79f3b96e6f185894b160.js
// 132.29 KB  dist\register.79f3b96e6f185894b160.js
// 129.14 KB  dist\chart-lineChart.79f3b96e6f185894b160.js
// 128.65 KB  dist\chart-areaChart.79f3b96e6f185894b160.js
// 128.42 KB  dist\chart-barChart.79f3b96e6f185894b160.js
// 121.77 KB  dist\index.js
// 102.23 KB  dist\iconfont.js
// 71.82 KB   dist\login.79f3b96e6f185894b160.js
// 37.27 KB   dist\users-detail.79f3b96e6f185894b160.js
// 6.02 KB    dist\index.css
// 816 B      dist\common.js
// 540 B      dist\iconfont.css
// 539 B      dist\error.79f3b96e6f185894b160.js
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));

// 配置静态文件服务中间件
// const serverUrl = 'http://119.29.88.16:8080'//server地址
// app.use('/api/v1/*', function (req, res) {
//   let url = serverUrl + req.originalUrl;
//   req.pipe(request(url)).pipe(res);
// });

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(80, function () {
  console.log('server is running at port 9000');
});

