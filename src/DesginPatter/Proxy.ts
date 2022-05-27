
/**
 * * 代理模式
 */


/**
 * * 这个接口 包含了 Proxy 和 实际对象的通用操作
 */
interface Subject {
  request(): void;
}


/** 
 * * The RealSubject contains some core business logic
 * * 这个对象包含了 核心的业务逻辑
 */

class RealSubject implements Subject {
  public request(): void {
    console.log('处理请求...');
  }
}

class ProxySY implements Subject {
  private realSubject: RealSubject;

  // * Proxy 维护对 RealSubject 类的对象的引用。 它可以是延迟加载的，也可以由客户端传递给代理。
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  /**
   * * 大部分的代理模式都是用于延迟加载，缓存，控制权限，日志等。
   */
  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    // * 检查逻辑
    return true;
  }

  private logAccess(): void {
    console.log('Logging the time of request');
  }
}


function clientCode(subject: Subject): void {
  subject.request();
}

// * 真实对象去自己调用
const realSubject = new RealSubject();
clientCode(realSubject);

// * 代理对象去调用
const proxy = new ProxySY(realSubject);
clientCode(proxy);
