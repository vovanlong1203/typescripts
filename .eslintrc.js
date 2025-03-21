module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'
    ],
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error'],
    },
    env: {
      node: true,
    },
  };