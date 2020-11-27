
const http = require('http');
const { generateAcceptValue, parseMessage, constructReply } = require('./util');

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('我是来测试Webscoket协议的！！！');
});

server.on('upgrade', (req, socket) => {

  socket.on('data', (buffer) => {
    const message = parseMessage(buffer);
    console.log(message)
    if (message) {
      socket.write(constructReply({ message }));
    } else if (message === null) {
      console.log('!!');
    }
  });

  if (req.headers['upgrade'] !== 'websocket') {
    socket.end('HTTP1.1 400 Bad Request!!!');
    return;
  }
  // 读取客户端提供的 Sec-WebScoket-key
  const secWsKey = req.headers['sec-websocket-key'];
  // 使用sha算法生成key
  const hash = generateAcceptValue(secWsKey);
  // 设置HTTP响应头
  const responseHeaders = [
    'HTTP/1.1 101 Web Socket Protocol Handshake',
    'Upgrade: WebSocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${hash}`
  ];

  // 返回握手请求的响应信息
  socket.write(responseHeaders.join("\r\n") + "\r\n\r\n");
});

server.listen(8000, () => {
  console.log('Server running at http://localhost:8000');
});
