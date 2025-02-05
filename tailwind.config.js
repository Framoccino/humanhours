/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0A192F',
                secondary: '#112240',
                accent: '#64FFDA',
                'text-primary': '#E6F1FF',
                'text-secondary': '#8892B0',
                border: '#1E2D4D',
            },
        },
    },
    plugins: [],
} 