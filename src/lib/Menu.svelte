<script>
    export let clickRun = () => {
        console.log("clickRun");
    }
    export let clickSave = () => {
        console.log("clickSave");
    }
    export let textValue;

    export let clickSavefile = () => {
        console.log("clickSave");
    }
    function clickDeletefile_confirm(){
        let confirm = window.confirm("Are you sure you want to delete this file?");
        if(confirm){
            clickDeletefile();
        }
    }
    export let clickDeletefile = () => {
        console.log("clickDeletefile");
    }
    export let clickExportfile = () => {
        console.log("clickExportfile");
    }

    export let vim_mode = false;
</script>

<div class="flow-root text-center">
    <div class="float-left">
        <p class="float-left">Name of File:</p>
        <input class="float-left shadow appearance-none border rounded mx-1 mb-2 py-1 px-1 h-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" bind:value={textValue}>
        <button class="border rounded border-black px-3" on:click={clickSavefile}>
            Save
        </button>
        <button class="border rounded border-black px-3" on:click={clickDeletefile_confirm}>
            Delete
        </button>
        <button class="border rounded border-black px-3" on:click={clickExportfile}>
            Export
        </button>
    </div>
    <div class="inline">
        <button class="border rounded border-black px-3" on:click={()=>{vim_mode = !vim_mode}}>
            Vim mode {#if vim_mode}on{:else}off{/if}
        </button>
    </div>
    <div class="float-right">
        <span>console:</span>
        <button class="border rounded border-black px-3" on:click={clickSave}>
            Save
        </button>
        <button class="border rounded border-black px-3" on:click={clickRun}>
            Run
        </button>
    </div>
</div>