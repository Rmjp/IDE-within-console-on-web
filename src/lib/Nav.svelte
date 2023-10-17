<script>
  import { onMount } from 'svelte';
  import { doc_now, doc_name } from "./stores"
  import * as idbf from "./idb.js";
  let files = [];
  export let cur_file = "";
  let doc_value = "";
  async function save_file(name){
    if(files.includes(name)){
      await idbf.updateValue(db, name, doc_value);
    }
    else{
      await idbf.addValue(db, name, doc_value);
      files.push(name);
    }
  }
  async function get_file(name){
    if(files.includes(name)){
      return await idbf.getValue(db, name);
    }
    else{
      return "";
    }
  }
  doc_name.subscribe(async (value) => {
      console.log(value);
    });
  onMount(async ()=>{
    let local_value = localStorage.getItem('doc_now');
    if(local_value){
      doc_now.set(local_value);
    }
    doc_now.subscribe((value) => {
      doc_value = value;
      localStorage.setItem('doc_now', doc_value);
    });
    files.push("workspace");
    cur_file = "workspace";

    let db = await idbf.connectIDB();
    let names = await idbf.getListNames(db);
    files = [...files, ...names];
  });
</script>
  
<div class="text-center">
  {#each files as file (file)}
    <div class="border-solid border-2 border-zinc-800">
      <button class="w-full" on:click={() => {save_file(cur_file); cur_file = file; doc_now.set(get_file(file));}}>{file}</button>
    </div>
  {/each}
</div>