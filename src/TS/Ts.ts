
interface Person1 {
  name: never
  age: number
};

type a = keyof Person1;

interface Person {
  name: string;
  age: number;
  cook: (msg: string) => Promise<string>;
  Log: (msg: string) => number;
}

type union = keyof Person;

/** 
 * 实现下面的效果
 * type T0 = Translate<Person>;
 * 等价于
 * type T0 = {
 *   // 其它属性被丢弃
 *   cook: (arg: string) => string; // return 类型被调整为跟 arg 保持一致
 *   Log: (arg: string) => string; // return 类型被调整为跟 arg 保持一致
 * }
 * 最后的产出
 * type Translate<T> = ?
 */


type FunctionProperty<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];



type r = FunctionProperty<Person>;
type re = Pick<Person, r>;

// 过滤非函数属性

type inferParams<K> = {
  [P in keyof K]: K[P] extends (arg: infer U) => any ? (arg: U) => U : never
};

type final = inferParams<re>;

// type Translate<T> = 
