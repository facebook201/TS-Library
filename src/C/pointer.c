#include<stdio.h>

void swap(int *pa, int *pb);

void minmax(int a[], int len, int *min, int *max);

int main() {

  int a[] = {1, 2, 3, 4, 5, 6, 7, 21, 34, 12, 17, 43, 45, 55};
  int min, max;

  printf("size: %lu", sizeof(a)/sizeof(a[0]));

  minmax(a, sizeof(a)/sizeof(a[0]), &min, &max);
  printf("min=%d,max=%d", min, max);

  int *p = &min;

  printf("*p=%d\n", *p);
  printf("p[0]=%d\n", p[1]);
  return 0;
}

void swap(int *pa, int *pb) {
  int t = *pa;
  *pa = *pb;
  *pb = t;
}



void minmax(int a[], int len, int *min, int *max) {
  int i;
  *min = *max = a[0];
  for (i = 1; i < len; i++) {
    if (a[i] < *min) {
      *min = a[i];
    } else if (a[i] > *max) {
      *max = a[i];
    }
  }
}


