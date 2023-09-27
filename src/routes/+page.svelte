<script lang="ts">
    import Editor from "$lib/Editor.svelte";
    import Console from "$lib/Console.svelte";
    import Menu from "$lib/Menu.svelte";
    import Nav from "$lib/Nav.svelte";

    let Editor_component: Editor;
    let Console_component: Console;
    let textValue: string = "code.c";
    const encoder = new TextEncoder();  // TextEncoder is built-in in most modern browsers.
    function stringToUint8Array(str: string) {
        return encoder.encode(str);
    }
    async function SaveToEmu(){
        let value = Editor_component.getEditorValue();
        await Console_component.sendFile(stringToUint8Array(value), textValue);
    }

    async function RunToEmu(){
        await SaveToEmu();
        Console_component.RunFile(textValue);
    }

</script>
<div class="h-screen w-screen bg-neutral-300">
    <div class="flex flex-row lg:flex-col flex-wrap h-full">
        <div class="w-full w-screen h-10 lg:w-[10vw] lg:h-full px-2">
            <Nav/>
        </div>

        <div class="pt-1 px-2 h-full lg:flex flex-col">
            <div class="h-10 pt-1.5 px-2 bg-zinc-300 border-solid border-2 border-zinc-800 rounded-md">
                <Menu clickSave={SaveToEmu} clickRun={RunToEmu} bind:textValue={textValue}/>
            </div>

            <div class="flex-grow">
                <Editor bind:this={Editor_component}/>
            </div>

            <div class="h-1/4">
                <Console bind:this={Console_component}/>
            </div>
        </div>
    </div>
</div>