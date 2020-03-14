export default [
  // user
  // {
  //   path: '/',
  //   component: '../layouts/EmptyLayout',
  //   routes: [
  //     { path: '/login', redirect: '/user/login' },
  //     { path: '/user/login', component: './User/Login' },
  //   ],
  // },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['user', 'admin'],
    routes: [
      { path: '/', component: './home/index', title: '首页' },
      { path: '/login', component: './login/index', title: ' 登录' },
      { path: '/custom', 
        title: '客户档案',
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
      { path: '/paper/:type', component: './paper/index', title: '试题页面' },
      { path: '/result', component: './result/index', title: '结果页' },
      
      
    ],
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
