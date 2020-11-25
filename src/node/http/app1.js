const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Node start');
});

server.listen(3000, 'localhost');

server.on('listening', () => {
  console.log('server is listening!');
});

server.on('connection', () => {
  console.log('server is connected!')
});

server.on('close', () => {
  console.log('server is closing!');
});

console.log('Node server started on port 3000！');
