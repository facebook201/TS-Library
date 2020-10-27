package main;

import (
	"fmt"
	"unsafe"
);


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
	// var name string = "zhangsan";
	// fmt.Println(name);

	// 多个变量
	// var (
  //   name1 string
  //   age int
  //   gender string
	// )

	// fmt.Println(name1);
	// fmt.Println(age);
	// fmt.Println(gender);

	// 指针变量 存放的是变量的内存地址
	// var ptr = &name;
	// fmt.Println("ptr: ", ptr);


	// new 函数是 Go里面的一个内置函数
	
	// pt := new(int);
	// fmt.Println("pt address: ", pt);
	// fmt.Println("pt address: ", *pt);
	


	// byte 和 rune

	var a byte = 65;
	var b uint8 = 66;
	
	// A B
	fmt.Printf("a 的值: %c \nb 的值: %c\n", a, b);
	
	// rune，占用4个字节，共32位比特位，所以它和 uint32 本质上也没有区别。
	// 它表示的是一个 Unicode字符
	// 单引号是定义一个字符 双引号是定义一个字符串
	var name rune = '中';

	fmt.Printf("a 占用 %d 个字节数\n", unsafe.Sizeof(name));

	// 字符串
	// string 的本质，其实是一个 byte数组
	// 也可以使用 `` 反引号 同时反引号可以不写换行符（因为没法写）来表示一个多行的字符串。
	var mystr01 string = `hello`;
	var mystr02 [5]byte = [5]byte{104, 101, 108, 108, 111}
	fmt.Printf("mystr01: %s\n", mystr01)
	fmt.Printf("mystr02: %s\n", mystr02)


	// 数组与切片
	var arr [10]int;
	arr[0] = 1;
	arr[1] = 2;
	arr[3] = 1233;

	fmt.Printf("arr的字节数：%d\n", unsafe.Sizeof(arr[0]));

	fmt.Printf("arr的地址：%p\n", &arr[0]);
	fmt.Printf("arr的地址：%p\n", &arr[1]);
}


// 1G = 1024 M
// 1M = 1024 K
// 1K = 1024 byte
// 1byte = 8B