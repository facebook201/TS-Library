import * as React from 'react'; 
import * as ReactDOM from 'react-dom';
// import Slider from './components/slider';

const pathToRegexp = require("path-to-regexp");
let re: any = pathToRegexp('/foo/:bar');
console.log(re);

const App = () => {
  return (
    <div className="app">
      <section>
        <h1>Slider 轮播图</h1>
        {/* <Slider /> */}
      </section>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
