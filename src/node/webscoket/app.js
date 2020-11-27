
/**
 * 实现一个webscoket协议
 * @param { url } 服务器响应的url
 * @param { prorocols } 可选 一个协议字符串或者一个包含协议字符串数组
 * new WebSocket(url,[ prorocols ]);
 */

const btn = document.getElementById('btn');
const sendMsgContainer = document.querySelector("#sendMessage");

const ws = new WebSocket("ws://localhost:8000");


// 服务端监听连接
ws.addEventListener('open', (evt) => {
  console.log('连接成功')
});

// 监听服务端发送的消息
ws.addEventListener('message', (evt) => {
  console.log(evt);
});

const myArray = new ArrayBuffer(4);
const buffer = new Uint8Array(myArray);

buffer[0] = 32;
// 越界的值会直接切断
buffer[1] = 549; 


function send() {
  const message = sendMsgContainer.value;
  if (ws.readyState !== WebSocket.OPEN) {
    console.log('还未建立请求，不能发送消息！');
    return;
  }

  // const blob = new Blob([message], { type: 'text/plain' });
  if (message) ws.send(message);
}
