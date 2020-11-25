const queryString = require('querystring');

let str = 'name=zhangsan&address=xiamen';

const result = queryString.parse(str);

const reserveResult = queryString.stringify(result);

console.log(result);

console.info(reserveResult);

