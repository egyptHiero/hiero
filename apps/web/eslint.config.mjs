import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    // Override or add rules here
    rules: {
      ...reactPlugin.configs['recommended'].rules,
      ...reactHooksPlugin.configs['recommended'].rules,
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    ignores: [
      'src/controls/hiero/hierojax.js',
      'src/@types/openapi-schema.d.ts',
    ],
  },
];
