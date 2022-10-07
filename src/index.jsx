import React, { useState } from 'react'; 
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { store } from './redux';
import BigList from './BigList';


function App() {
  return <BigList />;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
