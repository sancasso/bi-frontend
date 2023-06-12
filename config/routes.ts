export default [
  {
    path: '/user',
    name: '用户页面',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/', redirect: '/add_chart' },
  { path: '/add_chart', name: '智能分析', icon: 'BarChart', component: './AddChart' },
  {
    path: '/add_chart_async',
    name: '智能分析（异步）',
    icon: 'BarChart',
    component: './AddChartAsync',
  },
  { path: '/my_chart', name: '我的图表', icon: 'PieChart', component: './MyChart' },
  { path: '/user/settings', component: './User/Settings' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理员界面',
    routes: [
      // { path: '/admin', name:'管理页面1', redirect: '/admin/sub-page' },
      {
        path: '/admin/usermanage',
        access: 'canAdmin',
        name: '用户管理',
        icon: 'smile',
        component: './Admin/UserManage',
      },
    ],
  },
  // { icon: 'table', name:'数据页面', path: '/list', component: './TableList' },
  // { path: '/', redirect: '/welcome' },
  { path: '*', name: '出错页面', layout: false, component: './404' },
];
