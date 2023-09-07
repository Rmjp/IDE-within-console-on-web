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
    <p class="float-left">Name of File:</p>
    <input class="float-left h-5 my-1" type="text" name="name" bind:value={textValue}>
    <button class="float-right ml-3" on:click={clickSave()}>
        Save
    </button>
    <button class="float-right" on:click={clickRun()}>
        Run
    </button>
</div>