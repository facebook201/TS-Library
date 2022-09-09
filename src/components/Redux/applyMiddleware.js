
/**
 * middleware 是中间价
 * 在 dispatch action 之后，到达reducer 之前 做的事情
 * 比如：打印，报错，跟异步API通信等
 */


import compose from './compose';

export default function applyMiddleware(...middlewares) {
  return (createState) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);

    let dispatch;

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };

    const chain = middlewares.map(middleware => middleware(middlewareAPI));

    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  }
}
