# routes 配置说明

路由定义在 `config/routes.ts` 中，使用 UmiJS v4 标准路由数组格式。菜单名称通过 `name` 字段自动映射到 `src/locales/` 中的国际化文本（如 `name: 'home'` → `menu.home`）。

## 当前路由表

```ts
// config/routes.ts
export default [
  {
    path: '/auth',
    layout: false,
    routes: [
      { name: 'login', path: '/auth/login', component: './Auth/Login' },
      { name: 'reset-password', path: '/auth/forget-password', component: './Auth/ForgotPassword' },
    ],
  },
  { name: 'home', path: '/home', icon: 'HomeOutlined', component: './Home' },
  { name: 'access', path: '/access', icon: 'SafetyOutlined', component: './Access', hideInMenu: true },
  { name: 'products', path: '/products', icon: 'ProductOutlined', component: './Products' },
  { name: 'orders', path: '/orders', icon: 'FileDoneOutlined', component: './Orders' },
  { name: 'users', path: '/users', icon: 'TeamOutlined', component: './Users' },
  { name: 'managers', path: '/managers', icon: 'UserOutlined', component: './Managers' },
  {
    name: 'profile',
    path: '/profile',
    icon: 'IdcardOutlined',
    routes: [
      { path: '/profile', redirect: '/profile/account' },
      { path: '/profile/account', component: './Me/Account', name: 'account', exact: true },
      { path: '/profile/change-password', component: './Me/ResetPassword', name: 'change-password', exact: true },
      { path: '/profile/settings', component: './Me/ResetPassword', name: 'settings', exact: true },
    ],
  },
  { path: '/', redirect: '/home' },
  { path: '*', layout: false, component: './404' },
];
```

## 路由配置属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 菜单名称，对应 `locales` 中的 `menu.xxx` |
| `path` | `string` | 路由路径 |
| `icon` | `string` | Ant Design 图标名（如 `HomeOutlined`） |
| `component` | `string` | 页面组件路径（相对于 `src/pages`） |
| `layout` | `boolean` | 设为 `false` 则不使用 Layout（如登录页、404） |
| `routes` | `object[]` | 子路由配置，支持层级嵌套 |
| `hideInMenu` | `boolean` | 在菜单中隐藏改项，常用于无需菜单显示的功能页 |
| `access` | `string` | 权限控制，对应 `access.ts` 中的权限函数名 |
| `redirect` | `string` | 重定向路径 |
| `exact` | `boolean` | 精确匹配 |

### 父子路由

UmiJS v4 支持父子路由嵌套结构，适用于需要聚合展示的子菜单场景：

```ts
{
  name: 'profile',
  icon: 'IdcardOutlined',
  path: '/profile',
  routes: [
    { path: '/profile', redirect: '/profile/account' },
    { path: '/profile/account', component: './Me/Account', name: 'account' },
    { path: '/profile/settings', component: './Me/Settings', name: 'settings' },
  ],
}
```

- 父路由的 `name` 和 `icon` 控制菜单中的聚合展示
- 子路由的 `name` 对应 `locales` 中的子菜单文案（如 `menu.profile.account`）
- 父路由建议设置 `redirect` 指向默认子路由

### name 字段

- Type: `string`
- 菜单上显示的名称通过 locales 映射，没有则不展示该菜单
- 注意：子路由的 name 会自动拼接父路由前缀（如 `profile.account` → `menu.profile.account`）

### icon 字段

- Type: `string`
- 菜单上显示的 Ant Design 图标，支持以下格式：

```ts
// <HomeOutlined /> 线框风格
icon: 'home';            // outlined 简写
icon: 'HomeOutlined';    // outlined 全名

// <HomeFilled /> 实底风格
icon: 'HomeFilled';

// <HomeTwoTone /> 双色风格
icon: 'HomeTwoTone';
```

### 无 Layout 页面

```ts
// 登录页、404 等不需要 Layout 的页面
{
  layout: false,
  routes: [
    { name: 'login', path: '/auth/login', component: './Auth/Login' },
  ],
}
```

## 添加新路由

1. 在 `src/pages/` 下创建页面组件
2. 在 `config/routes.ts` 中添加路由配置
3. 在 `src/locales/zh-CN.ts` 和 `en-US.ts` 中添加对应的 `menu.xxx` 国际化文本

## 相关文档

- [UmiJS v4 路由文档](https://umijs.org/docs/guides/routes)
- [@umijs/max Layout 菜单配置](https://umijs.org/docs/max/layout-menu)
- [Ant Design Icons](https://ant.design/components/icon-cn)
