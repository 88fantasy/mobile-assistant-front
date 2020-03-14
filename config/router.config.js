export default [
  {
    path: '/',
    component: './home/index',
    title: '首页'

  },
  { 
    path: '/login', 
    component: './login/index', 
    title: ' 登录' 
  },
  { path: '/custom', 
    title: '客户档案',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['user', 'admin'],
    routes: [
      {
        path: '/custom',
        title: '客户档案',
        component: './custom/index',
      },
      {
        path: '/custom/card',
        title: '客户档案 - 详细',
        component: './custom/card',
      },
    ]
  },
  {
    title: 'exception',
    path: '/exception',
    routes: [
      // Exception
      {
        path: '/exception/403',
        title: 'not-permission',
        component: './exception/403',
      },
      {
        path: '/exception/404',
        title: 'not-find',
        component: './exception/404',
      },
      {
        path: '/exception/500',
        title: 'server-error',
        component: './exception/500',
      },
    ],
  },
  { path: '/404', component: '404' },
];
