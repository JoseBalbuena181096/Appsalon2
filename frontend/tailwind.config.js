const colors = require('tailwindcss/colors');

export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./node_modules/vue-tailwind-datepicker/**/*.js",
      "./formkit.config.js"
    ],
    theme: {
      extend: {
        colors: {
          "vtd-primary": colors.blue,
          "vtd-secondary": colors.gray
        }
      }
    },
    plugins: []
  }