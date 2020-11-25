/**
 * 观察者 定义的是一种通知机制 当对象事件发生改变了，会通知多个观察该对象的其他对象
 * 
 * 发布订阅模式有一个中间媒介来通知 观察者没有中间媒介
 * 买彩票有中间彩票售卖商户
 * 
 */


class Subject {
  state = 0
  _observers = [];

  attach(observer) {
    const isExist = this._observers.includes(observer);
    if (isExist) {
      console.log('已存在该对象！');
      return;
    }

    this._observers.push(observer);
  }

  // 移除订阅对象
  detach() {
    const observerIndex = this._observers.indexOf(observer);
    if (observerIndex === -1) {
      console.log('不存在该对象！');
    }
    this._observers.splice(observerIndex, 1);
  }

  // 遍历触发通知
  notify() {
    if (this._observers.length === 0) return;
 
    for (const observer of this._observers) {
      observer.update(this);
    }
  }

  someBusinessLogic() {
    this.state = Math.floor(Math.random() * (11));
    this.notify();
  }
}

// 具体的观察者

class ConcreteObserver {
  update(subject) {
    if (subject instanceof Subject) {
      // 操作更新
    }
  }
}







