// 以空格划分数据。第一个是请求类型，默认GET；第二个是请求地址；第三个是处理错误的方式：error | info | warning，默认error。
// 当写第三个数据时，请求类型必填。 如 'GET /log/download info'

export default {
//=======================================================
//登陆页
  //login (登陆)
  loginURL: 'POST /auth/userlogin',
  //退出登陆
  logoutURL: 'POST /auth/userlogout',
  //register (注册)
  registerURL: 'POST /auth/register',
  //token
  tokenURL: '/auth/userjwt',
//推荐课程
  //获取课程信息
  courseRecommendationDataURL: '/search/course/list/:page/:pageSize',
  //coursedetail
  courseDetailURL: '/search/course/getall/:id',
  //增加课程
  addCourseURL: 'POST /course/add',
  //编辑课程
  editCourseURL: 'PUT /course/edit/:id',
  //删除课程
  removeCourseURL: 'DELETE /course/del/:id',
//评论
  //获取评论
  getCommentURL: '/comment/listcomments/:page/:pageSize',
  //删除评论
  removeCommentURL: 'DELETE /comment/:id',
  //增加评论
  addCommentURL: 'POST /comment/:courseId/createcomment',
  //点赞
  likeURL: '/comment/vote',
//用户管理
  //获取用户列表
  getTableDataURL: '/ucenter/list/:page/:pageSize',
  //新增用户
  addUserURL: 'POST /ucenter/add',
  // 编辑用户
  editUserMsgURL: 'PUT /ucenter/edit/:id',
  // 删除用户
  removeUserURL: 'DELETE /ucenter/:id',

//热门教师
  teacherListURL: '/course/teacher/list/:size',
  teacherDetailURL: '/course/teacher/teacherview/:id',
//分类管理
  classifiedURL: '/course/catagory/list',
//数据分析
  //课程评分与数量柱形图
  barEchartsDataURL: '/course/courseview/getscorecount',
  //课程分类与课程数量堆积图
  lineEchartsDataURL: '/course/courseview/getcatagoryaccareamap',
  //课程难度
  courseDifficultURL: '/course/courseview/getgradecount',
  //课程分类
  courseTypeURL: '/course/courseview/findcoursenumbycate',
  //教师职业
  teacherTitleURL: '/course/courseview/findteachernum',
//课程管理
  getCourseDataListURL: '/course/coursebase/list/:page/:pageSize'

//================================================================================
//====================  以下是  easy mock  模拟的API===============================
//用户信息
  // userInfoURL: '/userInfo',
  //login (登陆)
  // loginURL: 'POST /login',
  //退出登陆
  // logoutURL: '/logout',
  //register (注册)
  // registerURL: 'POST /register',
  //dashboard (首页)
  // dashboardURL: '/dashboard',
  //推荐课程页数据
  // courseRecommendationDataURL: '/courseRecommendation',
  //课程分类数据
  // courseCatagoryListURL: '/course/catagory/list',
  //courseRecommendation （课程详情页）
  // queryCourseDetailURL: '/search/course/getall/:id',
  //数据分析页面数据
  // dataAnalysisDataURL: '/dataAnalysisData',

  //用户管理页面
  // tableDataURL: '/tableData',
  //新增用户
  // addUserURL: 'POST /addUser',
  //编辑用户
  // editUserMsgURL: 'POST /editUserMsg',
  //删除用户
  // removeUserURL: 'POST /removeUser',
  //教师信息
  // teacherListURL: '/teacherList',
  // teacherDetailURL: 'POST /teacherDetail'
}