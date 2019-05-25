export default [
  {
    path: '/',
    component: '../layouts',
    routes: [
      {
        path: '/login',
        component: './login/index',
        title: '登陆'
      },
      {
        path: '/dashboard',
        component: './dashboard/index',
        title: '课程推荐'
      }, {
        path: '/courseManage',
        title: '课程管理',
        component: './courseManage/index'
      }, {
        path: './dataAnalysis',
        title: '数据分析',
        component: './dataAnalysis/index'
      }, {
        path: './commentManage',
        title: '评论管理',
        component: './commentManage/index'
      }, {
        path: './classifiedManage',
        title: '分类管理',
        component: './classifiedManage/index'
      }, {
        path: './userManage',
        title: '用户管理',
        component: './userManage/index'
      }
    ]
  }
]