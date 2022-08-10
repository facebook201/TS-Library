import React from 'react'; 
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function Invoices() {
  return <div>Invoices</div>
}

function Expenses() {
  return <div>Expenses</div>
}

function App() {
  return (
    <div>
      App
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    {/* 侧边栏导航 */}
    <Route path="/" component={App} />
    <Switch>
      <Route path="/invoices" component={Invoices} />
      <Route path="/expenses" component={Invoices} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
);
