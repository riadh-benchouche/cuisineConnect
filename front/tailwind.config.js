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
                    50: '#fff8f4',
                    100: '#ffefe8',
                    200: '#ffd9cd',
                    300: '#ffc3b2',
                    400: '#ff9b7e',
                    500: '#ff7349',
                    600: '#e66a42',
                    700: '#b35036',
                    800: '#913c2b',
                    900: '#782f23',
                }
            },
        },
        plugins: [],
    }
}
