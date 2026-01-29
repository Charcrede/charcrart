/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}", // optionnel mais OK
  ],
  theme: {
    extend: {
      colors: {
        primary: "#66a8fc",
      },
    },
  },
  plugins: [],
}
