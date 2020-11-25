/**
 * 命令模式 Command
 * 有时候向某些对象发送请求，但是不知道接收的是谁，也不知道被请求的操作是什么，
 * 所以需要消除两者的耦合。比如客人点餐，他和厨师是相互不认识的。
 * 
 */


// 命令对象
interface Command {
  execute(): void
}

// 简单命令对象
class SimpleCommand implements Command {
  _payload = '';

  constructor(payload: string) {
    this._payload = payload;
  }

  execute(): void {
    // 执行
  }
}

// 复杂命令对象
class ComplexCommand implements Command {
  _receiver: Receiver;
  _a: string = '';
  _b: string = '';

  constructor(receiver: Receiver, a: string, b: string) {
    this._receiver = receiver;
    this._a = a;
    this._b = b;
  }

  execute(): void {
    this._receiver.doSomething(this.a);
    this._receiver.doSomethingElse(this.b);
  }
}


// 接受者接口
class Receiver {
  doSomething(a: string): void {

  }
  doSomethingElse(b: string): void {

  }
}

const setCommand = function(button: any, command: Command) {
  button.onClick = function() {
    command.execute();
  };
};



