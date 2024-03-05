import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  define: {
    APP_STORAGE_PREFIX: 'parsec-admin', // 缓存前缀
    APP_API_HOST: 'http://127.0.0.1:3000', // mock 地址一般是 apifox 本地测试环境地址
  },
  /**
   * @name 快速热更新配置
   * @description 一个不错的热更新组件，更新时可以保留 state
   */
  fastRefresh: true,
  //============== 以下都是max的插件配置 ===============
  /**
   * @name antd 插件
   * @description 内置了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {
    // configProvider
    configProvider: {},
    // babel-plugin-import
    import: false,
    // less or css, default less
    style: 'less',
    // shortcut of `configProvider.theme`
    // use to configure theme token, antd v5 only
    theme: {},
  },
  /**
   * @name 权限插件
   * @description 基于 initialState 的权限插件，必须先打开 initialState
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  /**
   * @name 数据流插件
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * 一个全局的初始数据流，可以用它在插件之间共享数据
   * @description 可以用来存放一些全局的数据，比如用户信息，或者一些全局的状态，全局初始状态在整个 Umi 项目的最开始创建。
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name 网络请求配置
   * @description 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name layout 插件
   * @doc https://umijs.org/docs/max/layout-menu
   */
  layout: {
    title: 'parsec-admin-next',
    locale: false, // 默认开启，如无需菜单国际化可关闭
  },
  theme: {
    // 自定义antd组件的全局样式
    'primary-color': '#1677ff', // 全局主色
    'link-color': '#1677ff', // 链接色
    'border-radius-base': '8px', // 组件/浮层圆角
    'checkbox-border-radius': '4px', // checkbox 圆角
  },
  routes: routes,
  npmClient: 'yarn',
  clickToComponent: {},
  metas: [
    {
      name: 'keywords',
      content: 'parsec,parsec-admin,parsec-admin-next,秒差距中后台管理系统',
    },
    { name: 'description', content: '秒差距中后台管理系统.' },
  ],
  // links: [{href: 'https://unpkg.com/nprogress@0.2.0/nprogress.css', rel: 'stylesheet', type:"text/css" }] // 样式需要重写所以禁用了
  scripts: [],
  favicons: ['/assets/parsec-logo.svg'],
});
