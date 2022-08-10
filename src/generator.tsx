
// /**
//  * generator 
//  * * 按需一个接一个返回 yield 多个值，与 iterable 完美配合 可以很轻松地创建数据流
//  * 
//  * 特殊符号 function* 这就是一个 generator function 
//  * generator 函数与常规函数行为不同，此函数调用时，不会运气代码。而是返回一个被称为
//  * generator Object的特殊对象 来管理执行流程。
//  */
// function* generatorSequence() {
//   yield 1;
//   yield 2;
//   return 3;  
// }

//  "generator function" 创建了一个 "generator object"
// let generator = generatorSequence(); // [object Generator]

// let one = generator.next(); one { value: 1, done: false }

// for (const value of generator) {
//   console.log(value); // 1, 2
// }
