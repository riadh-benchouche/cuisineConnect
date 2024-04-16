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
                    50: '#ff6d7d',
                    100: '#ff5f70',
                    200: '#ff4e60',
                    300: '#ff3e50',
                    400: '#ff3243',
                    500: '#FE2939',
                    600: '#e62334',
                    700: '#cc1e2c',
                    800: '#b01925',
                    900: '#96151e',
                }
            },
        },
        plugins: [],
    }
}
