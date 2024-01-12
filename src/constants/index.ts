import type { ListToolBarMenuItem } from '@ant-design/pro-table/es/components/ListToolBar/HeaderMenu';

export const DEFAULT_NAME = '秒差距中后台管理系统';
export const TOKEN = 'token';
export const LOGIN_ROLE = 'login_role';

/**
 * 渠道列表ID
 */
export const CHANNEL_PARENT_ID: number = 1;

/**
 * 项目分类列表ID
 */
export const PROJECT_CLASSIFY_ID: number = 2;
/**
 * 基础配置数据ID
 */
export const BASIC_CONFIG_ID: number = 3;
/**
 * 敏感词数据ID
 */
export const SENSITIVE_WORDS_ID: number = 6;

/**
 * 项目提现状态
 * 0待处理 1待提现 2提现成功 3提现失败
 */
export const LastCashStatusMap: {
  [key: number]: { color: string; text: string };
} = {
  '-1': {
    color: 'warning',
    text: '未知状态',
  },
  0: {
    color: 'warning',
    text: '待处理',
  },
  1: {
    color: 'processing',
    text: '待提现',
  },
  2: {
    color: 'success',
    text: '提现成功',
  },
  3: {
    color: 'error',
    text: '提现失败',
  },
};
export const ProjectStatusMap: {
  [key: number]: { color: string; text: string };
} = {
  0: {
    color: '',
    text: '草稿',
  },
  1: {
    color: 'warning',
    text: '待审核',
  },
  2: {
    color: 'processing',
    text: '进行中',
  },
  3: {
    color: 'success',
    text: '已完结',
  },
  4: {
    color: 'error',
    text: '已关闭',
  },
};

export const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
  'success',
  'processing',
  'error',
  'default',
  'warning',
];

/**
 * 广告位置类型
 */
export const AdvertisingPositionType: Array<ListToolBarMenuItem> = [
  {
    key: '首页banner',
    label: '首页Banner',
  },
  // {
  //   key: '开屏广告',
  //   label: '开屏广告',
  // },
  // {
  //   key: '个人中心',
  //   label: '个人中心',
  // },
  // {
  //   key: '母校首页',
  //   label: '母校首页',
  // },
];

export const AdvertisingStatusMap: {
  [key: number]: { color: string; text: string };
} = {
  1: {
    color: 'processing',
    text: '显示中',
  },
  2: {
    color: 'error',
    text: '未显示',
  },
};
