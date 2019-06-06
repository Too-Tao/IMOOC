 export const menuRoutesData = [
  {
    path: '/courseRecommendation',
    iconType: 'home',
    component: './courseRecommendation/index',
    title: '课程推荐'
  },
  {
    path: '/courseDetail/:id',
    component: './courseDetail/index',
    title: '课程详情',
    noShowInMenu: true
  }, {
    path: './dataAnalysis',
    iconType: 'area-chart',
    title: '数据分析',
    component: './dataAnalysis/index'
  },
  {
    path: './teacherManage',
    iconType: 'fire',
    title: '热门教师推荐',
    component: './teacherManage/index',
    exclude: 101001
  },
  {
    path: './teacherDetail/:id',
    title: '教师详情',
    component: './teacherDetail/index',
    noShowInMenu: true
  },
  {
    path: '/courseManage',
    iconType: 'video-camera',
    title: '课程管理',
    component: './courseManage/index',
    exclude: 101001
  },
  // {
  //   path: './commentManage',
  //   iconType: 'message',
  //   title: '评论管理',
  //   component: './commentManage/index',
  //   exclude: 101001
  // },
  {
    path: './classifiedManage',
    iconType: 'read',
    title: '分类管理',
    component: './classifiedManage/index',
    exclude: 101001
  }, {
    path: './userManage',
    iconType: 'user',
    title: '用户管理',
    component: './userManage/index',
    exclude: 101001
  }
]

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
        path: '/',
        component: './dashboard/index'
      },
      ...menuRoutesData
    ]
  }
]