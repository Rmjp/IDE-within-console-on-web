<script lang="ts">
    export let clickRun: any = () => {
        console.log("clickRun");
    }
    export let clickSave: any = () => {
        console.log("clickSave");
    }
</script>

<div class="flow-root">
    <button class="float-right ml-3" on:click={clickSave()}>
        Save
    </button>
    <button class="float-right" on:click={clickRun()}>
        Run
    </button>
</div>