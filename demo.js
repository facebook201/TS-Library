
function doSth(t, cb) {
  return function() {
    let i = setInterval(() => {
      if (--t === 0) {
        clearInterval(i);
        cb();
      }
    }, 1000);
  }
}

function logSth(cb) {
  console.log('我终于有一千万了！！！');
  cb();
}

function logSth2() {
  console.log('我有两千万了！！！');
}

let fn = doSth(4, logSth.bind(null, logSth2));

fn();


