import React from 'react'; 
import ReactDOM from 'react-dom';

import { Observable } from 'rxjs';

const stream$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next([1, 2, 3]);
  }, 500);

  setTimeout(() => {
    subscriber.next({ a: 1000 });
  }, 1000);

  setTimeout(() => {
    subscriber.next('end');
  }, 3000);

  setTimeout(() => {
    subscriber.complete();
  }, 4000);
});

// 启动流
const subscription = stream$.subscribe({
  complete: () => console.log('done'),
  next: v => console.log(v),
  error: () => console.log('error')
});


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
