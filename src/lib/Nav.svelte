<script>
  import { onMount } from 'svelte';
  import { doc_now, doc_name } from "./stores"
  import * as idbf from "./idb.js";
    import { expoOut } from 'svelte/easing';
  let files = [];
  export let cur_file = "";
  let local_name = null;
  let doc_value = "";
  let db = null;
  export async function save_file(name){
    if(files.includes(name)){
      await idbf.updateValue(db, name, doc_value);
    }
    else{
      await idbf.addValue(db, name, doc_value);
      files = [...files, name]
    }
  }
  async function get_file(name){
    if(files.includes(name)){
      let value = await idbf.getValue(db, name);
      return value.value;
    }
    else{
      return "";
    }
  }
  export async function delete_file(name){
    if(files.includes(name)){
      await idbf.deleteValue(db, name);
      files = files.filter((value) => value != name);
      if(files.length == 0){
        files.push("workspace");
        doc_name.set("workspace");
        setEditorValue("");
      }
      else{
        doc_name.set(files[0]);
        setEditorValue(await get_file(cur_file));
      }
      
    }
  }
  export let setEditorValue;
  onMount(async ()=>{
    let local_value = localStorage.getItem('doc_now');
    
    if(local_value){
      doc_now.set(local_value);
    }
    doc_now.subscribe((value) => {
      doc_value = value;
      console.log(value);
      localStorage.setItem('doc_now', doc_value);
    });
    local_name = localStorage.getItem('local_name');
    if(local_name){
      doc_name.set(local_name);
      cur_file = local_name;
    }
    doc_name.subscribe(async (value) => {
      console.log(value);
      local_name = value;
      localStorage.setItem('local_name', local_name);
      cur_file = local_name;
    });
    db = await idbf.connectIDB();
    let names = await idbf.getListNames(db);
    files = [...files, ...names];
    if(files.length == 0){
      local_name = "workspace";
      files.push("workspace");
      cur_file = "workspace";
    }
  });
</script>
  
<div class="text-center">
  {#each files as file (file)}
    <div class="border-solid border-2 border-zinc-800">
      <button class="w-full" on:click={async () => {await save_file(local_name); doc_name.set(file); setEditorValue(await get_file(file));}}>{file}</button>
    </div>
  {/each}
</div>