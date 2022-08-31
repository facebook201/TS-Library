import React, { forwardRef, useRef } from 'react';


const ForWard = forwardRef((props, myRef) => {
  return (
    <div>
      <input type="text" defaultValue="ref 转发到组件内部的 input 节点上" ref={myRef} />
    </div>
  );
})

function ParentWard(props: any) {
  const input = useRef<any>();

  const handleClick = () => {
    input.current.focus();
  };

  return (
    <>
      <button onClick={handleClick}>click to get value</button>

      <ForWard ref={input} />
    </>
  );
}


export default ParentWard;
