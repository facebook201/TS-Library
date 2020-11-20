#include <stdio.h>

int main() {
  int arr[3] = {1, 2, 3};

  for (int i = 0; i < 3; i++) {
    printf("数组地址：%p\n", &arr[i]);
  }

  float f = 1.0;
  short c = *(short*)&f;
  printf("数字地址：%d\n", c);
  return 0;
}
