## routes 配置说明

```ts
// config/route.ts
export const routes: IBestAFSRoute[] = [
  {
    path: '/welcome',
    component: 'IndexPage',
    name: '欢迎', // 兼容此写法
    icon: 'testicon',
    // 更多功能查看
    // https://beta-pro.ant.design/docs/advanced-menu
    // ---
    // 新页面打开
    target: '_blank',
    // 不展示顶栏
    headerRender: false,
    // 不展示页脚
    footerRender: false,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
    // 权限配置，需要与 plugin-access 插件配合使用
    access: 'canRead',
    // 隐藏子菜单
    hideChildrenInMenu: true,
    // 隐藏自己和子菜单
    hideInMenu: true,
    // 在面包屑中隐藏
    hideInBreadcrumb: true,
    // 子项往上提，仍旧展示,
    flatMenu: true,
  },
];
```

### name

- Type: `string`

  > 菜单上显示的名称，没有则不展示该菜单。

### icon

- Type: `string`

  > 菜单上显示的 antd 的 icon，为了按需加载 layout 插件会帮你自动转化为 Antd icon 的 dom。支持类型可以在 antd icon 中找到。示例：

```ts
// <HomeOutlined /> 线框风格
icon: 'home'; // outlined 线框风格可简写
icon: 'HomeOutlined';

// <HomeFilled /> 实底风格
icon: 'HomeFilled';

// <HomeTwoTone /> 双色风格
icon: 'HomeTwoTone';
```

更多配置[查看](https://umijs.org/docs/max/layout-menu)
