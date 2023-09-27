<script>
  import { onMount } from 'svelte';
  import { doc_now, doc_set } from "./stores"
  let files = [];
  onMount(()=>{
    files = JSON.parse(localStorage.getItem("files"));
    if (files == null){
      files = [];
      // {name: "code.c", content: ""}
    }
    files.push({name: "new file", content: ""});
    doc_set.set(files.length - 1);
  });
</script>
  
<div class="text-center">
  {#each files as file (file.id)}
    <div class="flex flex-row justify-center">
      <div class="w-1/2">
        <input type="text" value={file.name} class="w-full" />
      </div>
      <div class="w-1/2">
        <button class="w-full" on:click={() => {doc_now.set(file.content)}}>Open</button>
      </div>
    </div>
  {/each}
</div>