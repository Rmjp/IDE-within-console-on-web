<script>
    import Editor from "$lib/Editor.svelte";
    import Console from "$lib/Console.svelte";
    import Menu from "$lib/Menu.svelte";
    import Nav from "$lib/Nav.svelte";

    let Editor_component;
    let Console_component;
    let Nev_component;
    let textValue;
    let vim_mode;
    const encoder = new TextEncoder();  // TextEncoder is built-in in most modern browsers.
    function stringToUint8Array(str) {
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

    async function save_file(){
        await Nev_component.save_file(textValue);
    }

    function setEditorValue(value){
        Editor_component.setEditorValue(value);
    }

    async function delete_file(){
        await Nev_component.delete_file(textValue);
    }

    function downloadUint8ArrayAsFile(uint8Array, fileName, mimeType) {
        // Create a Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: mimeType });

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const a = document.createElement("a");

        // Set the download attribute to specify the file name
        a.download = fileName;

        // Set the href attribute to the temporary URL
        a.href = url;

        // Append the link element to the document body
        document.body.appendChild(a);

        // Trigger a click event on the link element
        a.click();

        // Remove the link element from the document body
        document.body.removeChild(a);

        // Revoke the temporary URL
        URL.revokeObjectURL(url);
    }
    async function download_file(){
        let value = stringToUint8Array(Editor_component.getEditorValue());
        let name = textValue;
        let mimeType = "text/plain";
        downloadUint8ArrayAsFile(value, name, mimeType);
    }

</script>
<div class="h-screen w-screen bg-neutral-300">
    <div class="flex flex-row lg:flex-col flex-wrap h-full">
        <div class="w-full h-10 lg:w-[10vw] lg:h-full px-2">
            <Nav bind:this={Nev_component} bind:cur_file={textValue} setEditorValue={setEditorValue}/>
        </div>

        <div class="pt-1 px-2 h-full lg:flex flex-col">
            <div class="h-10 pt-1.5 px-2 bg-zinc-300 border-solid border-2 border-zinc-800 rounded-md">
                <Menu bind:vim_mode={vim_mode} bind:textValue={textValue} clickSavefile={save_file}  clickSave={SaveToEmu} clickRun={RunToEmu} clickDeletefile={delete_file} clickExportfile={download_file}/>
            </div>

            <div class="flex-grow">
                {#key vim_mode}
                    <Editor bind:this={Editor_component} vim_mode={vim_mode}/>
                {/key}
            </div>

            <div class="h-1/4">
                <Console bind:this={Console_component}/>
            </div>
        </div>
    </div>
</div>