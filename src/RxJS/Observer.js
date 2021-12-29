
class Observable {
  constructor(behavior) {
    this.behavior = behavior;
  }

  subscribe(observer) {
    this.behavior(observer);
  }
}

// 动态注入 subscribe 的 cb 参数
const obs$ = new Observable(observer => {
  observer.next('1');
  observer.complete();
});

const observer = {
  next: (v) => console.log('Next', v),
  error: (e) => console.log('error', e),
  complete: () => console.log('Done'),
};

obs$.subscribe(observer);


