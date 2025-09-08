module.exports = {
  root: true,
  extends: [require.resolve('@umijs/max/eslint'), 'plugin:prettier/recommended'],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'custom-property-no-missing-var-function': 0,
    'function-no-unknown': 0,
    'react-hooks/rules-of-hooks': 'error', // 检测 hooks 规范
    'react-hooks/exhaustive-deps': 'warn', // hooks 依赖项提示
    'prettier/prettier': 'warn', // 🚨 prettier 格式问题会以警告提示
  },
};
