
#include <stdio.h>

int main() {
  int arr[3] = {1, 2, 3};
  
  for (int i = 0; i < 3; i++) {
    printf("数组地址：%p\n", &arr[i]);
  }
  printf("整型int的字节大小：%lo\n", sizeof(arr[0]));
  return 0;
}
