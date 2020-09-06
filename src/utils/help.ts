
var a = {
  a: 'lisi',
  b: 23,
  c: {
    a: '张三'
  }
};



/**
 * 深拷贝函数
 * @param {x} 要拷贝的对象
 */

interface Data {
  parent: any
  key: string | undefined
  data: any
}

function deepClone(x: any) {
  const root = {};

  // 初始化的数据
  const loopList: Data[] = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ];

  while (loopList.length) {
    const node = loopList.pop()!;
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    let res = parent;
    // 初始化赋值目标，key为undefined则拷贝到父元素 否则拷贝到子元素
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] !== 'object') {
          res[k] = data[k];
        } else {
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          });
        }
      }
    }
  }
  return root;
}




