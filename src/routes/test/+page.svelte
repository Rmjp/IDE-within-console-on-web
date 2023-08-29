<script lang="ts">
    import {EditorView, basicSetup} from "codemirror"
    import {cpp} from "@codemirror/lang-cpp"
    import { onMount, onDestroy } from 'svelte';

    onMount(() => {
        let editor = new EditorView({
            extensions: [basicSetup, cpp()],
            parent: document.body
        })

        // Cleanup the event listener when the component is destroyed
        onDestroy(() => {
            
        });
    });
</script>
<body>

</body>