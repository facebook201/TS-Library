const crypto = require('crypto');
const { off } = require('process');
const MAGIC_KEY = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

function generateAcceptValue(secWsKey) {
  return crypto
    .createHash('sha1')
    .update(secWsKey + MAGIC_KEY, 'utf8')
    .digest("base64");
}

// 消息解析
function parseMessage(buffer) {
  const firstByte = buffer.readUInt8(0);
  // [FIN, RSV, RSV, RSV, OPCODE, OPCODE, OPCODE, OPCODE]
  // 右移7位取⾸位，1位，表示是否是最后⼀帧数据
  const isFinalFrame = Boolean((firstByte >>> 7) & 0x01);
  // 取出操作码，低四位
  /**
  * %x0：表示⼀个延续帧。当 Opcode 为 0 时，表示本次数据传输采⽤了数据分⽚，当前收到的数
  据帧为其中⼀个数据分⽚；
  * %x1：表示这是⼀个⽂本帧（text frame）；
  * %x2：表示这是⼀个⼆进制帧（binary frame）；
  * %x3-7：保留的操作代码，⽤于后续定义的⾮控制帧；
  * %x8：表示连接断开；
  * %x9：表示这是⼀个⼼跳请求（ping）；
  * %xA：表示这是⼀个⼼跳响应（pong）；
  * %xB-F：保留的操作代码，⽤于后续定义的控制帧。
  */
  const opcode = firstByte & 0x0f;
  if (opcode === 0x08) {
    // 连接关闭
    return;
  }
  if (opcode ===  0x02) {
    // 二进制
  }
  if (opcode === 0x01) {
    // 文本
    let offset = 1;
    const secondByte = buffer.readUInt8(offset);

    // MASK: 位 表示是否用了掩码，发送给服务端必须要 返回不需要掩码
    const useMask = Boolean((secondByte >>> 7) & 0x01);
    const payloadLen = secondByte & 0x7f;
    offset += 1;

    let MASK = {};
    // 0-125 之间 后面的四个字节（32位）被直接识别为掩码
    if (payloadLen <= 0x7d) {
      MASK = buffer.slice(offset, 4 + offset);
      offset += 4;
    } else if (payloadLen === 0x7e) {
      MASK = buffer.slice(offset + 2, offset + 6);
      offset += 6;
    } else {
      MASK = buffer.slice(offset + 8, offset + 12);
      offset += 12;
    }

    const newBuffer = [];
    const dataBuffer = buffer.slice(offset);

    for (let i = 0, j = 0; i < dataBuffer.length; i++, j = i % 4) {
      const nextBuf = dataBuffer[i];
      newBuffer.push(nextBuf ^ MASK[j]);
    }
    return Buffer.from(newBuffer).toString();
  }
  return '';
}

function constructReply(data) {
  const json = JSON.stringify(data);
  const jsonByteLength = Buffer.byteLength(json);
  
  // ⽬前只⽀持⼩于65535字节的负载
  const lengthByteCount = jsonByteLength < 126 ? 0 : 2;
  const payloadLength = lengthByteCount === 0 ? jsonByteLength : 126;
  const buffer = Buffer.alloc(2 + lengthByteCount + jsonByteLength);

  // 设置数据帧⾸字节，设置opcode为1，表示⽂本帧
  buffer.writeUInt8(0b10000001, 0);
  buffer.writeUInt8(payloadLength, 1);

  // 如果payloadLength为126，则后⾯两个字节（16位）内容应该，
  // 被识别成⼀个16位的⼆进制数表示数据内容⼤⼩

  let payloadOffset = 2;

  if (lengthByteCount > 0) {
    buffer.writeUInt16BE(jsonByteLength, 2);
    payloadOffset += lengthByteCount;
  }

  // 把JSON数据写⼊到Buffer缓冲区中
  buffer.write(json, payloadOffset);
  return buffer;
}

module.exports = {
  generateAcceptValue,
  parseMessage,
  constructReply
};
