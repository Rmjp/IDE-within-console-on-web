const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [require('flowbite/plugin')],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#FFF5F2',
          500: '#EDD3C4',
          600: '#C8ADC0',
          700: '#7765E3',
          800: '#3B60E4',
          900: '#080708'
        }
      }
    }
  }
};

module.exports = config;