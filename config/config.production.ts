import { defineConfig } from '@umijs/max';

/**
 * production 产物需要的单独配置
 */
export default defineConfig({
  define: {
    UMI_ENV: 'production',
    APP_API_HOST: 'https://almaaz-api.parsec.com.cn',
  },
});
