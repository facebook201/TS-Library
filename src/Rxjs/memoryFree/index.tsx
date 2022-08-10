import React, { useEffect, useState } from 'react';



function MemoryFree() {
  const [free, setFree] = useState<number>(0);

  useEffect(() => {

  }, []);

  const getFetch = async () => {
    const result = await fetch();
  };

  return <div>Free: {free} GB</div>
}

export default MemoryFree;
