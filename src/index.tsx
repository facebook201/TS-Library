import React from 'react'; 
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

// const ThemeContext = React.createContext("light");


// export default function App() {
//   const [theme, setTheme] = React.useState({ theme: 'light' });

//   const toggleTheme = () => {
//     const themeVal = theme.theme === 'light' ? 'dark' : 'light';
//     setTheme({ theme: themeVal });
//   };

//   const notify = () => toast('Here is your toast.');

//   return (
//     <div>
//       <h1 onClick={toggleTheme}>
//         I ❤️ U
//       </h1>
//       <ThemeContext.Provider value={theme.theme}>
//         <AppBody />
//       </ThemeContext.Provider>

//       <section>
//         <h1 onClick={notify}> New Notify</h1>
//         <Toaster />
//       </section>
//     </div>
//   );
// }

// function AppBody() {
//   const theme = React.useContext(ThemeContext);

//   return (
//     <div>
//       {theme}
//     </div>
//   );
// }


function App() {
  return (
    <div>
      App
      <nav>
        <Link to="/invoices">Invoices</Link>
        <Link to="/expenses">Expenses</Link>
      </nav>
    </div>
  );
}

function Invoices() {
  return <div>Invoices</div>
}

function Expenses() {
  return <div>Expenses</div>
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
