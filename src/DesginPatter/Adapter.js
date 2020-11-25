/**
 * 适配器主要是使得不兼容的对象能够相互合作
 * 例如iPhone的插头港版的 大陆就不能充电，需要一个转换接头来适配
 * 
 * 三个对象
 * 使用者（Client）比如大陆要使用的插头
 * 适配器（Adapter）适配器 把Adaptee适配成 Target 目标。
 * 被适配者（Adaptee）被适配器
 */


class Target {
  request() {
    return 'Target: The Default target behavior！';
  }
}

class Adaptee {
  specificRequest() {
    return '要适配的对象';
  }
}

class Adapter extends Target {
  _adaptee = null;

  constructor(adaptee) {
    super();
    this._adaptee = adaptee;
  }

  request() {
    const result = this.adaptee.specificRequest();
    // 处理result 然后返回这个结果出去 在Adapter 里面来转换
  }
}

function clientCode(target) {
  console.log(target.request());
}

const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);

