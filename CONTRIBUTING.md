# 开发指南

## 环境要求

- Node.js >= 20.17.0
- pnpm / yarn

## 安装依赖

```bash
yarn install
```

## 开发命令

```bash
# 开发模式
yarn dev

# 生产构建
yarn build

# 代码检查 & 自动修复
yarn lint

# OpenAPI 代码生成
yarn openapi
```

## Git 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 提交格式

```
<type>: <subject>

[optional body]

[optional footer]
```

### 提交类型 (type)

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构（不是修复也不是新增功能） |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `build` | 构建系统或外部依赖变化 |
| `ci` | CI 配置变更 |
| `chore` | 其他修改（不修改 src 或 test） |
| `revert` | 回滚 |

### 示例

```bash
# 新功能
git commit -m "feat: 添加用户管理模块"

# 修复 bug
git commit -m "fix: 修复登录页面闪退问题"

# 带详细描述
git commit -m "feat: 添加数据导出功能

- 支持导出 Excel
- 支持导出 CSV
- 支持自定义列选择

Closes #123"

# 破坏性变更
git commit -m "feat!: 迁移到新的 API 版本

BREAKING CHANGE: 旧版 API 已废弃，请迁移到 /api/v2"
```

### 自动验证

提交时会自动运行以下检查：

1. **pre-commit hook**: ESLint 代码检查 & 自动修复
2. **commit-msg hook**: 提交信息格式验证

### 跳过验证

```bash
# 跳过所有 hooks（不推荐）
SKIP_SIMPLE_GIT_HOOKS=1 git commit -m "xxx"
```

## 代码规范

### ESLint

使用 `@antfu/eslint-config` 配置，支持：

- TypeScript 类型检查
- React Hooks 规则
- 代码格式化
- CSS/LESS/SCSS 格式化

### Commitlint

使用 `@commitlint/config-conventional` 配置：

- 强制使用 Conventional Commits 格式
- 类型必须为小写
- 主题不能为空
- 支持自定义类型列表

## 项目结构

```
├── config/          # 配置文件
├── mock/            # Mock 数据
├── public/          # 静态资源
├── src/             # 源代码
│   ├── assets/      # 资源文件
│   ├── components/  # 公共组件
│   ├── constants/   # 常量定义
│   ├── locales/     # 国际化
│   ├── models/      # 状态管理
│   ├── pages/       # 页面
│   ├── services/    # API 服务
│   └── utils/       # 工具函数
├── eslint.config.js # ESLint 配置
└── commitlint.config.js # Commitlint 配置
```

## 相关链接

- [UmiJS 文档](https://umijs.org/)
- [Ant Design Pro](https://procomponents.ant.design/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
