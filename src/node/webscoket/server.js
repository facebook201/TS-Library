// 服务端

const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHeader(200, { 'Content-Type': 'text/plain; charset=utf8;' });
  response.end('我是测试WebScoket协议！！！');
});

server.listen(3000);

console.log('启动服务了！！！');
