/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // background
                dark: '#101321',
                light: '#1A1D2B',

                // shadow
                glow: '#db4bff7c',

                // border
                'border-light': '#34364C',
                'border-best': '#4DFFBF',

                // text
                'text-disabled': '#9D9D9D',

                // div
                'div-disabled': '#34364C',

                // unusual
                'text-route': '#4CFFBF',
                'border-route': '#25C189',
                'bg-route': '#134332',
            },

            fontSize: {
                'text-input': '24px',
            },
        },
    },
    plugins: [],
};
