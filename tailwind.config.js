/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      cursor: {
        vernis: 'url("/globelle-front/images/vernis.png"), pointer',
      },
    },
  },
  plugins: [],
};
