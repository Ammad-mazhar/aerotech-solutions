/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    maroon: '#7f1d1d',
                    orange: '#f97316',
                    green: '#22c55e',
                }
            }
        },
    },
    plugins: [],
}
