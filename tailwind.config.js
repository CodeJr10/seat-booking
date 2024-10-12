/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your file types
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          800: "#8b4513", // Dark brown for table
        },
        orange: {
          500: "#d2691e", // Lighter brown for chairs
        },
        green: {
          500: "#4caf50", // Button color
        },
      },
    },
  },

  plugins: [],
};
