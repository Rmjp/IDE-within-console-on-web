<script>
    import '$lib/v86/build/libv86';
    import { onMount } from 'svelte';
    var screen_container;
    onMount(() => {
        var emulator = new V86Starter({
        wasm_path: "src/lib/v86/build/v86.wasm",
        memory_size: 512 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        screen_container: screen_container,
        bios: {
            url: "src/lib/v86/bios/seabios.bin",
        },
        vga_bios: {
            url: "src/lib/v86/bios/vgabios.bin",
        },
        // hda: {
            //     url: "../output/images/arch.img",
            //     // # set to true if you want to load it asynchrously during runtime (for this option we need to run a webserver that supports the Range header)
            //     // # NOTE: async: false is slow but proved to be more realiable
            //     async: false,
            
            //     // # This needs to be the size of the raw disk.
            //     size: 1.5 * 1024 * 1024 * 1024,
            //     // # See the `disk_size` item in the packer template.
            // },
            filesystem: {
                baseurl: "src/lib/v86/images/arch/",
                basefs: "src/lib/v86/images/fs.json",
            },
            
            // bzimage_initrd_from_filesystem: true,
            
            cmdline: [
                "rw",
            "root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose",
        ].join(" "),
        
            acpi: false,
            autostart: true,
            initial_state: {
                "url": "src/lib/v86/images/v86state.bin",
            },
        }); 
    });
</script>

<div bind:this={screen_container}>
    <div style="white-space: pre; font: 14px monospace; line-height: 14px"></div>
    <canvas style="display: none"></canvas>
</div>