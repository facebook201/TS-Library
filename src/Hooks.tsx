
/**
 * * state 是存放在被 render的组件外面，这个 state 不会和其他组件共享。同时 这个组件后续render 你能够通过特定的作用域方式 访问到这个 state。
 */
const state: any = [];
const setters: any = [];
let firstRun = true;
let cursor = 0;

// * 首次渲染 调用 useState，在 setter 数组中加一个 setter 函数（对应的数组 index 关联），然后将 state加入对应的 state 数组里。

function createSetter(cursor: number) {
  return function setterWithCursor(newVal: any) {
    state[cursor] = newVal;
  }
}

export function useState<StateValue>(initVal: StateValue) {
  if (firstRun) {
    state.push(initVal);
    setters.push(createSetter(cursor));
    firstRun = false;
  }

  const setter = setters[cursor];
  const value = state[cursor];

  cursor++;
  return [value, setter];
}

