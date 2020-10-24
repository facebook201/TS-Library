import { AnyAction } from './types/actions';
import { Reducer, ReducersMapObject, StateFromReducersMapObject } from './types/reducers';
import { CombinedState } from './types/store';

// export default function combineReducers<S> (
//   reducers: ReducersMapObject<S, any>
// ): Reducer<CombinedState<S>>

export default function combineReducers(reducers: ReducersMapObject) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers: ReducersMapObject = {};

  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  const finalReducersKeys = Object.keys(finalReducers);
  let unexpectedKeyCache: { [key: string]: true };

  return function Combination(
    state: StateFromReducersMapObject<typeof reducers> = {},
    action: AnyAction
  ) {
    let hasChanged = false;
    const nextState: StateFromReducersMapObject<typeof reducers> = {};
    for (let i = 0; i < finalReducersKeys.length; i++) {
      const key = finalReducersKeys[i];
      const reducer = finalReducers[key];

      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducersKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  }
}

