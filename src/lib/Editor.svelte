<script lang="ts">
    import {basicSetup} from "codemirror"
    import {EditorView, keymap} from "@codemirror/view"
    import {cpp, cppLanguage} from "@codemirror/lang-cpp"
    import {indentWithTab} from "@codemirror/commands"
    import {EditorState, Compartment} from "@codemirror/state"
    import { onMount, onDestroy } from 'svelte';

    let doc = `#include <stdio.h>

int main()
{

  return 0;
}`
    let editors;
    onMount(() => {
        let language = new Compartment, tabSize = new Compartment
        let theme = EditorView.theme({
            "&": {
                color: "white",
                backgroundColor: "#034",
                height: "100%",
            },
            ".cm-content": {
                caretColor: "#fff"
            },
            "&.cm-focused .cm-cursor": {
                borderLeftColor: "#0e9"
            },
            "&.cm-focused .cm-selectionBackground, ::selection": {
                backgroundColor: "#074"
            },
            ".cm-gutters": {
                backgroundColor: "#045",
                color: "#ddd",
                border: "none"
            },
            ".cm-scroller": {overflow: "auto", height: "100%"},
            }, {dark: true},
            )
        
        let state = EditorState.create({
        extensions: [
            basicSetup,
            language.of(cpp()),
            keymap.of([indentWithTab]),
            tabSize.of(EditorState.tabSize.of(10)),
            cpp(),
            theme,
        ],
        })


        let editor = new EditorView({
            doc,
            state,
            parent: editors,
            
        })

        // Cleanup the event listener when the component is destroyed
        onDestroy(() => {
            
        });
    });
</script>
<div id="editor" class="h-full" bind:this={editors}>
</div>