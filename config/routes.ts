export default [
  {
    path: '/auth',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/auth/login',
        component: './Auth/Login',
      },
      {
        name: 'reset-password',
        path: '/auth/forget-password',
        component: './Auth/ForgotPassword',
      },
    ],
  },
  {
    name: 'home',
    path: '/home',
    icon: 'HomeOutlined',
    component: './Home',
  },
  {
    name: 'access',
    path: '/access',
    icon: 'SafetyOutlined',
    component: './Access',
    hideInMenu: true,
  },
  {
    name: 'products',
    path: '/products',
    icon: 'ProductOutlined',
    component: './Products',
  },
  {
    name: 'orders',
    path: '/orders',
    icon: 'FileDoneOutlined',
    component: './Orders',
  },
  {
    name: 'users',
    path: '/users',
    icon: 'TeamOutlined',
    component: './Users',
  },
  {
    name: 'managers',
    path: '/managers',
    icon: 'UserOutlined',
    component: './Managers',
  },
  {
    name: 'profile',
    path: '/profile',
    icon: 'IdcardOutlined',
    routes: [
      { path: '/profile', redirect: '/profile/account' },
      {
        path: '/profile/account',
        component: './Me/Account',
        name: 'account',
        exact: true,
      },
      {
        path: '/profile/change-password',
        component: './Me/ResetPassword',
        name: 'change-password',
        exact: true,
      },
      {
        path: '/profile/settings',
        component: './Me/ResetPassword',
        name: 'settings',
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
