import React, { Component } from 'react'
import { Input, Row, Col } from 'antd'
import styles from './styles/index.less'
import classnames from 'classnames'
import CourseCard from './components/courseCard'
import logo from 'images/courseRecommendation/courseTop.png'
import { CAREER_DIRECTION, CLASSIFICATION, DIFFICULT } from 'utils/constants.js'

const Search = Input.Search

const courseData = [
  { id: 0, imgUrl: 'http://chuantu.xyz/t6/702/1558956726x1709417261.jpg', title: '初识HTML+CSS', level: '初级', members: 2131, desc: 'HTML+CSS基础教程8小时带领大家步步深入学习标签用法和意义' },
  { id: 1, imgUrl: 'http://chuantu.xyz/t6/702/1558957107x1954578459.jpg', title: 'Java电商秒杀系统深度优化 从容应对亿级流量挑战', level: '初级', members: 211231, desc: '本教程从Java环境搭建、工具使用、基础语法开始，带你入门' },
  { id: 2, imgUrl: 'http://chuantu.xyz/t6/702/1558957137x1709417261.jpg', title: 'Vue2.5开发去哪儿网App 从零基础入门到实战项目', level: '入门', members: 3313131, desc: 'C语言入门视频教程，带你进入编程世界的必修课-C语言' },
  { id: 3, imgUrl: 'http://chuantu.xyz/t6/702/1558957188x1709417261.jpg', title: 'Node.js从零开发Web Server博客项目  前端晋升全栈工程师必备', level: '中级', members: 1242131, desc: 'JavaScript做为一名Web工程师的必备技术，本教程让您快速入门 ' },
  { id: 4, imgUrl: 'http://chuantu.xyz/t6/702/1558957241x1709417261.jpg', title: 'PHP小白零基础入门', level: '高级', members: 4215431, desc: '学python入门视频教程，让你快速入门并能编写简单的Python程序' },
  { id: 5, imgUrl: 'http://chuantu.xyz/t6/702/1558957252x1954578459.jpg', title: '微信小程序入门与实战 常用组件API开发技巧项目实战', level: '初级', members: 45622131, desc: '慕课网推出的PS入门教程，PS入门学习必备课程，带你轻松入门' },
  { id: 6, imgUrl: 'http://chuantu.xyz/t6/702/1558957269x1709417261.jpg', title: 'Spring Boot 2.0深度实践之系列总览', level: '初级', members: 32153431, desc: 'Python数据预处理---人工智能通用技术' },
  { id: 7, imgUrl: 'http://chuantu.xyz/t6/702/1558957281x1954578459.jpg', title: 'Google面试官亲授-Java面试新手尊享课', level: '初级', members: 2342131, desc: '作为程序员你还不知道编辑器之神 Vim 吗，带你从零开始学习 vim 编辑器。' },
  { id: 8, imgUrl: 'http://chuantu.xyz/t6/702/1558957294x1709417261.jpg', title: 'JavaScript版 数据结构与算法', level: '初级', members: 2134321, desc: '本门课程将带大家利用ViewPager等技术实现卡片式问答项目下半部分的学习' },
  { id: 9, imgUrl: 'http://chuantu.xyz/t6/702/1558957307x1709417261.jpg', title: 'Spring Security技术栈开发企业级认证与授权', level: '初级', members: 213531, desc: '深入浅出微信小程序核心基础与云开发，使你掌握小程序开发必备技能。' },
  { id: 10, imgUrl: 'http://chuantu.xyz/t6/702/1558957322x1954578459.jpg', title: '新一代大数据计算引擎  Flink从入门到实战', level: '初级', members: 215431, desc: '综合利用ViewPager、Tab等诸多核心技术实现微信主界面的框架搭建任务' },
  { id: 11, imgUrl: 'http://chuantu.xyz/t6/702/1558957336x1954578459.jpg', title: '2018 AWS技术峰会  自动化运维、微服务及容器技术分论坛', level: '初级', members: 2342142314, desc: '本课程介绍了如何通过PHP面向对象的思想构建一个模块化的APP后台' },
]


class CourseRecommendation extends Component {

  state = {
    directionCheckId: 0,
    classificationCheckId: 0,
    difficultCheckId: 0
  }

  handleCheck = (id, type) => {
    type === 0
    ? this.setState({
      directionCheckId: id
    })
    : type === 1
    ? this.setState({
      classificationCheckId: id
    })
    : this.setState({
      difficultCheckId: id
    })
  }

  render () {
    const { directionCheckId, classificationCheckId, difficultCheckId } = this.state
    const direction = 0, classification = 1, difficult = 2
    return (
      <div>
        <div className={styles.headerWrapper}>
          <span><img src={logo} alt="logo"/></span>
          <Search placeholder="搜索你想要的课程" style={{ width: 340, height: 35, float: 'right' }} />
        </div>
        <div className={styles.list}>
          <div>
            <span className={styles.title}>方向：</span>
            <div className={styles.ulWrap}>
              <ul>
                {
                  CAREER_DIRECTION.map(({ id, value }) => (
                    <li className={classnames(id === directionCheckId ? styles.checked : " ")} onClick={this.handleCheck.bind(this, id, direction)} key={id} >
                      <a href="javascript:">{value}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className={styles.classificationWrap}>
            <span className={styles.title}>分类：</span>
            <div className={styles.ulWrap}>
              <ul>
                {
                  CLASSIFICATION.map(({ id, value }) => (
                    <li className={classnames(id === classificationCheckId ? styles.checked : " ")} onClick={this.handleCheck.bind(this, id, classification)} key={id}>
                      <a href="javascript:">{value}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div>
          <span className={styles.title}>难度：</span>
            <div className={styles.ulWrap}>
              <ul>
                {
                  DIFFICULT.map(({ id, value }) => (
                    <li className={classnames(id === difficultCheckId ? styles.checked : " ")} onClick={this.handleCheck.bind(this, id, difficult)} key={id}>
                      <a href="javascript:">{value}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.courseList}>
          <div className={styles.title}>
            <em>课</em>
            \
            <em>程</em>
            \
            <em>推</em>
            \
            <em>荐</em>
          </div>
          <Row>
            {
              courseData.map(({id, imgUrl, title, level, members, desc}) => (
                <Col span={6} key={id}>
                  <CourseCard
                    imgUrl={imgUrl}
                    title={title}
                    level={level}
                    members={members}
                    desc={desc} />
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    )
  }
}

export default CourseRecommendation