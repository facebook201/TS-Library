import React, { useEffect, useState } from 'react'; 
import ReactDOM from 'react-dom';




function AppNM() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    window.addEventListener('mousemove', () => {
      console.log(counter);
    })
  }, []);

  function handleClick() {
    setCounter(counter + 1);
  }

  return (
    <div onClick={handleClick}>
      click to add Counter
    </div>
  );
}


let i = 0;

function AddCount() {
  const [list, setList] = useState<React.ReactElement[]>([]);

  function add() {
    setList(list.concat(<button onClick={add} key={i}>{i++}</button>));
  };
  return (
    <div>
      <button onClick={add}>Add</button>
      {
        list.map(v => v)
      }
    </div>
  );
}



const App = () => {
  return (
    <div className="app">
      <section>
        <AddCount />
      </section>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
