/**
 * 组合多个reducer
 * @param {多个 reducer 的对象形式} reducers 
 */

function combineReducers(reducers) {
  const reduceKeys = Object.keys(reducers);
  const finalReducers = {};

  for (let i = 0; i < reduceKeys.length; i++) {
    const key = reduceKeys[i];
    // 过滤所有非 function 的 reducer
    if (typeof reduceKeys[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  const finalReducerKeys = Object.keys(finalReducers);

  // 第二步 将所有的 reducer 合并在一起
  let hasChange = false;
  const nextState = {};

  finalReducerKeys.forEach(key => {
    // 第一步 先获取 目前的 state[key]
    const previousValue = state[key];
    const nextValue = reducers[key](previousValue, action);

    nextState[key] = nextValue;
    hasChange = hasChange || previousValue !== nextValue;
  });
  // 如果整个循环都没有被更新过，返回state
  return hasChange ? nextState : state;
}
