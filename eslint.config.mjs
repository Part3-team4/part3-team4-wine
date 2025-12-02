import { defineConfig } from 'eslint/config';

export default defineConfig({
  extends: ['next', 'plugin:prettier/recommended', 'eslint:recommended'],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  ignorePatterns: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
});
