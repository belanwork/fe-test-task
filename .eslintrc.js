module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': [
      1,
      {
        ignore: ['context', 'tracking'],
      },
    ],
    '@typescript-eslint/no-var-requires': 0,
    'object-curly-newline': [
      1,
      {
        minProperties: 1,
      },
    ],
    'object-property-newline': [
      1,
      {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    'consistent-return': 0,
    'arrow-body-style': [0],
    'no-new-func': 0,
    'multiline-ternary': [1, 'always'],
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': ['warn'],
    'linebreak-style': 0,
    'no-trailing-spaces': ['warn'],
    'guard-for-in:': 0,
    'no-debugger': 1,
    'react/jsx-indent': [1, 2],
    'react/jsx-indent-props': [1, 2],
    'react/jsx-first-prop-new-line': [1, 'always'],
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 1,
      },
    ],
    'jsx-quotes': ['warn', 'prefer-single'],
    quotes: [1, 'single', 'avoid-escape'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['JSXAttribute'],
      },
    ],
    'react/jsx-one-expression-per-line': [1],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
