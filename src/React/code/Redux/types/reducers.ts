import { Action, AnyAction } from './actions';

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>
};

export type StateFromReducersMapObject<M> = M extends ReducersMapObject<any, any>
  ? { [P in keyof M]: M[P] extends Reducer<infer S, any> ? S : never }
  : never
