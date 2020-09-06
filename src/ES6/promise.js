
// const fs = require('fs');

// let uid = 1;

// function readFile(path, prevData) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, 'utf8', function(err, data) {
//       if (err) {
//         reject(err);
//       }

//       const resData = JSON.parse(data);
//       resolve({
//         prevData,
//         resData
//       });
//     })
//   });
// }

// readFile('./data/user.json'
//   .then((res) => {
//     const { resData } = res;
//     const userInfo = resData.filter(item => item.id === uid)[0];

//     readFile()
//   });

