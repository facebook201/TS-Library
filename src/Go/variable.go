package main;

import "fmt";


// 数据类型
// 1、布尔型 			bool
// 2、数字类型		int、float32、float64
// 3、字符串			string	
// 4、派生类型
			// * 指针（Pointer）
			// * 数组类型
			// * 结构化类型（struct）
			// * Channel 类型
			// * 函数类型
			// * 切片类型
			// * 接口类型（interface）
			// * Map类型


// Go 的变量

func main() {
	// 一行声明 一个变量
	//  Go 中双引号和单引号是不一样的，这里要一定要使用双引号，表示字符串，而在单引号表示rune 类型的字符
	var name string = "zhangsan";
	fmt.Println(name);

	// 多个变量
	var (
    name1 string
    age int
    gender string
	)

	fmt.Println(name1);
	fmt.Println(age);
	fmt.Println(gender);
}

