module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:i18next/recommended',
    // 'plugin:storybook/recommended',
    // 'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'egyy-plugin',
    'unused-imports',
    'import',
  ],
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: './**.module.*',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'no-plusplus': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreAttribute: [
          'as',
          'role',
          'data-testid',
          'to',
          'target',
          'justify',
          'align',
          'border',
          'direction',
          'gap',
          'feature',
          'color',
          'variant',
          'size',
          'wrap',
          'placement',
          'name',
          'autoComplete',
          'placeholder',
          'preferredPlacement',
          'side',
          'defaultTabId',
          'aria-label',
          'theme',
        ],
      },
    ],
    'max-len': [
      'error',
      {
        ignoreComments: true,
        code: 125,
      },
    ],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error',
    // Checks effect dependencies,
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'react/no-array-index-key': 'off',
    'arrow-body-style': 'off',
    'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
    'react/no-unstable-nested-components': 'warn',
    'no-nested-ternary': 'off',
    // Check fsd
    'egyy-plugin/path-checker': ['error', { alias: '@' }],
    'egyy-plugin/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: [
          '**/*.test.*',
          '**/*.story.*',
          '**/StoreDecorator.tsx',
        ],
      },

    ],
    'egyy-plugin/layer-imports': [
      'error',
      {
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
      },
    ],
  },
  globals: {
    __IS_DEV__: true,
    __PROJECT__: true,
    __SERVER_URL: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off',
      },
    },
  ],
};
