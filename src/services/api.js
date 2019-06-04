// 以空格划分数据。第一个是请求类型，默认GET；第二个是请求地址；第三个是处理错误的方式：error | info | warning，默认error。
// 当写第三个数据时，请求类型必填。 如 'GET /log/download info'

export default {
  //login (登陆)
  loginURL: 'POST /login',
  //退出登陆
  logoutURL: '/logout',
  //register (注册)
  registerURL: 'POST /register',
  //dashboard (首页)
  dashboardURL: '/dashboard',
  //推荐课程页数据
  courseRecommendationDataURL: '/courseRecommendation',
  //courseRecommendation （课程详情页）
  queryCourseDetailURL: '/search/course/getall/:id',
  //数据分析页面数据
  dataAnalysisDataURL: '/dataAnalysisData',

  //用户管理页面
  tableDataURL: '/tableData',
  //新增用户
  addUserURL: 'POST /addUser',
  //编辑用户
  editUserMsgURL: 'POST /editUserMsg',
  //删除用户
  removeUserURL: 'POST /removeUser'
}