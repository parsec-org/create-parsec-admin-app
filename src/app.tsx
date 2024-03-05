import logo from '@/assets/parsec-logo.svg';
import { RightContent } from '@/components';
import { TOKEN } from '@/constants';
import { getAuthRules } from '@/services';
import storage from '@/utils/storage';
import type {
  Settings as LayoutSettings,
  MenuDataItem,
} from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import dayjs from 'dayjs';
import NProgress from 'nprogress';
import { requestConfig } from './requestConfig';

dayjs.locale('zh-cn'); // use loaded locale globally

const loginPath = '/auth/login';

/**
 * layout 默认设置
 */
const defaultSettings: Partial<LayoutSettings> = {
  fixSiderbar: true,
  fixedHeader: true,
  layout: 'mix',
  contentWidth: 'Fluid',
  navTheme: 'light',
  splitMenus: false,
  colorPrimary: '#1677FF',
  siderMenuType: 'sub',
};

// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: Partial<API.AdminUserVo & { name?: string; avatar?: string }>;
  loading?: boolean;
  fetchUserInfo?: () => Promise<
    Partial<API.AdminUserVo & { name?: string; avatar?: string }> | undefined
  >;
}> {
  const fetchUserInfo = async () => {
    try {
      // TODO: 模拟登录正式请删除
      // const { data } = await getAuthMe({});
      const data = {
        adminName: 'adminName',
        realName: 'realName',
        loginName: 'loginName',
      };
      return {
        ...data,
        name: data?.adminName || data?.realName || data?.loginName || '',
        avatar: undefined,
      };
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  if (!storage.get(TOKEN)) {
    history.push(loginPath);
    return {
      settings: defaultSettings,
      fetchUserInfo,
    };
  }
  // 如果不是登录页面，执行
  if (window.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    settings: defaultSettings,
    fetchUserInfo,
  };
}

export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    logo: <img src={logo} alt="parsec" />,
    title: 'parsec-admin-next',
    menu: {
      type: 'sub',
      collapsedShowGroupTitle: false,
      locale: false,
      request: async (params, defaultMenuData) => {
        // TODO: 如果需要根据角色处理菜单根据下面的代码进行操作即可
        return Promise.resolve<MenuDataItem[]>([...defaultMenuData]);
        // 只有超级管理员才返回默认的菜单数据
        if (initialState?.currentUser?.adminName === 'admin') {
          return Promise.resolve<MenuDataItem[]>([...defaultMenuData]);
        }
        const menuAuth = await getAuthRules();
        // 这样操作只是为了继续使用 umi 提供的图标映射
        const meRoute = defaultMenuData.find((x) => x.path === '/me');
        const currentUserMenu: MenuDataItem[] =
          menuAuth.map((role) => {
            return defaultMenuData.find(
              (x) => x.path === role.route,
            ) as MenuDataItem;
          }) || [];
        return Promise.resolve<MenuDataItem[]>([
          ...currentUserMenu.concat([
            meRoute,
            {
              path: '/',
              redirect: menuAuth ? menuAuth[0].route : '/welcome',
            },
            {
              path: '*',
              layout: false,
              component: './404',
            },
          ]),
        ]);
      },
    },
    menuFooterRender: (props) => {
      if (props?.collapsed) return undefined;
      return (
        <div
          style={{
            textAlign: 'left',
            paddingBlockStart: 12,
          }}
        >
          <div>© 2024 Made with love</div>
          <div>by Parsec.com.cn</div>
        </div>
      );
    },
    // avatarProps: {
    //   src: initialState?.currentUser?.avatar,
    //   size: 'small',
    //   title: initialState?.currentUser?.adminName,
    // },
    rightContentRender: (headerProps) => (
      <RightContent showAvatarDropdown headerProps={headerProps} />
    ),
    bgLayoutImgList: [
      {
        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    onPageChange: (location) => {
      NProgress.done();
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location?.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {process.env.UMI_ENV !== 'production' &&
            !props.location?.pathname?.includes('/login') && (
              <SettingDrawer
                disableUrlParams
                enableDarkTheme
                settings={initialState?.settings}
                onSettingChange={(settings) => {
                  console.log('settings', settings);
                  setInitialState((preInitialState) => ({
                    ...preInitialState,
                    settings,
                  }));
                }}
              />
            )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = { ...requestConfig };

/**
 * 在初始加载和路由切换时做一些事情。
 * 比如用于做埋点统计，
 * @param location
 * @param clientRoutes
 * @param routes
 * @param action
 */
export const onRouteChange = ({
  location,
  clientRoutes,
  routes,
  action,
}: any) => {
  NProgress.start();
  console.log('onRouteChange', { location, clientRoutes, routes, action });
};
