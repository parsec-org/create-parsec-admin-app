import { waitTime } from '@/utils';
import { LockOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Dropdown, Spin } from 'antd';
import type { MenuProps } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import NProgress from 'nprogress';
import qs from 'qs';
import React, { useCallback } from 'react';

/**
 * 菜单点击事件参数。
 * antd v6 已用 @rc-component/menu 替换 rc-menu，不再暴露 `rc-menu/lib/interface`，
 * 这里从 antd 公开的 MenuProps 推导，避免依赖 rc 包内部路径。
 */
type MenuInfo = Parameters<NonNullable<MenuProps['onClick']>>[0];

export interface GlobalHeaderRightProps {
  menu?: boolean;
  children?: React.ReactNode;
}

async function outLogin() {
  await waitTime(2000);
  console.log('outLogin');
}
/**
 * 退出登录，并且将当前的 url 保存
 */
async function loginOut() {
  await outLogin();
  const { search, pathname } = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/auth/login' && !redirect) {
    history.replace({
      pathname: '/auth/login',
      search: qs.stringify({
        redirect: pathname + search,
      }),
    });
  }
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState(s => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
      history.push(`/me/${key}`);
      NProgress.done();
    },
    [setInitialState],
  );

  const loading = (
    <Spin
      size="small"
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    />
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'account',
            icon: <UserOutlined />,
            label: '我的账号',
          },
          {
            key: 'reset-password',
            icon: <LockOutlined />,
            label: '修改密码',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: onMenuClick,
        selectedKeys: [],
      }}
    >
      {children}
    </Dropdown>
  );
};

export default AvatarDropdown;
