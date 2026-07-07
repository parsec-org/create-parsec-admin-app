# AI Coding Agent Instructions

## 项目概述

基于 UmiJS v4 + Ant Design Pro Components 的中后台管理系统模板。

## 开发命令

```bash
# 安装依赖
yarn install

# 开发模式
yarn dev

# 生产构建
yarn build

# 代码检查 & 自动修复
yarn lint

# OpenAPI 代码生成
yarn openapi
```

## 项目结构

```
src/
├── pages/           # 页面，按路由模块组织
│   ├── Auth/        # 认证相关页面
│   ├── Home/        # 首页
│   ├── Products/    # 产品管理
│   ├── Orders/      # 订单管理
│   ├── Users/        # 用户管理
│   └── Managers/    # 管理员管理
├── components/      # 公共组件
├── services/        # API 服务（基于 OpenAPI 生成）
├── models/          # 状态管理（dva/vstores）
├── utils/           # 工具函数
├── locales/         # 国际化（en-US.ts, zh-CN.ts）
├── constants/       # 常量定义
└── assets/          # 静态资源
```

## 路由配置

路由在 `config/routes.ts` 中配置，页面组件路径对应 `src/pages/` 下的目录结构。

## 代码规范

- **ESLint**: `@antfu/eslint-config` + 分号风格
- **Git 提交**: 使用 [Conventional Commits](https://www.conventionalcommits.org/)
  - 格式: `<type>: <subject>` (如 `feat: 添加用户管理`)
  - 类型: `feat`, `fix`, `docs`, `style`, `refactor`, `chore` 等

## 常见模式

### 添加新页面

1. 在 `src/pages/` 下创建页面组件
2. 在 `config/routes.ts` 添加路由配置
3. 在 `src/locales/zh-CN.ts` 添加菜单名称

### 添加 API 服务

```bash
yarn openapi
```

服务代码生成到 `src/services/` 目录。

### 组件导出

公共组件通过 `src/components/index.ts` 统一导出。

## 注意事项

- 使用 `qs.stringify()` 处理 URL 查询参数（Node.js 22+ 已移除 `node:querystring`）
- 国际化文本使用 `locales/` 目录下的文件，不要硬编码中文
