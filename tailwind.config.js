import { typography } from './src/shared/constants/typography';
const plugin = require('tailwindcss/plugin');

module.exports = {
  // eslint-disable-next-line prettier/prettier

  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,mdx}'],
  plugins: [
    plugin(({ addComponents }) => {
      addComponents(typography);
    }),
  ],
  theme: {
    extend: {
      colors: {
        'brand-50': '#F9F5FF',
        'brand-200': '#E9D7FE',
        'brand-300': '#D6BBFB',
        'brand-600': '#7F56D9',
        'brand-700': '#6941C6',
        naver: '#03C75A',
        'error-50': '#FEF3F2',
        'error-300': '#FDA29B',
        'error-500': '#F04438',
        'error-700': '#B42318',
        'success-50': '#ECFDF3',
        'success-500': '#12B76A',
        'success-700': '#027A48',
        'blue-50': '#EFF8FF',
        'blue-500': '#2E90FA',
        'blue-700': '#175CD3',
        'blue-gray-50': '#F8F9FC',
        'blue-gray-700': '#363F72',
        'blue-gray-900': '#101323',
        'warning-50': '#FFFAEB',
        'warning-100': '#FEF0C7',
        'warning-500': '#F79009',
        'warning-700': '#B54708',
        'warning-900': '#7A2E0E',
        'gray-50': '#F9FAFB',
        'gray-600': '#475467',
        'gray-700': '#344054',
        'rose-50': '#FFF1F3',
        'rose-500': '#F63D68',
        'rose-700': '#C01048',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
