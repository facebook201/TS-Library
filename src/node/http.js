
const fs = require('fs');
// 我们的业务层
fs.open('./test.txt', 'w', (err, fd) => {
  // DOSomething
});

// Node API lib/fs.js
// https://tc39.es/ecma262/
async function open(path, flags, mode) {
  //卧槽这个 0o666 是什么
  mode = modeNum(mode, 0o666);
  path = getPathFormURL(path);

  validatePath(path);
  validateUint32(mode, 'mode');
  return new FileHandle(
    await binding.openFileHandle(pathModule.toNamespacedPath(path),
      stringToFlags(flags),
      mode,
      kUsePromises
    )
  );
}

// src/node.file.cc

// 当我们调用 fs.open 时，Node.js 通过 process.binding 调用 C/C++ 层面的 Open 函数，
// 然后通过它调用 Libuv 中的具体方法 uv_fs_open，最后执行的结果通过回调的方式传回，完成流程。


