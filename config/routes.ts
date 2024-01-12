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
  },{
    name: '数据列表',
    path: '/table',
    icon: 'TableOutlined',
    component: './Table',
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
