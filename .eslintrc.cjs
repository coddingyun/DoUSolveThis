module.exports = {
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    //'plugin:jsx-a11y/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier',
  ],
  env: { browser: true, es2020: true },
  parserOptions: {
    ecmaVersion: 2020,
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'postcss.config.cjs',
    'tailwind.config.js',
  ],
  settings: {
    // react: {
    //   // Tells eslint-plugin-react to automatically detect the version of React to use.
    //   version: 'detect',
    // },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        //"paths": ["src"],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // Add your own rules here to override ones from the extended configs.
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': 0,
    'react/no-array-index-key': 'off',
    'no-shadow': 'off',
    'no-return-await': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
};
