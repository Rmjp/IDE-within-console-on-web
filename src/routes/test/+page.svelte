<script>
    import Console from "$lib/Console.svelte";
    import { onMount } from "svelte";
    onMount(async ()=>
    {
        await import('$lib/v86/build/xterm.js');
        const { Terminal } = await import('xterm');
        const terminal = new Terminal({
            "logLevel": "off",
        });
        terminal.open(document.getElementById("asd"));
    });
    
</script>

<textarea></textarea>
<div id="asd"></div>