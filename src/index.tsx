import React from 'react'; 
import ReactDOM from 'react-dom';
import CountTime from './Rxjs/CountTime';

import 'antd/dist/antd.css';

const ThemeContext = React.createContext("light");

export default function App() {
  const [theme, setTheme] = React.useState({ theme: 'light' });

  const toggleTheme = () => {
    const themeVal = theme.theme === 'light' ? 'dark' : 'light';
    setTheme({ theme: themeVal });
  };

  return (
    <div>
      <h1 onClick={toggleTheme}>
        I ❤️ U 
      </h1>
      <CountTime />
      <ThemeContext.Provider value={theme.theme}>
        <AppBody />
      </ThemeContext.Provider>
    </div>
  );
}
function AppBody() {
  const theme = React.useContext(ThemeContext);

  return (
    <div>
      {theme}
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
