
// redux-thunk
function createThunkMiddleware(extraArgument) {
  const middleware = ({ dispatch, getState }) =>
    next =>
    action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
  return middleware;
}

const thunk = createThunkMiddleware();

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function applyMiddleware(...middlewares) {
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

// 记录日志
function logger({ getState }) {
  return next => action => {
    console.log('action: ', action);
    return returnValue = next(action);
    console.log('state after dispatch', getState());
    return returnValue;
  }
}

function logger2({ getState }) {
  return next => action => {
    console.log('action2: ', action);
    return returnValue = next(action);
    console.log('state2 after dispatch', getState());
    return returnValue;
  }
}

applyMiddleware(logger, logger2);
