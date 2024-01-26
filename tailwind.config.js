/** @type {import('tailwindcss').Config} */
module.exports = {
  // eslint-disable-next-line prettier/prettier
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-50': '#F9F5FF',
        'brand-600': '#7F56D9',
        'brand-700': '#6941C6',
        naver: '#03C75A',
        'error-50': '#FEF3F2',
        'error-700': '#B42318',
        'success-50': '#ECFDF3',
        'success-700': '#027A48',
      },
    },
  },
  plugins: [],
};
