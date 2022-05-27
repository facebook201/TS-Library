(function(modules) {
  var installedModules = {};

  function __webpack_require__(moduleID) {
    // 检查是否有缓存
    if (installedModules[moduleID]) {
      return installedModules[moduleID].exports
    }

    var module = installedModules[moduleID] = {
      i: moduleID,
      l: false,
      exports: {}
    };

    module[moduleID].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }

  __webpack_require__.m = modules;

  __webpack_require__.c = installedModules;

  // 定义
  __webpack_require__.d = function(exports, name, getter) {
    if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
  };

  __webpack_require__.r = function(exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  

})({
  "./commonjs/index.js":
  (function(module, exports, __webpack_require__) {
    
    var lib = __webpack_require__("./commonjs/lib.js");
    console.log(lib);
  }),
  "./commonjs/lib.js":
  (function(module, exports) {
    exports.hello = 'hello';

    module.exports = function minus(a, b) {
      return a - b;
    }
    exports.add = function add() {
      return a + b;
    };
  })
});
