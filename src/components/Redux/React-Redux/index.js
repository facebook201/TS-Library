import React from 'react';
import { Provider, connect } from 'react-redux';

/**
 * 使用
 */



function App() {
  return (
    <Provider store={{ name: 'lisi' }}>
      <App1 />
    </Provider>
  );
}



function ChildComponent(props) {

  

}

const ChildComponent = connect()(ChildComponent);
