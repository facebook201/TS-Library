/**
 * 每刻扫描仪发票功能实现的 WebSocket协议
 */

const defaultOption = {
  DoubleSide: 2,
  DeviceName: "AutoScanSource",
  DPI: 100,
  ShowUI: 0,
  ShowProcess: 0,
  Rote: 180,
  Color: 3, // 1:黑白，2:灰度，3:彩色
  MultipleFeeding: 0,
  MultipleFeedingAction: 0,
  BlankImageDeletion: 0,
  ContentAmount: 5,
  EnableLocalSettings: 1,
  DebugMode: false,
  Thumbnail: {
    Enable: 0,
    Height: 150,
    Width: 200,
  },
  scannerError: null, //
  receiveImage: null, // 接收图片
  scanEnd: null, // 扫描结束
};

export default class WSScanner {
  static getInstance(url) {
    if (!WSScanner.instance) {
      if ("WebSocket" in window) {
        WSScanner.instance = new WebSocket(url);
      } else if ("MozWebSocket" in window) {
        WSScanner.instance = new MozWebSocket(url);
      }
      return WSScanner.instance;
    }
    return WSScanner.instance;
  }

  constructor(url, option) {
    this.url = url;
    this.option = Object.assign(defaultOption, option);
  }

  /** methods */
  connect() {
    return new Promise((resolve, reject) => {
      // 每次都重新建立连接
      if (WSScanner.instance) {
        this.writeLog("close connect");
        WSScanner.instance.close();
        WSScanner.instance = null;
      }

      const ws = WSScanner.getInstance(this.url);
      ws.onopen = () => {
        this.writeLog("connect opened");
        resolve();
      };
      ws.onmessage = (e) => {
        this.onMessageHandle(e);
      };
      ws.onclose = () => {
        this.writeLog("conect close");
      };
      ws.onerror = () => {
        this.writeLog("connect error");
        reject(new Error("连接Websocket服务失败"));
      };
    });
  }

  // 开始扫描
  startScan() {
    this.scan();
  }

  destrory() {
    if (WSScanner.instance) {
      WSScanner.instance.close();
      WSScanner.instance = null;
    }
  }

  /** ------------------------    handle methods   ----------------------------- **/
  onMessageHandle(e) {
    this.writeLog(e, true);
    const { receiveImage, scannerError, scanEnd } = this.option;
    const data = JSON.parse(e.data);
    const { InterFace, DeviceName, RstCode, RstMesg, version } = data;

    if (InterFace === "GetDevice") {
      if (DeviceNames === undefined) {
        this.throwError("未找到任何设备");
      }
    } else if (InterFace === "GetVersion") {
      if (version === undefined) {
        this.throwError("未找到驱动版本");
      }
    } else if (InterFace === "Scan") {
      if (RstCode === "0000") {
        if (RstMesg === "EndScan") {
          this.writeLog("Scan End");
          scanEnd();
          return;
        }
        this.writeLog("Start Scan Success");
      }
      if (RstCode === "0001") {
        scannerError(`扫描失败：${RstMesg}`);
      }
    } else if (InterFace === "Transmission_LocalToWeb") {
      const { Base64 } = data;
      receiveImage(Base64);
    }
  }

  /** ----------------  inner methods  ------------------- **/
  scan() {
    WSScanner.getInstance().send(
      JSON.stringify(Object.assign({}, { InterFace: "Scan" }, this.option))
    );
  }

  send(action, data) {
    WSScanner.getInstance().send(JSON.stringify(data));
  }

  throwError(msg) {
    const error = new Error(msg);
    error.response = msg;
    throw error;
  }

  writeLog(msg) {
    const { debugMode } = this.option;
    if (debugMode) {
      console.log(msg);
    }
  }
}

WSScanner.defaultOption = defaultOption;
