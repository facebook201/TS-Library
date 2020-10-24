import { Action } from './types/actions';
import { Reducer } from './types/reducers';
import { Store, ExtendState } from './types/store';
import { Dispatch } from 'react';

export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
  >(
    reducer: Reducer<S, A>,
    preloadedState?: any,
    enhancer?: any
  ): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext {
    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
      enhancer = preloadedState;
      preloadedState = undefined;
    }

    let currentReducer = reducer;
    let currentState = preloadedState as S;
    let currentListeners: (() => void)[] | null = [];
    let nextListeners = currentListeners;
    let isDispatching = false;

    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }

    function getState(): S {
      return currentState as S;
    }

    function subscribe(listener: () => void) {
      let isSubscribed = true;

      ensureCanMutateNextListeners();
      nextListeners.push(listener);

      return function unsubscribe() {
        if (!isSubscribed) {
          return
        }
        
        isSubscribed = false;
        ensureCanMutateNextListeners();
        const index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
        currentListeners = null;
      }
    }

    function dispatch(action: A) {
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

    const store = ({
      dispatch: dispatch as Dispatch<A>,
      subscribe,
      getState
    } as unknown) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
    return store;
}

