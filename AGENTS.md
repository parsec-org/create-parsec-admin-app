# AI Coding Agent Instructions

## 项目概述

基于 **UmiJS v4 (@umijs/max)** + **Ant Design v6** + **Ant Design Pro Components** 的中后台管理系统模板。

| 技术栈 | 说明                                                |
|--------|-----------------------------------------------------|
| 框架 | UmiJS v4 (@umijs/max)                               |
| UI | Ant Design v6 + Ant Design Pro Components           |
| 语言 | TypeScript                                          |
| 状态管理 | @umijs/max model (基于 React Context + hook)        |
| 请求库 | @umijs/max request (基于 axios + ahooks useRequest) |
| 国际化 | @umijs/max locale (zh-CN / en-US)                   |
| 样式方案 | Less + antd-style (css-in-js) + CSS Modules         |
| 包管理器 | pnpm                                                |
| 代码规范 | @antfu/eslint-config + Conventional Commits         |

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发模式（默认启用 mock，访问 http://localhost:8000）
pnpm run dev

# 生产构建
pnpm run build

# 代码检查 & 自动修复
pnpm run lint

# OpenAPI 代码生成
pnpm run openapi
```

## 项目结构

```
src/
├── app.tsx                # 运行时配置入口（layout、initialState、request、rootContainer）
├── access.ts              # 权限定义（基于 initialState）
├── requestConfig.ts       # 请求配置（拦截器、错误处理、token 管理）
├── global.less             # 全局 Less 样式（NProgress、登录页、地图容器等）
├── global.style.ts         # 全局 antd-style（css-in-js）样式
├── loading.tsx             # 全局 loading 组件
├── pages/                  # 页面，按路由模块组织
│   ├── 404.tsx             # 404 错误页面
│   ├── Auth/               # 认证相关页面
│   │   ├── Login/          # 登录页（layout=false）
│   │   └── ForgotPassword/ # 忘记密码页（layout=false）
│   ├── Home/               # 首页仪表盘
│   ├── Access/             # 权限页（hideInMenu）
│   ├── Products/           # 产品管理
│   ├── Orders/             # 订单管理
│   ├── Users/              # 用户管理
│   ├── Managers/           # 管理员管理
│   └── Me/                 # 个人中心
│       ├── Account/        # 我的账号
│       └── ResetPassword/  # 修改密码 & 个人设置
├── components/              # 公共组件
│   ├── index.ts            # 组件统一导出入口
│   ├── ActionsWrap/        # 操作按钮组（超过3个自动折叠）
│   ├── CreateForm/         # 新建表单 Modal 封装
│   ├── ExportExcelButton/   # Excel 导出按钮
│   ├── Guide/              # 首页引导组件
│   ├── Layout/             # 布局相关（含 AvatarDropdown 逻辑）
│   ├── LinkButton/         # 链接按钮
│   ├── ProFormCropUpload/  # 图片裁剪上传组件
│   ├── ProFormEditor/      # 富文本编辑器（含 Editor 核心）
│   └── RightContent/       # 顶部右侧内容区（语言切换、帮助、头像下拉）
├── services/               # API 服务
│   ├── index.ts            # 服务导出入口
│   └── common/             # 通用 API（OpenAPI 生成）
├── models/                 # 全局状态（dva-style hooks）
│   └── global.ts           # 全局用户状态（name, setName）
├── utils/                  # 工具函数
│   ├── index.ts            # 生命周期工具（waitTime, DateFormats 等）
│   ├── format.ts           # 格式化工具（身份证、手机号、验证等）
│   └── storage.ts          # 本地存储封装（基于 vstores）
├── constants/              # 常量定义
│   └── index.ts            # 默认名称、Token Key、状态映射、颜色列表等
├── libs/                   # 公共库
│   └── context/            # React Context Provider（modal, message 全局注入）
├── locales/                # 国际化文件
│   ├── zh-CN.ts            # 中文（默认）
│   └── en-US.ts            # 英文
└── assets/                 # 静态资源（图片、SVG 等）

config/
├── config.ts               # Umi 主配置（antd、locale、layout、theme 等）
├── config.production.ts     # 生产环境覆盖配置
├── config.staging.ts       # 预发布环境覆盖配置
├── routes.ts               # 路由配置
└── routes.md               # 路由配置说明文档

mock/
├── common.ts               # 通用 mock（验证码等）
└── userAPI.ts              # 用户相关 mock（用户列表、角色列表等）

docs/
├── api-conventions.md      # API 规范文档
└── component-patterns.md   # 组件编写规范文档
```

## 核心架构说明

### 1. 全局变量注入

Umi 通过 `define` 配置注入编译时常量，这些常量可在任意文件中直接使用：

- **`APP_API_HOST`** — API 前缀地址，各环境配置不同。非 `http` 开头的请求路径会自动拼接此前缀
- **`APP_STORAGE_PREFIX`** — 本地存储 key 前缀，默认 `parsec-admin`
- **`UMI_ENV`** — 当前环境标识（development / staging / production）

### 2. Antd 自定义前缀

项目对 Antd 组件使用了自定义 CSS 前缀，**所有样式覆盖都需要使用 `parsec` 而非 `ant`**：

```less
/* 错误写法 */
.ant-btn { }

/* 正确写法 */
.parsec-btn { }
```

类名前缀可通过 `global.less` 中的 `@primary-color` 等 Less 变量获取主题色。

### 3. 请求流程

```
页面调用 API
  → requestInterceptors（校验并拼接 APP_API_HOST、注入 Authorization token）
    → 发起 HTTP 请求
      → responseInterceptors（提取响应头 token 并存储）
        → errorThrower（检查 success 字段，失败抛 BizError）
          → errorHandler（统一错误提示，403 清缓存跳登录）
```

关键细节：
- Token 通过 `vstores` 存储在 localStorage，key 为 `parsec-admin-token`
- 403 响应会弹出 Modal，确认后清除缓存并跳转登录页（保留 redirect 参数）
- 请求超时时间：15 秒
- URL 查询参数使用 `qs.stringify()` 处理

### 4. 认证与授权

#### 认证流程 (app.tsx)

```
getInitialState()
  ├── 无 token → 跳转 /auth/login
  ├── 有 token + 非登录页 → 调 fetchUserInfo() 获取用户信息
  └── 有 token + 是登录页 → 返回空 currentUser
```

**注意**：当前 `fetchUserInfo()` 使用的是模拟数据，正式上线需替换为真实 API 调用。

#### 权限控制 (access.ts)

基于 `initialState` 定义权限函数，在路由 `access` 字段中使用：

```typescript
// src/access.ts
export default (initialState: API.UserInfo) => {
  const canSeeAdmin = !!(initialState && initialState.name !== 'dontHaveAccess');
  return { canSeeAdmin };
};
```

### 5. 样式方案

项目使用三种样式方案混合：

| 方案 | 文件 | 用途 |
|------|------|------|
| Less（全局） | `src/global.less` | 全局样式覆盖、NProgress 样式、地图容器 |
| antd-style (css-in-js) | `src/global.style.ts` | 色弱模式、表格响应式等全局样式 |
| CSS Modules | `src/pages/*/index.less` | 页面级组件样式隔离 |

### 6. 主题配置

主题色通过两套系统同步配置：

- **Antd v6 Design Token**（`antd.theme.token`）：`colorPrimary: '#2F54EB'`, `borderRadius: 6`
- **Legacy Less 变量**（`theme`）：`primary-color: '#2F54EB'`, `border-radius-base: '6px'`

两套配置需保持同步。

### 7. Layout 运行时配置 (app.tsx)

- 布局模式：`side`（侧边菜单）
- 菜单类型：`sub`（子菜单模式）
- 暗色主题支持：通过 SettingDrawer 开启
- 水印：显示当前用户名
- 菜单页脚：显示版权信息 © 2025 Parsec.com.cn
- 设置面板：仅在非生产环境且非登录页显示

### 8. RootProvider 全局注入 (src/libs/context)

通过 `rootContainer` 包裹整个应用，提供全局的 `modal` 和 `message` 实例：

```typescript
import { useRootProvider } from '@/libs/context';

const MyComponent = () => {
  const { modal, message } = useRootProvider();
  // 使用 modal.confirm / message.success 等
};
```

## 路由配置

路由定义在 `config/routes.ts`，`name` 字段会自动映射到 `locales/` 中的国际化文本（如 `name: 'home'` → `menu.home`）。

### 当前路由表

| 路由 | name | icon | 说明 |
|------|------|------|------|
| `/auth/login` | login | - | 登录页，无 layout |
| `/auth/forget-password` | reset-password | - | 忘记密码，无 layout |
| `/home` | home | HomeOutlined | 首页 |
| `/access` | access | SafetyOutlined | 权限页，隐藏菜单 |
| `/products` | products | ProductOutlined | 产品管理 |
| `/orders` | orders | FileDoneOutlined | 订单管理 |
| `/users` | users | TeamOutlined | 用户管理 |
| `/managers` | managers | UserOutlined | 管理员管理 |
| `/profile/account` | account | IdcardOutlined | 个人中心-我的账号 |
| `/profile/change-password` | change-password | - | 个人中心-修改密码 |
| `/profile/settings` | settings | - | 个人中心-个人设置 |
| `/` | - | - | 重定向到 /home |
| `*` | - | - | 404 页面 |

### 路由配置常用属性

| 属性 | 说明 |
|------|------|
| `name` | 菜单名称，对应 locales 中的 `menu.xxx` |
| `icon` | Ant Design 图标名（如 `HomeOutlined`） |
| `layout: false` | 不使用 layout（如登录页、404） |
| `hideInMenu: true` | 在菜单中隐藏 |
| `access` | 权限控制（如 `access: 'canSeeAdmin'`） |
| `redirect` | 重定向路径 |

## 常见开发模式

### 添加新页面

1. 在 `src/pages/` 下创建页面目录和组件：
   ```
   src/pages/NewModule/
   ├── index.tsx              # 页面主组件
   └── components/
       ├── CreateForm.tsx     # 新建表单弹窗
       └── UpdateForm.tsx     # 编辑表单弹窗
   ```

2. 在 `config/routes.ts` 添加路由配置：
   ```ts
   {
     name: 'new-module',
     path: '/new-module',
     icon: 'AppstoreOutlined',
     component: './NewModule',
   }
   ```

3. 在 `src/locales/zh-CN.ts` 和 `en-US.ts` 添加菜单名称：
   ```ts
   'menu.new-module': '新模块',  // zh-CN
   'menu.new-module': 'New Module',  // en-US
   ```

### 列表页标准模式

使用 ProTable + actionRef 的标准模式：

```tsx
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { useRef, useState } from 'react';

const Page: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const columns: ProColumns<API.Item>[] = [
    { title: '名称', dataIndex: 'name' },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <LinkButton key="edit">编辑</LinkButton>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Item>
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={async (params) => {
          const { data } = await getList(params);
          return { data: data?.list, success: true, total: data?.total };
        }}
      />
    </PageContainer>
  );
};
```

### 使用全局状态 (useModel)

```tsx
import { useModel } from '@umijs/max';

const { name, setName } = useModel('global');
```

### 添加新的全局 model

在 `src/models/` 下创建文件，导出一个自定义 hook：

```ts
// src/models/counter.ts
import { useState } from 'react';

function useCounter() {
  const [count, setCount] = useState(0);
  return { count, setCount };
}

export default useCounter;

// 使用
const { count, setCount } = useModel('counter');
```

### 使用全局 modal / message

```tsx
import { useRootProvider } from '@/libs/context';

const { modal, message } = useRootProvider();

modal.confirm({ title: '确认删除？' });
message.success('操作成功');
```

## 注意事项

- **Antd 类名前缀**：所有样式覆盖需使用 `.parsec-` 而非 `.ant-`
- **URL 查询参数**：使用 `qs.stringify()` 处理（Node.js 22+ 已移除 `node:querystring`）
- **国际化文本**：使用 `locales/` 目录下的文件，不要硬编码中文
- **组件导出**：公共组件必须在 `src/components/index.ts` 中统一导出
- **Token 存储**：通过 `storage.get(TOKEN)` / `storage.set(TOKEN, value)` 操作，禁止直接使用 `localStorage`
- **主题色修改**：需同时修改 `antd.theme.token` 和 `theme` 两处配置
- **OpenAPI 生成**：运行 `pnpm run openapi` 后代码生成到 `src/services/common/`
