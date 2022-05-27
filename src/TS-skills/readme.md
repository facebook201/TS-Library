

#### type 和 interface 区别？



**type 创建类型别名, 可以表示基本类型，还可以用来表示对象类型、联合类型、元祖和交集。**

**接口 interface 是描述对象类型**



```tsx
interface Person {
    id: userId;
    name: userName;
    age: number;
    gender: string;
    isWebDev: boolean;
}

type userId = string | number; // 联合类型

// 对象类型
type Person = {
    id: userId; // 可以使用定义类型
    name: userName;
    age: number;
    gender: string;
    isWebDev: boolean;
};
```



* 都可以描述 `Object`和`Function`
* `interface` 和 `type` 都可以继承。



#### 区别

* type 可以定义基本类型 
* type 可以声明联合类型
* type 可以声明元祖类型
* 声明合并







