import React, {useState, useMemo, memo } from 'react';

function List(props: any) {
  let now = performance.now();
  console.log(performance.now() - now)
  while (performance.now() - now < 3) {
    
  }
  return <li className="list-item">{props.children}</li>
}

const ListItem = memo(function SlowList({ text }) {
  let items = [];
  for (let i = 0; i < 80; ++i) {
    items.push(
      <List key={i}>
        Result #[i] for {text}
      </List>
    )
  }

  return (
    <p>
      <ul className="list">{items}</ul>
    </p>
  );
});


function SlowList() {
  const [text, setText] = useState('hello');

  function handleChange(e: any) {
    setText(e.target.value);
  }

  return (
    <div className="concurrent-list">
      <label htmlFor="text">
        Type into the input
        <input type="text" onChange={handleChange} />
      </label>
      <hr/>

      <List text={text} />
    </div>
  );
}

export default SlowList;
