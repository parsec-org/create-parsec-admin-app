# Parsec Admin

基于 UmiJS v4 (@umijs/max) + Ant Design v5 + Ant Design Pro Components 的中后台管理系统模板。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [UmiJS v4](https://umijs.org/) (@umijs/max) |
| UI 库 | [Ant Design v5](https://ant.design/) + [Pro Components](https://procomponents.ant.design/) |
| 状态管理 | @umijs/max model + vstores |
| 语言 | TypeScript |
| 样式 | Less + antd-style (css-in-js) + CSS Modules |
| 构建 | esbuild (UmiJS 内置) |

## 快速开始

```bash
# 安装依赖
yarn install

# 启动开发服务器（默认端口 8000，自动启用 mock）
yarn dev

# 构建生产版本
yarn build

# 构建预发布版本
yarn build:staging
```

## 项目结构

```
├── config/                  # 配置文件
│   ├── config.ts            # 基础配置
│   ├── config.staging.ts    # 预发布环境配置
│   ├── config.production.ts # 生产环境配置
│   ├── routes.ts            # 路由配置
│   └── routes.md            # 路由配置说明
├── mock/                    # Mock 数据（开发环境自动启用）
├── docs/                    # 开发文档
│   ├── api-conventions.md   # API 规范
│   └── component-patterns.md # 组件模式
├── src/
│   ├── app.tsx              # 运行时配置（layout / initialState / request）
│   ├── access.ts            # 权限配置
│   ├── requestConfig.ts     # 请求拦截器与错误处理
│   ├── global.less           # 全局 Less 样式
│   ├── global.style.ts       # 全局 css-in-js 样式
│   ├── loading.tsx           # 全局 Loading 组件
│   ├── assets/              # 图片、字体等资源
│   ├── components/          # 公共组件
│   │   ├── ActionsWrap/     # 操作按钮组（自动折叠）
│   │   ├── CreateForm/      # 新建表单 Modal
│   │   ├── ExportExcelButton/ # Excel 导出
│   │   ├── Guide/           # 首页引导组件
│   │   ├── Layout/          # 布局组件
│   │   ├── LinkButton/      # 链接按钮
│   │   ├── ProFormCropUpload/ # 图片裁剪上传
│   │   ├── ProFormEditor/   # 富文本编辑器
│   │   └── RightContent/    # 右侧内容区
│   ├── constants/           # 常量定义
│   ├── libs/                # 公共库（Context Provider）
│   ├── locales/             # 国际化（zh-CN / en-US）
│   ├── models/              # 全局状态
│   ├── pages/               # 页面
│   │   ├── 404.tsx          # 404 页面
│   │   ├── Auth/            # 认证（登录、忘记密码）
│   │   ├── Home/            # 首页仪表盘
│   │   ├── Access/          # 权限页面
│   │   ├── Products/        # 产品管理
│   │   ├── Orders/          # 订单管理
│   │   ├── Users/           # 用户管理
│   │   ├── Managers/        # 管理员管理
│   │   └── Me/              # 个人中心
│   ├── services/            # API 服务（OpenAPI 生成）
│   └── utils/               # 工具函数（storage / format）
├── AGENTS.md                # AI 代理指令
├── CONTRIBUTING.md           # 开发规范
├── eslint.config.js          # ESLint 配置
├── commitlint.config.js      # Commitlint 配置
└── tsconfig.json             # TypeScript 配置
```

## 开发命令

| 命令 | 说明 |
|------|------|
| `yarn dev` | 启动开发服务器 |
| `yarn build` | 构建生产版本 |
| `yarn build:staging` | 构建预发布版本 |
| `yarn lint` | 代码检查 & 自动修复 |
| `yarn openapi` | 生成 API 服务代码 |

## 核心特性

- **UmiJS v4 Max**：企业级架构，集成路由、请求、国际化、权限等
- **Antd v5 Design Token**：基于 Design Token 的主题定制，自定义 `parsec` 类名前缀
- **Ant Design Pro Components**：ProTable、ProForm、PageContainer 等高级组件
- **OpenAPI 代码生成**：自动生成 API 服务 TypeScript 代码
- **完整认证授权**：Token 拦截、403 处理、菜单权限控制
- **国际化**：zh-CN / en-US 双语言支持
- **多环境配置**：development / staging / production
- **代码分包**：granularChunks 策略优化加载性能

## 代码规范

- **ESLint**: `@antfu/eslint-config` + 分号风格
- **Git 提交**: 使用 [Conventional Commits](https://www.conventionalcommits.org/)

```bash
# 正确的提交格式
git commit -m "feat: 添加用户管理模块"
git commit -m "fix: 修复登录页面闪退"
git commit -m "chore: 更新依赖版本"
```

## 相关文档

- [开发指南](./CONTRIBUTING.md)
- [API 规范](./docs/api-conventions.md)
- [组件模式](./docs/component-patterns.md)
- [AI Agent 指令](./AGENTS.md)

## 参考资料

- [UmiJS v4 文档](https://umijs.org/docs)
- [@umijs/max 文档](https://umijs.org/docs/max/introduce)
- [Ant Design v5](https://ant.design/index-cn)
- [Ant Design Pro Components](https://procomponents.ant.design/)
- [Ant Design Icons](https://ant.design/components/icon-cn)
