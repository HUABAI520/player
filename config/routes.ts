export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { path: '/user/settings', name: '个人设置', component: './User/Settings' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/books',
    icon: 'table',
    name: '图书管理',
    component: './Books',
    routes: [
      {
        path: '/books',
        redirect: '/books/book',
      },
      {
        name: '查看图书',
        icon: 'smile',
        path: '/books/book',
        component: './Books/Book',
      },
      {
        name: '借阅情况',
        path: '/books/bookBorrow',
        component: './Books/BookBorrow',
      },
    ],
  },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
