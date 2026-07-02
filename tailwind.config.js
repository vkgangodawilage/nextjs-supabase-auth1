/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#161616",
        paper: "#FAFAF8",
        line: "#E4E2DC",
        accent: "#2F5D50",
        accentSoft: "#E7EFEC",
        danger: "#B3441E",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
