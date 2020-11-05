// package main
// import (
// 	"fmt"
// );

// func main() {
// 	var a [3]int;
// 	// ... 表示数组长度是根据初始化值来计算的
// 	// q := [...]int{1, 2, 3, 4, 5};

// 	months := [...]string{
// 		1: "January",
// 		2: "February",
// 		3: "March",
// 		4: "April",
// 		5: "May",
// 		6: "June",
// 		7: "July",
// 		12: "December",
// 	};
	
// 	Q2 := months[4:7];
	
// 	fmt.Println(a[0]);
// 	fmt.Println("长度: %d\n", months[2]);
	
// 	// 容量指的是切片起始位置到数组末位置可以容纳的元素数量
// 	fmt.Println("切片长度: %d\n, 容量 %d\n", len(Q2), cap(Q2));

// 	// 定义切片 make 构造
// 	// var numList []int;
// 		// make([]Type, size, cap);
// 		// 关于 len 和 cap 的概念，可能不好理解 ，这里举个例子：
// 		// 公司名，相当于字面量，也就是变量名。
// 		// 公司里的所有工位，相当于已分配到的内存空间
// 		// 公司里的员工，相当于元素。
// 		// cap 代表你这个公司最多可以容纳多少员工
// 		// len 代表你这个公司当前有多少个员工


// 		// var numbers4 = [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
// 		// myslice := numbers4[4:6:8];

// 		// // 5 6 7 8 
// 		// fmt.Printf("myslice为 %d, 其长度为: %d\n, 容量：%d\n", myslice, len(myslice), cap(myslice));

// 		// myslice = myslice[:cap(myslice)];
// 		// fmt.Printf("myslice的第四个元素为: %d\n", myslice[3]);

// 		// 声明数组
// 		// var arr [3]int;
// 		// var arr [3]int = [3]int{1, 2, 3};
// 		// arr := [3]int{1, 2, 3};
// 		// 切片

		
// 		ints := []int{1};
// 		ints = append(ints, 3, 2);

// 		fmt.Println(len(ints));
// 		fmt.Println(cap(ints));
// }

package main

import (
    "fmt"
)

func main() {
  var numbers4 = [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
  myslice := numbers4[4:6:10]
  fmt.Printf("myslice为 %d, 其长度为: %d\n, %d\n", myslice, len(myslice), cap(myslice))

  myslice = myslice[:cap(myslice)]
  fmt.Printf("myslice的第四个元素为: %d", myslice[3])
}


