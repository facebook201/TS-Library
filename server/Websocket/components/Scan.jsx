import React, { useState, useCallback, useEffect } from "react";
import { Button, Dropdown, message, Modal, Menu, Spin } from "antd";
import PropTypes from "prop-types";
import WSScanner from "../Scan.js";
import { getTsBuildInfoEmitOutputFilePath } from "typescript";

let scanDevice = null; // 扫描仪设备
let baseList = [];
const prefixCls = "scan-file";
const base64H = "data:image/jpg;base64,";

export default function Scan({
  onOk,
  okLoading,
  onSuccess,
  onRemove,
  showRemove,
  baseUrl,
  param,
  api,
  OCR,
  closeHandle,
  onSetHasFile,
  scanUrl, // 扫描仪动画
}) {
  // 扫描数据
  const [imageList, setImageList] = useState([]);
  // 0 扫描仪未连接 1已连接 2正在扫描
  const [scanType, setScanType] = useState(0);
  // 是否显示信号图片
  const [signalVisible, setSignalVisible] = useState(true);
  // 已识别发票数量
  const [scanNumber, setScanNumber] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(true); //控制上传，确定按钮显示
  const [uploadWay, setUploadWay] = useState("single"); // 控制上传方式显示
  const [modalShow, setModalShow] = useState(false); // 预览模态框状态
  const [photoList, setPhotoList] = useState([]); // 图片数据
  const [fileIdList, setFileIdList] = useState([]); // 上传文件id列表
  const [mergeName, setMergeName] = useState("合并"); // 合并名称
  const [viewList, setViewList] = useState([]); // 预览资源
  const [pdfLoading, setPdfLoading] = useState(false); // 因为合成pdf时间比较长，过程中要防止用户点击确定
  const [firstStart, setStart] = useState(false); //是否扫描过
  const { renderOcrTable } = OCR || {};

  useEffect(() => {
    resetData();
    scanConnect();
  }, []);

  // 继续扫描
  const continueScan = () => {
    setSignalVisible(true);
    scanStartScan();
  };

  // 根据状态执行对应扫描相关操作
  const firedScan = useCallback((val) => {
    switch (val) {
      case 0:
        scanConnect();
        break;
      case 1:
        scanStartScan();
        break;
      default:
    }
  }, []);

  // 连接扫描仪
  const scanConnect = () => {
    if (scanDevice) {
      try {
        scanDevice.destory();
      } catch (e) {
        console.log("error", e);
      }
    }
    // WSScanner 初始化
    scanDevice = new WSScanner(baseUrl, {
      scannerError: () => {
        setScanType(0);
      },
      receiveImage: (data) => {
        scanParse(data);
      },
      scanEnd: () => {
        scanDevice.destory();
        setScanType(0);
        setSignalVisible(false);
      },
    });

    try {
      scanDevice.connect().then(
        () => {
          setScanType(1);
        },
        (e) => {
          console.log("error:", e);
          setScanType(0);
          message.error("扫描仪连接错误");
        }
      );
    } catch (e) {
      console.log("error:", e);
      setScanType(0);
      message.error("扫描仪连接错误");
    }
  };

  // 开始扫描
  const scanStartScan = useCallback(() => {
    scanDevice.connect.then(
      () => {
        scanDevice.startScan();
        setScanType(2);
        setStart(true);
      },
      (error) => {
        setScanType(0);
        message.error(`扫描错误：${error}`);
      }
    );
  }, []);

  // 扫描数据解析
  const scanParse = (data) => {
    setScanNumber((_scanNumber) => _scanNumber + 1);
    toFile(data);
  };
}

Scan.prototype = {
  onOk: PropTypes.func,
  onSuccess: PropTypes.func,
  onRemove: PropTypes.func,
  onSetHasFile: PropTypes.func,
};

Scan.defaultProps = {
  baseUrl: "ws://127.0.0.1:11345/Laputa",
  onSetHasFile: (fileLength) => {
    // 设置是否包含已上传识别内容
    onSetHasFile(fileLength);
  },
};
