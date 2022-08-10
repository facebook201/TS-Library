import React, { useState } from 'react';
import { Button } from 'antd';
import { interval, take } from 'rxjs';


const prefixCls = 'syo-count-time';

let id: any = null;

export default function CountTime() {
  const [enable, setEnable] = useState(true);
  const [disabledFlag, setDisabledFlag] = useState(false);
  const [lable, setLabel] = useState('发送');

  let remainTime = 60;

  const handleCount = () => {
    if (enable) {
      setEnable(false);
      setDisabledFlag(true);
      remainTime = 60;
      id = setInterval(coolDown, 1000);
    }
  }

  function coolDown() {
    remainTime--;
    setLabel(`请${remainTime}秒后再重新获取`);
    if (remainTime === 0) {
      clearInterval(id);
      setEnable(true);
      setLabel('发送');
      setDisabledFlag(false);
    }
  }


  return (
    <div className={prefixCls}>
      <Button type='primary' onClick={handleCount} disabled={disabledFlag}>
        {lable}
      </Button>
    </div>
  );
}

/**
 * Rxjs 的 倒计时
 */

// export function CountTimeByRxjs() {

//   const handleCount = () => {

//   };

//   const coolDown = interval(1000).pipe(map(_ => 60 - _), take(60));

//   return (
//     <div className={prefixCls}>
//       <Button type='primary' onClick={handleCount} disabled={disabledFlag}>
//         {lable}
//       </Button>
//     </div>
//   );
// }














