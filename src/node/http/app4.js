const http = require('http');

let responseData = '';

const options = {
  host: 'localhost',
  port: '3000'
};

const request = http.request(options);

request.on('response');

// http.request({
//   hostname: 'localhost',
//   method: 'GET',
//   port: 3000
// }, (response) => {
//   console.log(response);
//   response.on('data', (chunk) => {
//     // 响应主体
//     responseData += chunk;
//   });

//   response.on('end',() => {
//     console.log(responseData)
//   });
// }).end();
