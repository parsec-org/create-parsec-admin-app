export default [
  {
    path: '/auth',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/auth/login',
        component: './Auth/Login',
      },
      {
        name: '重置密码',
        path: '/auth/forget-password',
        component: './Auth/ForgotPassword',
      },
    ],
  },
  {
    name: '首页',
    path: '/home',
    icon: 'HomeOutlined',
    component: './Home',
  },
  {
    name: '权限',
    path: '/access',
    icon: 'SafetyOutlined',
    component: './Access',
    hideInMenu: true,
  },
  {
    name: '产品管理',
    path: '/products',
    icon: 'ProductOutlined',
    component: './Products',
  },
  {
    name: '订单管理',
    path: '/orders',
    icon: 'FileDoneOutlined',
    component: './Orders',
  },
  {
    name: '用户管理',
    path: '/users',
    icon: 'TeamOutlined',
    component: './Users',
  },
  {
    name: '管理员管理',
    path: '/managers',
    icon: 'UserOutlined',
    component: './Managers',
  },
  {
    path: '/reset-password',
    component: './Me/ResetPassword',
    name: '修改密码',
    hideInMenu: true,
  },
  {
    name: '我的账号',
    path: '/me',
    icon: 'IdcardOutlined',
    routes: [
      { path: '/me', redirect: '/me/account' },
      {
        path: '/me/account',
        component: './Me/Account',
        name: '我的账号',
        exact: true,
      },
      {
        path: '/me/reset-password',
        component: './Me/ResetPassword',
        name: '修改密码',
        exact: true,
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
