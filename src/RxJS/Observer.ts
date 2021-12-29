interface Observer<T> {
  next: (value: T) => void;
  error: (value: any) => void;
  complete: () => void;
}

type UnaryFunction<T, R> = (source: T) => R;

type OperatorFunction<T, R> = UnaryFunction<Observable<T>, Observable<R>>;

type TeardownLogic = Subscription | Unsubscribable | void | (() => void);

// 取消订阅 取消 observer
interface Unsubscribable {
  unsubscribe: () => void;
}

function pipeFormArray<T, R>(
  fns: Array<UnaryFunction<T, R>>
): UnaryFunction<T, R> {
  if (fns.length === 0) {
    return (x) => x as any as R;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return (input: T): R => {
    return fns.reduce((prev: any, fn: UnaryFunction<T, R>) => fn(prev), input);
  };
}


class Subscription implements Unsubscribable {
  private _teardowns: Exclude<TeardownLogic, void>[] = [];

  unsubscribe(): void {
    this._teardowns.forEach((teardown) => {
      if (typeof teardown === 'function') {
        teardown();
      } else {
        teardown.unsubscribe();
      }
    });
  }

  add(teardown: TeardownLogic): void {
    if (teardown) {
      this._teardowns.push(teardown);
    }
  }
}

// 
class Subscriber<T> extends Subscription implements Observer<T> {
  private isStopped = false;

  // 构造函数访问限定符
  constructor(private observer: Partial<Observer<T>>) {
    super();
  }

  next(value: T) {
    if (this.observer.next && !this.isStopped) {
      this.observer.next(value);
    }
  }

  error(value: any) {
    this.isStopped = true;
    if (this.observer.error) {
      this.observer.error(value);
    }
  }

  complete() {
    this.isStopped = true;
    if (this.observer.complete) {
      this.observer.complete();
    }
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}


// Observable 观察者类的实现
class Observable<T> {
  constructor(private _subscribe: (observer: Observer<T>) => TeardownLogic) {
    /**
     * * private 参数属性通过给构造函数参数前面添加一个访问限定符来声明。 
     * * 使用 private限定一个参数属性会声明并初始化一个私有成员
     * * 相当于 this._subscribe = _subscribe;
     */
  }

  subscribe(observer: Partial<Observer<T>>): Subscription {
    const subscriber = new Subscriber(observer);
    subscriber.add(this._subscribe(subscriber));

    return subscriber;
  }

  pipe(...operations: OperatorFunction<any, any>[]): Observable<any> {
    return pipeFormArray(operations)(this);
  }
}

