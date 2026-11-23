import antfu from '@antfu/eslint-config';

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
    // 支持分号风格
    'style/semi': ['error', 'always'],
    'style/member-delimiter-style': ['error', { multiline: { delimiter: 'semi' } }],
    // 禁用一些过于严格的规则
    'perfectionist/sort-imports': 'off',
    'unused-imports/no-unused-vars': 'off',
    'regexp/no-unused-capturing-group': 'off',
    'jsdoc/require-returns-description': 'off',
    'regexp/no-useless-flag': 'off',
    'ts/consistent-type-imports': 'off',
    'ts/no-unnecessary-type-constraint': 'off',
    'ts/no-require-imports': 'off',
    'react-hooks/exhaustive-deps': 'off',
    // @antfu/eslint-config v10 新增的强格式规则，与项目现有风格不一致，关闭以避免大面积无关改动
    'antfu/reasonable-newline': 'off',
  },
});
