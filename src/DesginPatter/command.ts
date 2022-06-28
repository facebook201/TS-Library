
/**
 * * 命令模式（Command）
 * * 将请求封装为一个对象，使你可以用不同的请求对客户进行参数化，对请求排队或记录请求日志，以及支持可撤销的操作。
 * 
 * * 1、点菜 将点菜和做菜分开分离
 * * 2、浏览器请求 不仅有排队，取消，重试。
 * 
 * * 一个请求指的是来自客户端的一个操作，比如菜单按钮点击。重点在点击后并不直接实现，而是将请求封装为一个对象
 */
interface Command {
  execute(): void;
}

class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log();
  }
}

class Receiver {
  public doSomething(a: string): void {

  }

  public doSomethingElse(b: string): void {

  }
}

class ComplexCommand implements Command {
  private receiver: Receiver;

  private a: string;

  private b: string;

  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  public execute(): void {
    console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}
/**
 * The Invoker is associated with one or several commands. It sends a request to
 * the command.
 */
 class Invoker {
  private onStart: Command | undefined;

  private onFinish: Command | undefined;

  /**
   * Initialize commands.
   */
  public setOnStart(command: Command): void {
      this.onStart = command;
  }

  public setOnFinish(command: Command): void {
      this.onFinish = command;
  }

  /**
   * The Invoker does not depend on concrete command or receiver classes. The
   * Invoker passes a request to a receiver indirectly, by executing a
   * command.
   */
  public doSomethingImportant(): void {
      console.log('Invoker: Does anybody want something done before I begin?');
      if (this.isCommand(this.onStart)) {
          this.onStart.execute();
      }

      console.log('Invoker: ...doing something really important...');

      console.log('Invoker: Does anybody want something done after I finish?');
      if (this.isCommand(this.onFinish)) {
          this.onFinish.execute();
      }
  }

  private isCommand(object: any): object is Command {
      return object.execute !== undefined;
  }
}

/**
* The client code can parameterize an invoker with any commands.
*/
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Say Hi!'));

const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

invoker.doSomethingImportant();
