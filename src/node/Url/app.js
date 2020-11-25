const url = require('url');

// const urlString = 'http://www.test.com?orderId=12345';
// const urlObject = url.parse(urlString);


const urlObject = {
  host: 'www.test.com',
  port: 80,
  protocol: 'http',
  search: '?orderId=12345',
  query: 'order=12345',
  path: '/'
};

let realAddress = url.format(urlObject);

console.log(realAddress);


