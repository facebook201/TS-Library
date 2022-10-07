
// @flow

import React, { useState, useEffect } from 'react';
import { get } from 'axios';
import { VariableSizeList as VList } from 'react-window';

function Student({ student = {} }) {
  return (
    <div>
      {student.name}
    </div>
  );
}

export default function BigList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    get('http://jsonplaceholder.typicode.com/comments').then(res => {
      setList(res.data);
    });
  };

  const renderItem = ({ index }) => <Student student={list[index]} />;

  return (
    <div>
      <VList
        width={300}
        height={300}
        itemCount={1000}
        itemSize={() => 1000}>
        {renderItem}
      </VList>
    </div>
  );
}