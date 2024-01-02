/** @type {import('tailwindcss').Config} */
module.exports = {
  // eslint-disable-next-line prettier/prettier
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-600': '#7F56D9',
        naver: '#03C75A',
      },
    },
  },
  plugins: [],
};
