# 项目描述
```
慕课管理系统是使用React + AntDesign + umi进行开发的前端项目。使用cz-conventional-changelog规范的提交项目代码。
```
# 技术栈
- React (16.7.0)
- antd (3.17.0)
- umi (2.6.3)
- dva (2.5.0-beta.2)
- echarts (4.2.1)
- echarts-for-react (2.0.15-beta.0)
# 目录
```
|--config/
    |--config.js    umi配置文件
    |--routes.js    项目全部路由
    |--webpack.js   webpack配置文件
|--dist
|--node_modules
|--src
    |--assets/
        |--images/    静态资源图片
    |--components/
        |--GlobalFooter/  全局页面底部
              |--index.js
              |--index.less
        |--GlobalHeader/  全局页面头部
              |--index.js
              |--index.less
        |--GlobalSideMenu/  全局页面侧边栏
              |--index.js
              |--index.less
    |--layouts/   全局布局
        |--index.js
        |--index.less
    |--models/
        |--index.js   全局数据管理
    |--pages/
        |--umi/   umi文件
        |--classifiedManage/    课程分类管理
            |--models/
            |--styles/
            |--index.js
        |--courseDetail/    课程详情页面
            |--models/
            |--styles/
            |--index.js
        |--courseManage/    课程管理
            |--models/
            |--styles/
            |--index.js
        |--courseRecommendation/    课程推荐页面
            |--models/
            |--styles/
            |--index.js
        |--dashboard/   首页
            |--models/
            |--styles/
            |--index.js
        |--dataAnalysis/    数据分析
            |--models/
            |--styles/
            |--index.js
        |--login/   登录页
            |--models/
            |--styles/
            |--index.js
        |--teacherDetail/   教师详情页
            |--models/
            |--styles/
            |--index.js
        |--teacherManage/    教师管理页
            |--models/
            |--styles/
            |--index.js
        |--userManage/    用户管理页
            |--models/
            |--styles/
            |--index.js
        |--index.js
        |--index.less
    |--services/
        |--api.js   后端API
        |--index.js   将API地址进行拆分
    |--utils/
        |--common.js    公共的方法
        |--constants.js   静态数据
        |--requests.js  数据请求
        |--validator.js   表单校验规则
    |--app.js
    |--global.css
|--...
```
# 项目展示
## 课程推荐页
![dashboard](https://github.com/Too-Tao/imagesRespository/blob/master/Imooc/%E6%8E%A8%E8%8D%90%E9%A1%B5.gif)
## 数据分析
![dataAnalysis](https://github.com/Too-Tao/imagesRespository/blob/master/Imooc/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90.gif)
## 热门教师推荐
![teacher](https://github.com/Too-Tao/imagesRespository/blob/master/Imooc/%E7%83%AD%E9%97%A8%E6%95%99%E5%B8%88.gif)
## 课程管理
![course](https://github.com/Too-Tao/imagesRespository/blob/master/Imooc/%E8%AF%BE%E7%A8%8B%E7%AE%A1%E7%90%86.gif)
## 用户管理
![user](https://github.com/Too-Tao/imagesRespository/blob/master/Imooc/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86.gif)