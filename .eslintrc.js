module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    webextensions: true,
  },
  parser: "@babel/eslint-parser",
  plugins: ["react"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    chrome: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off'
  },
};
