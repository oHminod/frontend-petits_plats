/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Manrope", "sans-serif"],
                anton: ["Anton", "sans-serif"],
            },
        },
    },
    plugins: [],
};
