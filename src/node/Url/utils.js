const util = require('util');

const obj = {
  name: '张三',
  address: '南昌'
};

const str = util.inspect(obj);

console.log(str);
