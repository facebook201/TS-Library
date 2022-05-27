
/**
 * * 装饰器模式（Decorator）
 * * 扩展对象的模式 动态的给一个对象添加一些额外的职责
 * 
 * * 1、相片 + 相框
 * * 2、封装对象来扩展
 */


/**
 * * 
 */
 class Component {
  // 具有点击事件
  public onClick = () => {}
}

class Decorator extends Component {
  private _component

  constructor(component: Component) {
    super();
    this._component = component
  }

  public onClick = () => {
    this._component.onClick();
  }
}

const component = new Component();
// 一个普通的点击
component.onClick()

const wrapperComponent = new Decorator(component)
// 一个具有打点功能的点击
wrapperComponent.onClick()


