import { Button } from 'antd';
import React, { useState } from 'react'; 
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { store } from './redux';

const add = (number, dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch({ type: 'ADD', count: number })
    }, 200);
  };
};

const sub = (number) => ({
  type: 'SUB',
  count: number,
});

function addCount() {
  console.log('111');
  return { type: 'ADD', count: 12 };
}

// return action(dispatch, getState, extraArgument);

function addCountAsyn() {
  return dispatch => {
    // dispatch 函数参数 真正派发操作的是在 200ms 以后
    setTimeout(() => {
      dispatch(addCount());
    }, 200);
  };
}

function Count(props) {
  const { dispatch, count } = props;
  
  const ADD = () => {
    dispatch(add(12));
  }

  const SUB = () => {
    dispatch(sub(count - 1));
  }

  return (
    <div>
      <Button onClick={ADD}>++</Button>
      {count}
      <Button onClick={SUB}>--</Button>
    </div>
  );
}

const mapStateProps = (state) => {
  const { count } = state;
  return {
    count,
  }
};

const WrappedCount = connect(mapStateProps)(Count);

function App() {
  return (
    <div>
      App
      <WrappedCount />
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
