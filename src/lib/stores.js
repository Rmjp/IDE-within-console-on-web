import { writable } from 'svelte/store';

export const doc_now = writable(`#include <stdio.h>

int main()
{
  printf("Hello, world!\\n");
  return 0;
}`);
export const doc_set = writable(0);