import compose from './compose';
import { Middleware, MiddlewareAPI } from './types/middleware';
import { AnyAction } from './types/actions';
import { StoreEnhancer, StoreCreator, Dispatch } from './types/store';
import { Reducer } from './types/reducers';

export default function applyMiddleware(
  ...middlewares: Middleware[]
): StoreEnhancer<any> {

  return (createStore: StoreCreator) => <S, A extends AnyAction>(
    reducer: Reducer<S, A>,
    ...args: any[]
  ) => {
    const store = createStore(reducer, ...args);

    let dispatch: Dispatch = () => {
      throw new Error('Dispatching')
    }

    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };

    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  }
}



