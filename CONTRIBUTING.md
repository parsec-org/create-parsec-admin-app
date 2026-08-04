# 开发指南

## 环境要求

- Node.js >= 20.17.0
- Yarn（推荐）或 pnpm

## 快速开始

```bash
# 安装依赖
yarn install

# 启动开发服务器（默认端口 8000）
yarn dev

# 生产构建
yarn build

# 代码检查 & 自动修复
yarn lint

# OpenAPI 代码生成
yarn openapi
```

## 开发环境说明

### 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `APP_API_HOST` | API 服务器地址（开发时指向 Mock 服务或本地后端） | `/api` |
| `APP_STORAGE_PREFIX` | localStorage 缓存前缀 | `parsec-admin` |
| `UMI_ENV` | 环境标识 | `development` / `staging` / `production` |

### 多环境配置

- `config/config.ts` — 基础配置（所有环境共享）
- `config/config.staging.ts` — 预发布环境覆盖配置
- `config/config.production.ts` — 生产环境覆盖配置

通过环境变量 `UMI_ENV` 切换环境。

### Mock 数据

`mock/` 目录下的文件在开发环境自动生效：

- `mock/common.ts` — 通用接口（验证码等）
- `mock/userAPI.ts` — 用户相关接口（用户列表、角色列表等）

## Git 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范，提交时自动通过 commitlint 校验。

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

### 自动 Hooks

提交时自动运行：

1. **pre-commit**：ESLint 检查 & 自动修复
2. **commit-msg**：提交信息格式验证

### 跳过验证（不推荐）

```bash
SKIP_SIMPLE_GIT_HOOKS=1 git commit -m "xxx"
```

## 代码规范

### ESLint

使用 `@antfu/eslint-config` 配置：

- TypeScript 类型检查
- React Hooks 规则
- 代码格式化
- CSS/LESS 格式化

### 编码约定

- **样式前缀**：Antd 组件类名前缀为 `parsec`（非 `ant`），所有样式覆盖使用 `.parsec-` 前缀
- **国际化**：所有用户可见文本使用 `locales/` 目录中的配置，禁止硬编码中文
- **Token 管理**：通过 `storage.get(TOKEN)` / `storage.set(TOKEN, value)` 操作，禁止直接使用 `localStorage`
- **URL 参数**：使用 `qs.stringify()` 处理查询参数
- **组件导出**：公共组件在 `src/components/index.ts` 统一导出

## 项目结构

```
├── config/                # Umi 配置文件
│   ├── config.ts          # 基础配置
│   ├── config.staging.ts  # 预发布环境配置
│   ├── config.production.ts # 生产环境配置
│   └── routes.ts          # 路由配置
├── mock/                  # Mock 数据（开发环境自动启用）
├── docs/                  # 开发文档
├── src/
│   ├── app.tsx            # 运行时配置（layout / initialState / request / rootContainer）
│   ├── access.ts          # 权限定义
│   ├── requestConfig.ts   # 请求拦截器与错误处理
│   ├── global.less         # 全局 Less 样式
│   ├── global.style.ts     # 全局 css-in-js 样式
│   ├── loading.tsx         # 全局 Loading 组件
│   ├── assets/            # 静态资源
│   ├── components/        # 公共组件
│   ├── constants/         # 常量定义
│   ├── libs/              # 公共库（Context Provider）
│   ├── locales/           # 国际化（zh-CN / en-US）
│   ├── models/            # 全局状态
│   ├── pages/             # 页面组件
│   ├── services/          # API 服务
│   └── utils/             # 工具函数（storage / format）
├── eslint.config.js       # ESLint 配置
├── commitlint.config.js   # Commitlint 配置
├── tsconfig.json          # TypeScript 配置
└── typings.d.ts           # 全局类型声明
```

## 添加新功能流程

### 1. 添加新页面

1. 在 `src/pages/` 下创建页面目录和组件
2. 在 `config/routes.ts` 添加路由配置
3. 在 `src/locales/zh-CN.ts` 和 `en-US.ts` 添加菜单国际化文本

### 2. 添加 API 服务

```bash
# 更新 OpenAPI 定义后重新生成
yarn openapi
```

或手动在 `src/services/` 下添加服务文件。

### 3. 添加全局状态

在 `src/models/` 下创建 hook 文件，通过 `useModel` 使用。

### 4. 添加公共组件

在 `src/components/` 下创建组件，并在 `src/components/index.ts` 中导出。

## 相关链接

- [UmiJS v4 文档](https://umijs.org/docs)
- [@umijs/max 文档](https://umijs.org/docs/max/introduce)
- [Ant Design v6 文档](https://ant.design/index-cn)
- [Ant Design Pro Components](https://procomponents.ant.design/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
