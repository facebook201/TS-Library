

// import { Action } from './types/actions'
import ActionTypes from './utils/actionTypes';
import $$observable from './utils/symbol-observable';

// 创建一个 store Tree
export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(
      reducer,
      preloadedState,
    );
  }

  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];
  let nextListeners = currentListeners;

  let isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      // slice 返回的对象 如果向两个数组任一中添加了新元素，则另一个不会受到影响
      nextListeners = currentListeners.slice()
    }
  }


  function getState() {
    if (isDispatching) {
      throw new Error(`
        reducer 正在执行！！！
      `);
    }

    return currentState;
  }

  function subscribe(listener) {
    let isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();

      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);

      currentListeners = null;
    }
  }


  function dispatch(action) {
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }

    return action;
  }


  function observable() {
    const outerSubscribe = subscribe;

    return {
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          Error();
        }

        function observeState() {
          const observerAsObserver = observer;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }
        
        observeState();
        const unsubscribe = outerSubscribe(observeState);

        return { unsubscribe };
      },

      [$$observable]() {
        return this;
      }
    }
  }

  dispatch({ type: ActionTypes.INIT });

  const store = {
    dispatch,
    subscribe,
    getState,
    [$$observable]: observable
  };

  return store;
}
