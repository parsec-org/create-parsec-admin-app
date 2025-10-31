import { defineConfig } from '@umijs/max';
import { join } from 'node:path';
import routes from './routes';

/**
 * @name 使用公共路径
 * @description 部署时的路径，如果部署在非根目录下，需要配置这个变量
 * @doc https://umijs.org/docs/api/config#publicpath
 */
const PUBLIC_PATH: string = '/';

export default defineConfig({
  /**
   * @name 开启 hash 模式
   * @description 让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,
  publicPath: PUBLIC_PATH,
  define: {
    APP_STORAGE_PREFIX: process.env.APP_STORAGE_PREFIX || 'parsec-admin', // 缓存前缀
    APP_API_HOST: process.env.APP_API_HOST, // mock 地址一般是 apifox 本地测试环境地址
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
    configProvider: {
      prefixCls: 'parsec',
      iconPrefixCls: 'parsec-icon',
    },
    // babel-plugin-import
    import: false,
    // less or css, default less
    style: 'less',
    // shortcut of `configProvider.theme`
    // use to configure theme token, antd v5 only
    theme: {
      token: {
        // Seed Token，影响范围大
        colorPrimary: '#2F54EB',
        colorInfo: '#2F54EB',
        borderRadius: 6,
        colorLink: '#2F54EB',

        // 派生变量，影响范围小
        colorBgContainer: '#ffffff',
      },
      components: {},
    },
    // antd <App /> valid for version 5.1.0 or higher, default: undefined
    appConfig: {},
    // Transform DayJS to MomentJS
    // momentPicker: true,
    // Add StyleProvider for legacy browsers
    styleProvider: {
      hashPriority: 'high',
      legacyTransformer: true,
    },
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
    locale: true, // 默认开启，如无需菜单国际化可关闭
  },
  /**
   * @name 国际化插件
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    default: 'zh-CN',
    title: true,
    antd: true, // 如果需要 antd 组件国际化，请设置为 true
    baseSeparator: '-', // 语言和地区之间的分隔符，与文件命名一致（例如 kk-KZ）
    useLocalStorage: true, // 自动使用 localStorage 保存当前使用的语言。
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true, // 启用浏览器语言检测
  },
  theme: {
    // 自定义antd组件的全局样式
    'primary-color': '#2F54EB', // 全局主色
    'link-color': '#2F54EB', // 链接色
    'border-radius-base': '6px', // 组件/浮层圆角
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
  /**
   * @name <head> 中额外的 script
   * @description 配置 <head> 中额外的 script
   */
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: join(PUBLIC_PATH, 'scripts/loading.js'), async: true },
    { content: `//! umi version: ^4.5.0;` },
  ],
  // links: [{href: 'https://unpkg.com/nprogress@0.2.0/nprogress.css', rel: 'stylesheet', type:"text/css" }] // 样式需要重写所以禁用了
  scripts: [],
  favicons: ['/assets/parsec-logo.svg'],
  /**
   * 使用分包策略  https://umijs.org/blog/code-splitting#%E4%BD%BF%E7%94%A8%E5%88%86%E5%8C%85%E7%AD%96%E7%95%A5
   */
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
});
