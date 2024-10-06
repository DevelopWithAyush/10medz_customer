/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4471D4 ",
        secondary: "#FE5B00 ",
        black: {
          DEFAULT: "#000",
          100: "#555555 ",
          200: "#171717",
        },
      },
      fontFamily: {
        pthin_100: ["Poppins-Thin", "sans-serif"],
        pextralight_200: ["Poppins-ExtraLight", "sans-serif"],
        plight_300: ["Poppins-Light", "sans-serif"],
        pregular_400: ["Poppins-Regular", "sans-serif"],
        pmedium_500: ["Poppins-Medium", "sans-serif"],
        psemibold_600: ["Poppins-SemiBold", "sans-serif"],
        pbold_700: ["Poppins-Bold", "sans-serif"],
        pextrabold_800: ["Poppins-ExtraBold", "sans-serif"],
        pblack_900: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
