import React, { useState, useEffect } from 'react';
import './index.css';

/**
 * 自定义一个基于时间间隔重复调用的callback的hook
 * @param {} callback
 * @param {} interval
 */

function useInterval(callback: (time: number) => void, interval: number) {
  useEffect(() => {
    const start = new Date().getTime();
    const timer = setInterval(() => {
      const time = new Date().getTime() - start;
      callback(time);
    }, interval);
    return () => clearInterval(timer);
  }, []);
}

function useSlider(N: number, speed = 3000) {
  const [slider, setSlider] = useState(0);
  useInterval(diff => {
    console.log((diff / speed) % N);
    setSlider((_: any) => Math.floor(diff / speed) % N);
  }, 300);
  return slider;
}

const imgs = [
  'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2134829550,3120755721&fm=26&gp=0.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598859154962&di=f0079887064170f4af2808694b1ba6d3&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201710%2F15%2F20171015094202_BHwPK.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598859247982&di=da44af7e6ade50cd34468b2430ce16c8&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201206%2F15%2F211112e99heh4o9eo7nokm.jpg'
];

export default () => {
  const slider = useSlider(imgs.length);

  return (
    <div className="scroller">
      <div className="inner" style={{
        width: `${imgs.length * 100}%`,
        transform: `translateX(-${100 * slider / imgs.length}%)`
      }}>
        {
          imgs.map(src =>
            <img key={src} style={{ width: `${100 / imgs.length}%` }} alt="" src={src} />
          )
        }
      </div>
    </div>
  );
};
