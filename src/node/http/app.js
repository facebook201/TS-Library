
const http = require('http');

const server = http.createServer((request, response) => {
  let data = '';

  request.on('data', (chunk) => {
    data += chunk;
  });


  request.on('end', () => {
    const {
      method,
      url,
      httpVersion
    } = request;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<head><meta charset="utf-8"/></head>');
    let responseData = `${method}，${url}，${httpVersion}`;
    response.end(responseData);
  });
});


server.listen(3000, () => {
  console.log('Node start!')
});
