/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "sans-serif px-5"],
      },
      colors: {
        primary: "#F62682",
        secondary: "#7a00fc",
      },
    },
  },
  plugins: [],
};
