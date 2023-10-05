import { writable } from 'svelte/store';

export const doc_now = writable(`#include <stdio.h>

int main()
{
  printf("Hello, world!\\n");
  return 0;
}`);
export const doc_name = writable("new file");

// export const doc_changed = writable(false);