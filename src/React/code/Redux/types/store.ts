import { Action, AnyAction } from "./actions";


export type ExtendState<State, Extension> = [Extension] extends [never]
  ? State
  : State & Extension;

declare const $CombinedState: unique symbol;

export type CombinedState<S> = {
  readonly [$CombinedState]?: undefined
} & S;


export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T, ...extraArgs: any[]): T
}

/**
 * 移除变更监听器
 */
export interface Unsubscribe {
  (): void
}

export interface Store<
  S = any,
  A extends Action = AnyAction,
  StateExt = never,
  Ext = {}
> {
  dispatch: Dispatch<A>

  /**
   * 读取 state 树 
   */
  getStore(): S

  /**
   * 添加变更监听器，会通过dispatch在任何时间被调用，
   * @param listener 每个dispatch 被调用的回调函数
   * @return 返回一个可以移除变更监听器的函数
   */
  subscribe(listener: () => void): Unsubscribe

  // [Symbol.observable](): Observable<S>
}

export type Observable<T> = {
  next?(value: T): void
};
