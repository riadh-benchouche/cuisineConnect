/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    50: '#f9faf8',
                    100: '#f3f6f1',
                    200: '#e6edda',
                    300: '#d9e3c2',
                    400: '#bfce95',
                    500: '#a5b868',
                    600: '#94a25f',
                    700: '#7a854f',
                    800: '#5f683f',
                    900: '#4f5433',
                },
                secondary: {
                    700: '#FE2939',
                    600: '#FF4B5B',
                    500: '#FF6D7D',
                    400: '#FF8F9F',
                    300: '#FFB1C1',
                    200: '#FFD3E3',
                    100: '#FFF5F5',
                    50: '#FFFDFD',
                }
            },
        },
        plugins: [],
    }
}
