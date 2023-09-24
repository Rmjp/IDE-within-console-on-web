<script lang="js">
  import { version } from '$app/environment';
    import { onMount } from 'svelte';
    var terminal_div = null;
    let emulator;
    let versionFile = 0;
    export async function sendFile(data, name){
        versionFile += 1;
        await emulator.serial0_send("rm -rf /root/"+name+"\n");
        
        var delayInMilliseconds = 1000;
        setTimeout(function() {
            emulator.create_file("/root/" + name, data);
        }, delayInMilliseconds);
        
    }
    // var screen_container = null;
    export function RunFile(name){
        var delayInMilliseconds = 2000;
        setTimeout(function() {
            emulator.serial0_send("gcc -o out /root/" +name+ " && ./out\n");
        }, delayInMilliseconds);
        
    }

    function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;

      script.onload = () => {
        resolve();
      };

      script.onerror = (error) => {
        reject(new Error(`Script load error for ${src}`));
      };

      document.body.appendChild(script);
    });
  }

    onMount(async () => {
        await loadScript('/v86/build/xterm.js');
        await loadScript('/v86/build/libv86.js');
        // await import('/v86/build/xterm.js');
        // await import('/v86/build/libv86.js');
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
            wasm_path: "/v86/build/v86.wasm",
            memory_size: 512 * 1024 * 1024,
            vga_memory_size: 8 * 1024 * 1024,
            // screen_container: screen_container,
            serial_container_xtermjs: terminal,
            disable_keyboard: true,
            disable_mouse: true,
            bios: {
                url: "/v86/bios/seabios.bin",
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
                    baseurl: "/v86/images/arch/",
                    basefs: "/v86/images/fs.json",
                },
                
                // bzimage_initrd_from_filesystem: true,
                
                cmdline: [
                    "rw",
                "root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose",
            ].join(" "),
            
                acpi: false,
                autostart: true,
                initial_state: {
                    "url": "/v86/images/v86state.bin.zst",
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


<svelte:head>
    <link rel="stylesheet" href="/v86/build/xterm.css" />
	<!-- <script src="/v86/build/xterm.js" ></script>
    <script src="/v86/build/libv86.js"></script> -->
</svelte:head>