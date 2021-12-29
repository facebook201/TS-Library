
class Observable {
  constructor(behavior) {
    this.behavior = behavior;
  }

  subscribe(observer) {
    this.behavior(observer);
  }
}

// 动态注入 subscribe 的 cb 参数
// obs$ 的定义，最重要的是定义了被观察者的行为
const obs$ = new Observable(observer => {
  observer.next('1');
  observer.complete();
});

// observer 的定义，定义了在所观察的事件发生时候的行为
const observer = {
  next: (v) => console.log('Next', v),
  error: (e) => console.log('error', e),
  complete: () => console.log('Done'),
};

// subscribe 的调用，连接了 Observable 和 observer，如果没有这个连接，什么都不会发生
obs$.subscribe(observer);


