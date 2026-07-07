import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['**/*.md'],
  formatters: {
    css: true,
    html: true,
  },
  markdown: {
    overrides: {},
  },
  rules: {
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'ts/ban-ts-comment': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'node/prefer-global/process': 'off',
  },
  pnpm: true,
})
