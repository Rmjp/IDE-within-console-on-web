<script>
  import { version } from '$app/environment';
    import { onMount } from 'svelte';
    var terminal_div = null;
    let emulator;
    let versionFile = 0;
    export function sendFile(data, name){
        versionFile += 1;
        emulator.serial0_send("rm -rf /root/"+name+"\n");
        emulator.create_file("/root/code"+versionFile + ".c", data);
    }
    // var screen_container = null;
    export function RunFile(){
        emulator.serial0_send("gcc -o out /root/code"+versionFile + ".c && ./out\n");
    }
    onMount(async () => {
        await import('https://adt-s3.runnakjeen.com/build/xterm.js');
        await import('https://adt-s3.runnakjeen.com/build/libv86.js');
        const { FitAddon } = await import('xterm-addon-fit');
        const { Terminal } = await import('xterm');
        const fitAddon = new FitAddon();
        const terminal = new Terminal({
            "logLevel": "off",
        });
        terminal.loadAddon(fitAddon);
        terminal.open(terminal_div);
        fitAddon.fit();
        
        emulator = new V86Starter({
        wasm_path: "https://adt-s3.runnakjeen.com/build/v86.wasm",
        memory_size: 512 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        // screen_container: screen_container,
        serial_container_xtermjs: terminal,
        disable_keyboard: true,
        disable_mouse: true,
        bios: {
            url: "https://adt-s3.runnakjeen.com/bios/seabios.bin",
        },
        // vga_bios: {
        //     url: "src/lib/v86/bios/vgabios.bin",
        // },
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
                baseurl: "https://adt-s3.runnakjeen.com/images/arch/",
                basefs: "https://adt-s3.runnakjeen.com/images/fs.json",
            },
            
            // bzimage_initrd_from_filesystem: true,
            
            cmdline: [
                "rw",
            "root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose",
        ].join(" "),
        
            acpi: false,
            autostart: true,
            initial_state: {
                "url": "https://adt-s3.runnakjeen.com/images/v86state.bin.zst",
            },
        }); 

        terminal.write("Welcome to console!\r\n");
    });
</script>

<!-- <div bind:this={screen_container}>
    <div style="white-space: pre; font: 14px monospace; line-height: 14px"></div>
    <canvas style="display: none"></canvas>
</div> -->

<div bind:this={terminal_div} id="terminal_div" class="h-full"></div>

<link rel="stylesheet" href="https://adt-s3.runnakjeen.com/build/xterm.css" />

