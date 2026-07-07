export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 类型枚举: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档变更
        'style', // 代码格式（不影响功能）
        'refactor', // 重构（不是修复也不是新增功能）
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建系统或外部依赖变化
        'ci', // CI 配置变更
        'chore', // 其他修改（不修改 src 或 test）
        'revert', // 回滚
        'wip', // 开发中（可选）
      ],
    ],
    // type 大小写不敏感
    'type-case': [2, 'always', 'lower-case'],
    // type 后必须跟冒号和空格
    'type-empty': [2, 'never'],
    // 提交信息主体不能为空
    'subject-empty': [2, 'never'],
    // 主体以小写开头
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    // 每行长度限制
    'body-max-line-length': [2, 'always', 100],
  },
  prompt: {
    messages: {
      type: '请选择提交类型:',
      customType: '自定义提交类型:',
      subject: '请简要描述提交 (必填):\n',
      body: '请提供更详细的描述 (可选):\n',
      breaking: '列出任何 Breaking Changes (可选):\n',
      footerPrefixesSelect: '选择需要关联的 issue 类型:',
      customFooterPrefix: '输入自定义的前缀:',
      footer: '请输入关联的 issue (可选):\n',
      generatingByInquirer: '正在生成提交信息...',
      typeSelectOrDescribe: '选择提交类型或描述提交',
    },
    types: [
      { value: 'feat', name: 'feat:     ✨ 新功能', description: '引入新功能' },
      { value: 'fix', name: 'fix:      🐛 修复错误', description: '修复 bug' },
      { value: 'docs', name: 'docs:     📝 文档变更', description: '仅文档变更' },
      { value: 'style', name: 'style:    💄 代码格式', description: '不影响代码含义的变更' },
      { value: 'refactor', name: 'refactor: ♻️  重构', description: '既不是修复也不是新增功能的代码变更' },
      { value: 'perf', name: 'perf:     ⚡ 性能优化', description: '提升性能的代码变更' },
      { value: 'test', name: 'test:     ✅ 测试', description: '添加或修正测试' },
      { value: 'build', name: 'build:    📦️ 构建', description: '影响构建系统或外部依赖的变更' },
      { value: 'ci', name: 'ci:       🔧 CI 配置', description: 'CI 配置和脚本的变更' },
      { value: 'chore', name: 'chore:    🔨 其他', description: '不修改 src 或 test 的变更' },
      { value: 'revert', name: 'revert:   ⏪ 回滚', description: '回滚之前的提交' },
    ],
  },
};
