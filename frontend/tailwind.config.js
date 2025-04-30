export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./node_modules/vue-tailwind-datepicker/**/*.js"
    ],
    theme: {
      extend: {
        colors: {
          "vtd-primary": "rgb(var(--color-primary) / <alpha-value>)",
          "vtd-secondary": "rgb(var(--color-secondary) / <alpha-value>)"
        }
      }
    },
    plugins: []
  }