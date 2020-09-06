import * as React from 'react'; 
import * as ReactDOM from 'react-dom';

import Slider from './components/slider';
import ConcurrentList from './React/ConcurrentModCon/list.js';

const App = () => {
  return (
    <div className="app">
      <section>
        <h1>Slider 轮播图</h1>
        <Slider />
      </section>

      <section>
        <div style={{ width: '50%' }}>
          <h1>
            非并发模式
          </h1>
          <ConcurrentList />
        </div>
        <div style={{ width: '50%' }}>
          <h1>
            并发模式
          </h1>
        </div>
      </section>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);






