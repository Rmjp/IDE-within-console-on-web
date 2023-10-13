<script lang="ts">
    export let clickRun: any = () => {
        console.log("clickRun");
    }
    export let clickSave: any = () => {
        console.log("clickSave");
    }
    export let textValue: string;
</script>

<div class="flow-root">
    <div class="float-left">
        <p class="float-left">Name of File:</p>
        <input class="float-left shadow appearance-none border rounded mx-1 mb-2 py-1 px-1 h-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" bind:value={textValue}>
    </div>
    
    <div class="float-right">
        <button class=" ml-3" on:click={clickSave()}>
            Save
        </button>
        <button class="" on:click={clickRun()}>
            Run
        </button>
    </div>
</div>