<script lang="ts">
    import {basicSetup} from "codemirror"
    import {EditorView, keymap} from "@codemirror/view"
    import {cpp, cppLanguage} from "@codemirror/lang-cpp"
    import {indentWithTab} from "@codemirror/commands"
    import {EditorState, Compartment} from "@codemirror/state"
    import { onMount, onDestroy } from 'svelte';
    import {tags} from "@lezer/highlight"
    import {HighlightStyle, syntaxHighlighting} from "@codemirror/language"

    let doc = `#include <stdio.h>

int main()
{
  printf("Hello, world!\\n");
  return 0;
}`;
    let editors;
    let state;
    let editor;
    onMount(() => {
        let language = new Compartment, tabSize = new Compartment
        let theme = EditorView.theme({
            "&": {
                color: "white",
                backgroundColor: "#2f2f2f",
                height: "70vh",
            },
            ".cm-gutter": {
                backgroundColor: "#000",
            },
            ".cm-scroller": {overflow: "auto"},
        }, {dark: true},
        )
        const myHighlightStyle = HighlightStyle.define([
            {tag: tags.keyword, color: "#3765FF"},
            {tag: tags.comment, color: "#D0D0D0", fontStyle: "italic"},
            {tag: tags.blockComment, color: "#D0D0D0", fontStyle: "italic"},
            {tag: tags.name, color: "#9C58FF"},
            {tag: tags.variableName, color: "#FF2E2E"},
            {tag: tags.typeName, color: "#842FFF"},
            {tag: tags.string, color: "#FF9D00"},
            {tag: tags.className, color: "#64A8FF"},
            {tag: tags.namespace, color: "#6AE2FF"},
            {tag: tags.macroName, color: "#6AE2FF"},
            {tag: tags.number, color: "#FF9D00"},
            {tag: tags.regexp, color: "#FF9D00"},
            {tag: tags.escape, color: "#FFB949"},
            {tag: tags.definitionKeyword, color: "#3765FF"},
            {tag: tags.operator, color: "#842FFF"},
            {tag: tags.bracket, color: "#4FFF49"},
            {tag: tags.squareBracket, color: "#BDFFBA"},
            //define
            {tag: tags.meta, color: "#4FFF49"},
            ])
        
        state = EditorState.create({
            doc,
        extensions: [
            basicSetup,
            language.of(cpp()),
            keymap.of([indentWithTab]),
            tabSize.of(EditorState.tabSize.of(10)),
            cpp(),
            theme,
            syntaxHighlighting(myHighlightStyle),
        ],
        })

        editor = new EditorView({
            state,
            parent: editors,
            
        })

        // Cleanup the event listener when the component is destroyed
    });

    export function getEditorValue() {
        return editor.state.doc;
    }
</script>
<div id="editor" class="h-full" bind:this={editors}>
</div>