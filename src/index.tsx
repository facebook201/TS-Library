import * as React from 'react'; 
import * as ReactDOM from 'react-dom';
import Slider from './components/slider';

const { useState } = React;

function Example() {
  const [count, setCount] = useState(0);
  
  function handleAlertClick() {
    setTimeout(() => {
      alert('you clicked on：' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You Clicked {count} times </p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}

const App = () => {
  return (
    <div className="app">
      <section>
        <h1>Slider 轮播图</h1>
        <Slider />
      </section>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);



// Fiber React.createElement()

// JSX 编译为 createElement 方法

