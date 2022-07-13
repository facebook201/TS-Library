


/**
 * * TS 里面的 keyof 操作符的用法
 * * 获取某个对象里面的属性值 keyof 返回对象的所有key的联合类型
 */

// 这一种存在 key 存在隐式类型 any
function getProperty(obj: object, k: string) {
  return obj[key];
}

function getPropertyNew<T extends object,
  K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

getPropertyNew({
  name: 'zhangsan',
  age: 12,
}, 'name');

/**
 * * 映射类型 Mapped
 */
type Person = {
  name: string;
  age: number;
  height: number;
  weight: number;
};



type RequireType<T> = {
  [P in keyof T]: T[P];
};







type GetFirstParamType<T> = T extends (...args: infer R) => any ? R[0] : never;


type b = GetFirstParamType<(args: [1, 'sad']) => {}>;


