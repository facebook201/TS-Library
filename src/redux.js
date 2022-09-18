import createStore from './components/Redux/createStore';
import applyMiddleware from './components/Redux/applyMiddleware';

function reducer(state, action) {
  switch(action.type) {
    case 'ADD':
      return { count: action.count++ };
    case 'SUB':
      return { count: action.count-- };
    default:
      return state;
  }
}

// compose 返回的 
// const chain = middlewares.map(middleware => middleware(middlewareAPI));
// dispatch = compose(...chain)(store.dispatch);

dispatch = log1(log2(log3(dispatch))); // 将 每个 action 依次

// 除了最右的函数外，其他函数都只接受一个参数(也就是上一个函数的返回值)。而最右侧的函数是可以接受任意参数的，因为它是作为整个compose返回函数的签名（它的参数是外部调用的时候传入的）

dispatch = log1(
  log2(
    // 这个函数是 log3 的next
    action => {
      console.log('will dispatch3', action)
      // 调用 middleware 链中下一个 middleware 的 dispatch。
      const returnValue = next(action)
      console.log('state after dispatch3', getState())
      // 一般会是 action 本身，除非
      // 后面的 middleware 修改了它。
      return returnValue;
    }
  )
);

dispatch = (next) => action;

dispatch = log1(
    action => {
    console.log('will dispatch2', action)
    // 调用 middleware 链中下一个 middleware 的 dispatch。
    const returnValue = next(action)
    console.log('state after dispatch2', getState())
    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue;
})

dispatch = (action) => {
    console.log('will dispatch', action)
    console.log(next);
    // 调用 middleware 链中下一个 middleware 的 dispatch。
    const returnValue = next(action)

    console.log('state after dispatch', getState())
    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
}

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)
    console.log(next);
    // 调用 middleware 链中下一个 middleware 的 dispatch。
    const returnValue = next(action)

    console.log('state after dispatch', getState())
    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
  }
}

function logger2({ getState }) {
  return next => {
    return action => {
      console.log('will dispatch2', action)
      // 调用 middleware 链中下一个 middleware 的 dispatch。
      const returnValue = next(action)
      console.log('state after dispatch2', getState())
      // 一般会是 action 本身，除非
      // 后面的 middleware 修改了它。
      return returnValue;
    }
  }
}

function logger3({ getState }) {
  return next => {
    // dispatch(action)
    return action => {
      console.log('will dispatch3', action)
      // 调用 middleware 链中下一个 middleware 的 dispatch。
      const returnValue = next(action)
      console.log('state after dispatch3', getState())
      // 一般会是 action 本身，除非
      // 后面的 middleware 修改了它。
      return returnValue;
    }
  }
}




const store = createStore(reducer, { count: 0 }, applyMiddleware(logger, logger2, logger3));

export {
  store,
};

