/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{jsx,tsx,html}"],
  theme: {
    extend: {
      borderRadius: {
        sm: "4px",
      },
      screens: {
        sm: "0px",
        lg: "997px",
      },
      colors: {
        darkBackground: "#1B1B1D",
        lightBackground: "#FFFFFF",
        primaryGreen:"#1A6C36",
        secondaryGreen:"#90BF31",
        lgBackground: "#EDF0EC",
        dgBackground: "#12210E",
      },
    },
  },
  plugins: [],
}

