/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        './index.html',
        './src/**/*.{vue,jsx,tsx,ts,js}',
    ],
    
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
