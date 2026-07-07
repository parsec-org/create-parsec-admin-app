# Parsec Admin

基于 UmiJS v4 + Ant Design Pro Components 的中后台管理系统模板。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [UmiJS v4](https://umijs.org/) (Max) |
| UI 库 | [Ant Design v6](https://ant.design/) + [Pro Components](https://procomponents.ant.design/) |
| 状态管理 | ahooks + vstores |
| 语言 | TypeScript 6 |
| 样式 | Less + CSS Modules |
| 构建 | esbuild (UmiJS 内置) |

## 快速开始

```bash
# 安装依赖
yarn install

# 启动开发服务器
yarn dev

# 构建生产版本
yarn build
```

## 项目结构

```
├── config/                 # 配置文件
│   ├── config.ts           # 开发环境配置
│   ├── config.staging.ts  # 预发布环境配置
│   ├── config.production.ts # 生产环境配置
│   └── routes.ts           # 路由配置（请根据页面的具体路由进行配置）
├── mock/                   # Mock 数据
├── public/                 # 静态资源
├── src/
│   ├── assets/             # 图片、字体等资源
│   ├── components/         # 公共组件
│   │   ├── ActionsWrap/    # 操作按钮组（自动折叠）
│   │   ├── CreateForm/     # 新建表单 Modal
│   │   ├── ExportExcelButton/ # Excel 导出
│   │   ├── Layout/         # 布局组件
│   │   ├── LinkButton/     # 链接按钮
│   │   ├── MoreDropdown/   # 更多下拉菜单
│   │   ├── ProFormCropUpload/ # 图片裁剪上传
│   │   ├── ProFormEditor/  # 富文本编辑器
│   │   └── RightContent/   # 右侧内容区
│   ├── constants/          # 常量定义
│   ├── locales/            # 国际化
│   ├── models/             # 状态管理
│   ├── pages/              # 页面 （请根据项目的具体页面功能进行配置）
│   │   ├── Auth/           # 认证（登录、重置密码）
│   │   ├── Home/           # 首页
│   │   ├── Users/          # 用户管理
│   │   ├── Products/       # 产品管理
│   │   ├── Orders/         # 订单管理
│   │   ├── Managers/       # 管理员管理
│   │   ├── Me/             # 个人中心
│   │   └── Table/           # 通用表格页
│   ├── services/           # API 服务
│   ├── utils/              # 工具函数
│   ├── app.tsx             # 应用入口配置
│   ├── access.ts           # 权限配置
│   └── requestConfig.ts    # 请求配置
├── docs/                   # 开发文档
│   ├── api-conventions.md  # API 规范
│   └── component-patterns.md # 组件模式
├── AGENTS.md              # AI 代理指令
├── CONTRIBUTING.md         # 开发规范
├── eslint.config.js        # ESLint 配置
└── commitlint.config.js    # Commitlint 配置
```

## 开发命令

| 命令 | 说明 |
|------|------|
| `yarn dev` | 启动开发服务器 |
| `yarn build` | 构建生产版本 |
| `yarn build:staging` | 构建预发布版本 |
| `yarn lint` | 代码检查 & 自动修复 |
| `yarn openapi` | 生成 API 服务代码 |

## 代码规范

- **ESLint**: `@antfu/eslint-config` + 分号风格
- **Git 提交**: 使用 [Conventional Commits](https://www.conventionalcommits.org/)

```bash
# 正确的提交格式
git commit -m "feat: 添加用户管理模块"
git commit -m "fix: 修复登录页面闪退"
git commit -m "chore: 更新依赖版本"
```

## 功能特性

- 🚀 基于 UmiJS 4 的企业级架构
- 🎨 Ant Design Pro Components 高级组件
- 📦 自动导入 API 服务（OpenAPI）
- 🔐 完整的权限管理方案
- 🌐 国际化支持
- 📊 常用业务模板（用户、产品、订单管理）

## 相关文档

- [开发规范](./CONTRIBUTING.md)
- [API 规范](./docs/api-conventions.md)
- [组件模式](./docs/component-patterns.md)

## 参考资料

- [UmiJS 文档](https://umijs.org/zh-CN/docs)
- [Ant Design Pro Components](https://procomponents.ant.design/)
- [Ant Design Icons](https://ant.design/components/icon)
