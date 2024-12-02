/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/preline/preline.js"],
  theme: {
    extend: {
      cursor: {
        vernis: 'url("/globelle-front/images/vernis.png"), pointer',
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
