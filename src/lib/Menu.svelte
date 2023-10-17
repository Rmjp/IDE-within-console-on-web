<script>
    export let clickRun = () => {
        console.log("clickRun");
    }
    export let clickSave = () => {
        console.log("clickSave");
    }
    export let textValue;

    export let clickNewfile = () => {
        console.log("clickRun");
    }
    export let clickSavefile = () => {
        console.log("clickSave");
    }
</script>

<div class="flow-root">
    <div class="float-left">
        <p class="float-left">Name of File:</p>
        <input class="float-left shadow appearance-none border rounded mx-1 mb-2 py-1 px-1 h-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" bind:value={textValue}>
        <button class="border rounded border-black px-3" on:click={clickNewfile()}>
            Newfile
        </button>
        <button class="border rounded border-black px-3" on:click={clickSavefile()}>
            Save
        </button>
    </div>
    
    <div class="float-right">
        <span>console:</span>
        <button class="border rounded border-black px-3" on:click={clickSave()}>
            Save
        </button>
        <button class="border rounded border-black px-3" on:click={clickRun()}>
            Run
        </button>
    </div>
</div>