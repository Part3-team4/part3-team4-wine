import { defineConfig, globalIgnores } from 'eslint/config';
import next from 'eslint-config-next';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  next(),
  {
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
    },
    extends: ['plugin:prettier/recommended'],
    rules: {
      'prettier/prettier': 'error',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
