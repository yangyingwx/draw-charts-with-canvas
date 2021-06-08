// 编码实现目录浏览服务, 有多种编码方式
//1.
// const express = require('express')
// const app = express()

// app.use(express.static('../draw-charts-with-canvas'))
// const port = 8900

// module.exports = app.listen(port, function (err) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('Listening at http://localhost:' + port + '\n')
// })

//2.
// var connect = require('connect');
// var http = require('http');
// var st = require('st');
// var port = 8000;

// var mount = st({
//   path: '../draw-charts-with-canvas',
//   cache: true
// });
// var app = connect().use(mount);
// http.createServer(app).listen(port);

// console.log('server start done.');
// console.log('port is ' + port);

//3.
// var http = require('http');
// var st = require('st');
// var port = 8000;

// var mount = st({
//   path: '../draw-charts-with-canvas',
//   cache: true
// });
// http.createServer(function (req, res) {
//   if (mount(req, res)) return;
// }).listen(port);

// console.log('server start done.');
// console.log('port is ' + port);

// 4.
var connect = require('connect');
var st = require('st');
var port = 8000;

var mount = st({
  path: '../draw-charts-with-canvas',
  cache: true
});
var app = connect().use(mount);
app.listen(port);

console.log('server start done.');
console.log('port is ' + port);
