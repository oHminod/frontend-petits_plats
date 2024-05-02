/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                primary: "#FFD15B",
                iconBlack: "#1B1B1B",
                greybg: "#EDEDED",
                greytext: "#7A7A7A",
            },
            fontFamily: {
                sans: ["Manrope", "sans-serif"],
                anton: ["Anton", "sans-serif"],
            },
        },
    },
    plugins: [],
};
