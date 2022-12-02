module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:import/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'react-native/no-inline-styles': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'import/named': 'off',
        'import/no-unresolved': 'off',
        'import/namespace': 'off',
        'comma-dangle': 'off',
      },
    },
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
