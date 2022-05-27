/**
 * 中介者模式
 * 能让你减少对象之间混乱无序的依赖关系。 该模式会限制对象之间的直接交互， 
 * 迫使它们通过一个中介者对象进行合作。
 * 
 * 调用特殊的中介者对象， 通过中介者对象重定向调用行为， 以间接的方式进行合作。
 * 最终， 组件仅依赖于一个中介者类， 无需与多个其他组件相耦合。
 * 
 * 中介者模式跟观察者模式有点像，不过中介者模式是同级别的对象交互。
 */


class Mediator {
  _component = null;
  _component2 = null;

  constructor(c) {
    this._component = c;
    this._component.setMediator(this);
  }

  notify(sender, event) {
    if (event === 'A') {
      this._component2.doC();
    }

    if (event === 'D') {
      this._component.doB();
      this._component2.doC();
    }
  } 
}

// 组件接口
class Component {
  mediator;

  constructor(mediator = null) {
    this.mediator = mediator;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }
}

// 具体组件
class BaseComponent extends Component {
  doA() {
    this.mediator.notify(this, 'A');
  }

  doB() {
    this.mediator.notify(this, 'B')
  }
}

// 具体组件2
class BaseComponent2 extends Component {
  doC() {
    this.mediator.notify(this, 'C');
  }

  doD() {
    this.mediator.notify(this, 'D');
  }
}


const c1 = new BaseComponent();
const c2 = new BaseComponent2();

new ConcreteMediator(c1);
new ConcreteMediator(c2);

c1.doA();
c2.doD();


