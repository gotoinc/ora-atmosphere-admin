/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,.module.js}'],
    theme: {
        extend: {
            colors: {
                primary: '#495AFF',
                surface: '#232323',
            },
        },
    },
    plugins: [],
};
