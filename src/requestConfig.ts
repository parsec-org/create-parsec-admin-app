import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message, Modal } from 'antd';
import storage from '@/utils/storage';
import { TOKEN } from '@/constants';
import { stringify } from 'querystring';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 404,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  // 统一的请求设定
  timeout: 15000,
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      console.log('errorThrower', res);
      const {
        success = true,
        data,
        errorCode,
        errorMessage,
        showType,
      } = res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      console.log('errorHandler', error, opts);
      if (opts?.skipErrorHandler) throw error;
      if (error.response) {
        // Axios 的错误
        const { status, data } = error.response;
        let errorMsg = error.statusText;
        if (data) {
          errorMsg = data.message || '';
        }
        switch (status) {
          case 403:
            Modal.info({
              title: `登录信息已过期，请重新登录[code: ${status}]`,
              okText: '重新登录',
              onOk: () => {
                const { search, pathname } = window.location;
                storage.clear(); // 清除缓存信息
                history.replace({
                  pathname: '/auth/login',
                  search: stringify({
                    redirect: pathname + search,
                  }),
                });
              },
            });
            break;
          default:
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            message.error(`${errorMsg || '服务器异常，请稍后重试'} ${status}`);
            break;
        }
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('服务器暂时没有回应！ 请稍后重试。');
      } else {
        // 发送请求时出了点问题
        message.error('请求错误，请重新尝试。');
      }
      throw error; // 抛出错误，方便页面进行链式调用
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      let url = config?.url;
      if (!url?.startsWith('http')) {
        url = `${APP_API_HOST}${url}`;
      }
      // config.headers
      const token = storage.get(TOKEN);
      if (!!token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`.replace(/"/g, ''),
        };
      }

      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 获取相应头的鉴权信息
      if (response.headers.hasOwnProperty('token')) {
        storage.set(TOKEN, response.headers['token']);
      }
      // 拦截响应数据，进行个性化处理
      return response;
    },
  ],
};
