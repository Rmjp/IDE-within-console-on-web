<script lang="ts">
    import Editor from "$lib/Editor.svelte";
    import Console from "$lib/Console.svelte";
    import Menu from "$lib/Menu.svelte";

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
<div class="h-screen">
    <div class="flex flex-row flex-wrap h-full">
        <div class="w-full sm:w-1/3 md:w-1/4 px-2 h-full">
            nav
        </div>

        <div class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2 h-full flex flex-col">
            <div class="h-10 pt-1.5">
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