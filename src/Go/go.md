

### 切片扩容

```go
ints := []int{1, 2};
ints = append(ints, 3, 4, 5); // cap
```

预估规则：如果 oldCap * 2 < cap ，newCap = cap。

否则 oldLen < 1024, newCap = oldCap * 2; oldLen >= 1024，newCap = oldCap * 1.25



**myslice := numbers4[4:6:10]**

截取4到6的数组元素，容量是10 - 4 = 6。



