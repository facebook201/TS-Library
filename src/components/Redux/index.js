
import createStore from './createStore';
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose'
import __DO_NOT_USE__ActionTypes from './utils/actionTypes'



export {
  CombinedState,
  PreloadedState,
  Dispatch,
  Unsubscribe,
  Observable,
  Observer,
  Store,
  StoreCreator,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  ExtendState
} from './types/store'
// reducers
export {
  Reducer,
  ReducerFromReducersMapObject,
  ReducersMapObject,
  StateFromReducersMapObject,
  ActionFromReducer,
  ActionFromReducersMapObject
} from './types/reducers'
// action creators
export { ActionCreator, ActionCreatorsMapObject } from './types/actions'
// middleware
export { MiddlewareAPI, Middleware } from './types/middleware'
// actions
export { Action, AnyAction } from './types/actions'

export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  __DO_NOT_USE__ActionTypes
}



/**
 * Redux 工作流程
 * 
 * Action 被 dispatch(action) 触发, store 里的 Reducers 执行，处理数据 返回一个新的数据给store。
 * 当新的数据改变之后， React Component 就会渲染。
 * 
 * A）、 action 是声明式的数据几个欧 提供事件的所有要素 不提供逻辑
 * 
 * B）、reducer 是一个匹配函数 action发送式全局的。所有的 reducer 都可以捕捉到与自己相关与否。
 *      命中就修改 store 状态。
 * 
 * C）、还有 一个 react-redux 提供 Provider 跟 connect 
 */


/**
 * 如果应用复杂之后 可以把 reducer 拆分成多少个独立的函数， combineReducers 把多个不同的 reducer 函数
 * 合并成一个最终的 reducer 函数。
 * 
 * rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
  // 这将返回如下的 state 对象
  {
    potato: {
    // ... potatoes, 和一些其他由 potatoReducer 管理的 state 对象 ...
    },
    tomato: {
    // ... tomatoes, 和一些其他由 tomatoReducer 管理的 state 对象，比如说 sauce 属性 ...
    }
  }
*/




//  connect是真正的重点，它是一个科里化函数，意思是先接受两个参数（数据绑定mapStateToProps和事件绑定
//  mapDispatchToProps, 再接受一个参数（将要绑定的组件本身）
 
//  mapStateToProps：构建好Redux系统的时候，它会被自动初始化，但是你的React组件并不知道它的存在，
//  因此你需要分拣出你需要的Redux状态，所以你需要绑定一个函数，它的参数是state，简单返回你关心的几个值。
 
//  mapDispatchToProps：声明好的action作为回调，也可以被注入到组件里，就是通过这个函数，它的参数是dispatch，
//  通过redux的辅助方法bindActionCreator绑定所有action以及参数的dispatch，
//  就可以作为属性在组件里面作为函数简单使用了，不需要手动dispatch。
//  这个mapDispatchToProps是可选的，如果不传这个参数redux会简单把dispatch作为属性注入给组件，
//  可以手动当做store.dispatch使用。这也是为什么要科里化的原因。


/**
 * 1、reducer 管理整个业务里的数据 包括处理数据，存储数据
 * 2、reducer 返回的必须是一个函数，这个函数里接收两个参数 一个是 state，另一个是 action
 * 
 *  react 里边的 store ,接收到 action 之后，会自动把之前的数据和 action 转发给 reducer
 *  会执行这两行代码
 *  isDispatching = true;
 *  currentState = currentReducer(currentState, action);
 */

<<<<<<< HEAD

/**
 * Redux 可以完成保存状态 传递状态，更新状态。但是层数太多的话，每一层都需要传递。所以 Proider 可以全局注入。
 * 
 * 
 */
=======
/**
 * todo Provider connect 
 * Redux 可以只通过 dispatch、来更新状态。但是如果层级太多 每一级都需要手动传 很麻烦。
 * 所以 Provider 可以将 store 全局注入组件树。
 */

/**
 * todo Middleware中间件
 * * 业务开发中 需要打印 action 信息，需要在dispatch 或 reducer 有异步请求能力。
 * * 需要一个可以 自由增减的 插件机制。Koa 中间价机制 可以使得前端应用中便捷地实现如日志打印、异步请求等功能。
 */







>>>>>>> b4c16bce7a693c045ec8d35be1f1dbfb9223ae3d
