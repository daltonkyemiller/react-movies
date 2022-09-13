/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{vue,jsx,tsx,ts,js}'],

    theme: {
        extend: {
            fontFamily: {
                brand: ['contralto-big', 'sans-serif'],
            }
        },

    },
    plugins: [require('@tailwindcss/typography')],
};
