import React from 'react'; 
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import { store } from './redux';
import BigList from './BigList';
import { Button } from 'antd';

class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

const myTimer = new Timer();


const TimerView = observer(({ timer }) => (
  <Button onClick={() => timer.reset()}>Seconds Passed: {timer.secondsPassed}</Button>
));

setInterval(() => {
  myTimer.increase()
}, 1000);

function App() {
  return <TimerView timer={myTimer} />;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
