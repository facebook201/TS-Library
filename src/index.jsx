import { Button } from 'antd';
import React, { useState } from 'react'; 
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { store } from './redux';

const add = (number) => ({
  type: 'ADD',
  count: number,
});

const sub = (number) => ({
  type: 'SUB',
  count: number,
});

function Count(props) {
  const { dispatch, count } = props;
  
  const ADD = () => {
    debugger;
    dispatch(add(count + 1));
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
