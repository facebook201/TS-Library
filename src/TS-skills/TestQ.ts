
// /**
//  * * TS 试题
//  */

// type User = {
//   id: number;
//   kind: string;
// };

// function makeCustomer<T extends User>(u: T): T {
//   return {
//     ...u, // * 
//     id: u.id,
//     kind: 'customer'
//   };
// }


// // * 2 希望参数 a he b 类型一致，函数重载
// function f(a: string | number, b: string | number) {
//   if (typeof a === 'string') {
//     return a + ': ' + b;
//   } else {
//     return (a as number) + (b as number);
//   }
// }


// // * 3、 定义一个 SetOptional 工具类型，把给定的 keys 对应的属性变成可选

// type Foo = {
//   a: number;
//   b?: string;
//   c: boolean;
// };



// type Simplify<T> = {
//   [P in keyof T]: T[P]
// }

// type SetOptional<T, K extends keyof T> = 
// Simplify<Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>>

// // 测试用例
// type SomeOptional = SetOptional<Foo, 'a' | 'b'>;


// /**
//  * 定义一个 ConditionalPick 工具类型 根据指定的条件 生成新的类型
//  */

// interface Example {
//   a: string;
//   b: string | number;
//   c: () => void;
//   d: {};
// }

// type ConditionalPick<T, K> = {
//   [P in keyof T as (T[P] extends K ? P : never)]: T[P];
// };

// type a112 = ConditionalPick<Example, string>;

// /**
//  * * 定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是 x，将作为新函数类型的第一个参数
//  */

// type Fn = (a: number, b: string) => number

// type AppendArgument<F, A> = F extends (...args: infer Args) => infer R ? (x: A, ...args: Args) => R : never; 

// type FinalFn = AppendArgument<Fn, boolean>;
// // (x: boolean, a: number, b: string) => number

// type UnpackedArray<T> = T extends infer U ? U : T;

// type a1 = UnpackedArray<string>;

// type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;



// /**
//  * 定义一个 EmptyObject 类型， 使得该类型只允许对空对象赋值
//  */
// type EmptyObject = {
//   [K in PropertyKey]: never
// };

// type SomeType =  {
//   prop: string
// }

// // 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
// /**
//  * *限定参数的属性
//  */
// type Exclusive<T, T1 extends T> = {
//   [K in keyof T1]: K extends keyof T ? T1[K]: never;
// };

// function takeSomeTypeOnly<T extends SomeType>(x: Exclusive<SomeType, T>) {
//   return x;
// }

// // 测试用例：
// const x = { prop: 'a' };
// takeSomeTypeOnly(x) // 可以正常调用

// const y = { prop: 'a', addditionalProp: 'x' };
// // takeSomeTypeOnly(y) // 将出现编译错误




// /**
//  * * 8、定义 NonEmptyArray 工具类型，用于确保数据非空数组。
//  * * 
//  */

//  type NonEmptyArray<T> = [T, ...T[]];
//  type NonEmptyArray1<T> = T[] & { 0: T };


// //  const a: NonEmptyArray<string> = []; // 将出现编译错误
//  const b: NonEmptyArray<string> = ['Hello TS']; // 非空数据，正常使用

// /**
//  * * 9、定义一个 JoinStrArray 工具类型，用于根据指定的 Separator 分隔符，对字符串数组类型进行拼接。
//  */
// type JoinStrArray<
//     Arr extends string[],
//     Separator extends string
//   > = Arr extends [infer A, ...infer B]
//   ? `${A extends string ? A : ''}${B extends [string, ...string[]]
//       ? `${Separator}${JoinStrArray<B, Separator>}`
//       : ''}`
//   : '';

//  // 测试用例
//  type Names = ["Sem", "Lolo", "Kaquko"]
//  type NamesComma = JoinStrArray<Names, ","> // "Sem,Lolo,Kaquko"
//  type NamesSpace = JoinStrArray<Names, " "> // "Sem Lolo Kaquko"
//  type NamesStars = JoinStrArray<Names, "⭐️"> // "Sem⭐️Lolo⭐️Kaquko"

// /**
//  * 10、实现一个 Trim 工具类型，用于对字符串字面量类型进行去空格处理
//  */

// // type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
// // type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;

// // type Trim<V extends string> = TrimLeft<TrimRight<V>>;

// // const a = Trim<' hello '>;


// /**
//  * * 11、实现一个 IsEqual 工具类型，用于比较两个类型是否相等。
//  */

// type IsEqual<A, B> = [A] extends [B] ? [B] extends [A] ? true : false : false;

// // 测试用例
// type E0 = IsEqual<1, 2>; // false
// type E1 = IsEqual<{ a: 1 }, { a: 1 }> // true
// type E2 = IsEqual<[1], []>; // false




















