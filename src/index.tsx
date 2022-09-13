import React, { useContext } from 'react'; 
import ReactDOM from 'react-dom';
// import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';



const TestContext = React.createContext({ light: '' });

function ChildText() {
  const value = useContext(TestContext);

  console.log(value);

  return (
    <div>
      { value.light }
    </div>
  )
}

function App() {
  return (
    <div>
      <ChildText />
    </div>
  );
}

ReactDOM.render(
  <TestContext.Provider value={{ light: 'black' }}>
    <App />
  </TestContext.Provider>,
  document.getElementById('app')
);
