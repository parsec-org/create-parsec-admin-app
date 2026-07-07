# GitHub Copilot Instructions

## 项目类型

UmiJS v4 + Ant Design Pro Components 中后台管理系统模板

## 技术栈

- **框架**: UmiJS v4 (Max)
- **UI 库**: Ant Design v6 + Pro Components
- **状态管理**: ahooks + vstores
- **语言**: TypeScript 6
- **样式**: Less + CSS Modules

## 开发工作流

### 1. 安装 & 启动
```bash
yarn install
yarn dev
```

### 2. 代码规范
- 运行 `yarn lint` 自动修复格式问题
- 提交前确保 lint 通过
- 使用 Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`

### 3. 关键限制
- **Node.js 22+**: 使用 `qs.stringify()` 而非 `node:querystring`
- **国际化**: 所有显示文本使用 `src/locales/zh-CN.ts` 中的 key
- **API 生成**: 使用 `yarn openapi` 生成服务代码

## 快速参考

| 操作 | 命令/路径 |
|------|----------|
| 添加页面 | `src/pages/` + `config/routes.ts` |
| API 服务 | `src/services/` (通过 openapi 生成) |
| 组件导出 | `src/components/index.ts` |
| 国际化 | `src/locales/zh-CN.ts` |

## 文档

详细文档见 [CONTRIBUTING.md](../CONTRIBUTING.md)
