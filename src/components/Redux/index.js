
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
 */





/**
 * 1、reducer 管理整个业务里的数据 包括处理数据，存储数据
 * 2、reducer 返回的必须是一个函数，这个函数里接收两个参数 一个是 state，另一个是 action
 * 
 *  react 里边的 store ,接收到 action 之后，会自动把之前的数据和 action 转发给 reducer
 *  会执行这两行代码
 *  isDispatching = true;
 *  currentState = currentReducer(currentState, action);
 */
