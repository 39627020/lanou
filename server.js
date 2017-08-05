"use strict";
const express = require('express');
const path = require('path');
const app = express();
const request = require('request');

app.use(express.static(path.join(__dirname, 'dist')));
// 配置静态文件服务中间件
let serverUrl = 'http://119.29.88.16:8888';//server地址
app.use('/api/v1/*', function (req, res) {
  let url = serverUrl + req.originalUrl;
  req.pipe(request(url)).pipe(res);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(9000, function () {
  console.log('server is running at port 9000');
});

