<script>
  import { onMount } from 'svelte';
  import { doc_now, doc_name } from "./stores"
  import * as idbf from "./idb.js";
  let files = [];
  let name = "";
  let doc_value = "";
  let prev_name = "";
  onMount(async ()=>{
    let local_value = localStorage.getItem('doc_now');
    if(local_value){
      doc_now.set(local_value);
    }
    doc_now.subscribe((value) => {
      doc_value = value;
      localStorage.setItem('doc_now', doc_value);
    });
    

    let db = await idbf.connectIDB();
    files = await idbf.getListNames(db);
    doc_name.subscribe(async (value) => {
      console.log(value);
      prev_name = name;
      name = value;
      if(files.includes(prev_name)){
        await idbf.updateValue(db, name, doc_value);
      }
      if(files.includes(name)){
        let value = await idbf.getValue(db, name);
        doc_now.set(value);
      }
      else{
        await idbf.addValue(db, name, doc_value);
        files.push(name);
      }
    });
  });
</script>
  
<div class="text-center">
  {#each files as file (file)}
    <div class="flex flex-row justify-center">
      <div class="w-1/2">
        <input type="text" value={file} class="w-full" />
      </div>
      <div class="w-1/2">
        <button class="w-full" on:click={() => {doc_name.set(file); console.log(file);}}>Open</button>
      </div>
    </div>
  {/each}
</div>