/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#ef4444",
        hv: "#db2929",
      },
    },
  },
  plugins: [],
};
