// https://umijs.org/config/
import pageRoutes from './router.config';
import theme from '../src/theme';
import webpackPlugin from './plugin.config';

export default {
  // add for transfer to umi
  base: '/',
  publicPath: '/',
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  history: { type: 'browser' }, // 默认是 browser

  // umi
  dva: {
    hmr: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  title: 'mobile-assistant',
  //   exportStatic: {},
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://mobile.ant.design/docs/react/customize-theme-cn
  theme: {
    'brand-primary': theme.primaryColor,
    'brand-primary-tap': theme.brandPrimaryTap,
  },
  externals: {},
  lessLoader: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 5,
    ios: 10,
    chrome: 58,
    ie: 11,
  },
  outputPath: './dist',
  hash: true,
  alias: {},
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
    '/wx/api/': {
      target: 'https://games.parsec.com.cn/',
      changeOrigin: true,
      pathRewrite: { '^/wx/api': '' },
    },
  },
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
};
