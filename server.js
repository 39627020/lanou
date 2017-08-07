"use strict";
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');

app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(80, function () {
  console.log('server is running at port 80');
});

