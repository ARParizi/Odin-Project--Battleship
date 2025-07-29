import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginNode from 'eslint-plugin-n';
import eslintPluginPromise from 'eslint-plugin-promise';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      import: eslintPluginImport,
      node: eslintPluginNode,
      promise: eslintPluginPromise,
    },
    rules: {
      // ESLint recommended rules
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-debugger': 'warn',

      // Import plugin rules
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-duplicates': 'error',

      // Node plugin rules
    //   'n/no-missing-import': 'error',

      // Promise plugin rules
      'promise/always-return': 'off',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
    },
  },
];
