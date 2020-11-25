/**
 * 适配器主要是给不匹配的对象创建一个特殊的对象，它能够转换对象接口
 * 使得能与其他对象进行交互。
 *
 * 试用场景 
 * 当你希望使用某个类， 但是其接口与其他代码不兼容时， 可以使用适配器类。
 * 比如 港版的充电头
 * 比如 jquery的 Each方法
 */


const arr = [
  { name: '张三', address: '西湖区', id: '987hjsa3' },
  { name: '李四', address: '余杭区', id: 'r87hjsa3' },
  { name: '王五', address: '上海区', id: '987hj3a3' },
  { name: '赵六', address: '东京区', id: '98shjsa3' },
];

var obj = { name: '赵六', address: '东京区', id: '98shjsa3' };

$each(obj, function(i, v, obj) {
  console.log(i, v, obj);
});

function $each(obj, fn) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      fn.call(i, obj[i], obj);
    }
  } else {
    let keys = Object.keys(obj);
    if (keys.length > 0) {
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        fn.call(key, obj[key], obj);
      }
    }
  }
};
