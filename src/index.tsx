import React, { useState } from 'react'; 
import ReactDOM from 'react-dom';

let i = 0;

function AddCount() {
  const [list, setList] = useState<number[]>([]);

  function add() {
    setList(list.concat(i++));
  };
  return (
    <div>
      <button onClick={add}>Add</button>
      {
        list.map(v => <button onClick={add} key={v}>{v}</button>)
      }
    </div>
  );
}

// function AddCount() {
//   const [list, setList] = useState<React.ReactElement[]>([]);

//   const add = () => {
//     setList(
//       list.concat(
//         <button
//           key={i}
//           onClick={add}>
//           {i++}
//         </button>
//       )
//     )
//   };

//   return (
//     <div>
//       <button onClick={add}>
//         Add
//       </button>
//       { list.map(v => v) }
//     </div>
//   );
// }

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
