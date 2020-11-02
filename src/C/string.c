#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
  char *str = malloc(sizeof(char) * 10);
  char string[6] = { 'h', 'e', 'l', 'l', 'o', '\0' };

  // strcpy(str, "hello");
  printf("%lu\n", sizeof(string));
  printf("%lu\n", sizeof(str));

  return 0;
}
