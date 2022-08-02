
// Observable 简单实现
class Observable {
  constructor(behavior) {
    this.behavior = behavior;
  }

  subscribe(observer) {
    this.behavior(observer);
  }
} 

// todo Observer 的行为逻辑
const obs$ = new Observable(cb => {
  cb.next();
})

// * Observer 接收到之后的行为
const observer = {
  next: v => console.log('next methods call'),
  error: e => console.log('OOPS', e),
  complete: () => console.log('Done'),
};

// * 连接 是通过 subscribe 桥接 启动
obs$.subscribe(observer);

// rxjs的简单案例
import { Observable } from 'rxjs';

// 流的创建 stream$ 就是一共 observable 本质上就是一共随着时间不断产生数据的一个集合 也就是流
const stream$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next([1, 2, 3]);
  }, 500);
});

// 如何消费流 产生的数据 observer
// observer 是定义了如何处理流产生的数据 是流的处理方法。
const observer = {
  complete: () => console.log('Done'),
  next: v => console.log(v),
  error: () => console.log('error')
};

// 启动流 订阅，暂存了一个启动后的流 
const subscription = stream$.subscribe(observer);

setTimeout(() => {
  // 停止流
  subscription.unsubscribe();
}, 1000);

/**
 * 简单理解了这三个名词observable, observer, subscription后，从数据的角度来思考：
 * observable定义了要生成一个什么样的数据，其subscribe方法，接收一个observer（定义了接收到数据如何处理），
 * 并开始产生数据，该方法的返回值，subscription, 存储了这个已经开启的流，
 * 具有unscbscribe方法，可以将这个流停止。整理成下面这个公式：
 */

/**
 * Subscription = Observable.subscribe(observer);
 * observable: 随着时间产生的数据集合，可以理解为流，其subscribe方法可以启动该流 observer: 
 * 决定如何处理数据 subscription: 存储已经启动过的流，其unsubscribe方法可以停止该流
 */






















/**
 * * 迭代器
 */

function makeIterator(array) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < array.length ?
        { value: array[nextIndex++], done: false } :
        { done: true };
    }
  };
}

let it = makeIterator(['a', 'b']);

console.log(it.next().value); // 'a'
console.log(it.next().value); // 'b'
console.log(it.next().done); // true

// 所谓迭代器模式就是你可以用 .next() API 来「依次」访问下一项。
// （next只是一个函数名而已，可以随意约定）如果有下一项，你就会得到 
// {value: 下一项的值, done: false}如果没有下一项，你就会得到 {value: null, done: true}





