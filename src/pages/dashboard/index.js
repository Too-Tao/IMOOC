import React, { Component } from 'react'
import { Carousel, Row, Col, Icon } from 'antd'
import courseImg1 from 'images/dashboard/carousel001.jpg'
import courseImg2 from 'images/dashboard/carousel002.jpg'
import courseImg3 from 'images/dashboard/carousel003.jpg'
import courseImg4 from 'images/dashboard/carousel004.jpg'
import springImg from 'images/dashboard/spring.jpg'

import styles from './styles/index.less'

const courseData = [
  { id: 0, imgUrl: 'http://chuantu.xyz/t6/702/1558956726x1709417261.jpg', title: 'SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战' },
  { id: 1, imgUrl: 'http://chuantu.xyz/t6/702/1558957107x1954578459.jpg', title: 'Java电商秒杀系统深度优化 从容应对亿级流量挑战' },
  { id: 2, imgUrl: 'http://chuantu.xyz/t6/702/1558957137x1709417261.jpg', title: 'Vue2.5开发去哪儿网App 从零基础入门到实战项目'},
  { id: 3, imgUrl: 'http://chuantu.xyz/t6/702/1558957188x1709417261.jpg', title: 'Node.js从零开发Web Server博客项目  前端晋升全栈工程师必备' },
  { id: 4, imgUrl: 'http://chuantu.xyz/t6/702/1558957241x1709417261.jpg', title: 'PHP小白零基础入门' },
  { id: 5, imgUrl: 'http://chuantu.xyz/t6/702/1558957252x1954578459.jpg', title: '微信小程序入门与实战 常用组件API开发技巧项目实战' },
  { id: 6, imgUrl: 'http://chuantu.xyz/t6/702/1558957269x1709417261.jpg', title: 'Spring Boot 2.0深度实践之系列总览' },
  { id: 7, imgUrl: 'http://chuantu.xyz/t6/702/1558957281x1954578459.jpg', title: 'Google面试官亲授-Java面试新手尊享课' },
  { id: 8, imgUrl: 'http://chuantu.xyz/t6/702/1558957294x1709417261.jpg', title: 'JavaScript版 数据结构与算法' },
  { id: 9, imgUrl: 'http://chuantu.xyz/t6/702/1558957307x1709417261.jpg', title: 'Spring Security技术栈开发企业级认证与授权' },
  { id: 10, imgUrl: 'http://chuantu.xyz/t6/702/1558957322x1954578459.jpg', title: '新一代大数据计算引擎  Flink从入门到实战' },
  { id: 11, imgUrl: 'http://chuantu.xyz/t6/702/1558957336x1954578459.jpg', title: '2018 AWS技术峰会  自动化运维、微服务及容器技术分论坛' },
]

class Dashboard extends Component {

  handleToPrev = () => {
    this.refs.img.prev()
  }

  handleToNext = () => {
    this.refs.img.next()
  }

  render () {
    return (
      <div className={styles.wrapper}>
        <div className={styles.carouselWrapper}>
          <div className={styles.iconWrapper} onClick={this.handleToPrev}>
            <Icon type="left" />
          </div>
          <Carousel autoplay effect="fade" ref="img">
            <div><img src={courseImg1} alt="courseImg1"/></div>
            <div><img src={courseImg2} alt="courseImg2"/></div>
            <div><img src={courseImg3} alt="courseImg3"/></div>
            <div><img src={courseImg4} alt="courseImg4"/></div>
          </Carousel>
          <div className={styles.iconWrapper} onClick={this.handleToNext}>
            <Icon type="right"  />
          </div>
        </div>
        <div className={styles.cardWrapper}>
          <div className={styles.typeTitle}>
            <em>实</em>
            /
            <em>战</em>
            /
            <em>推</em>
            /
            <em>荐</em>
          </div>
          <Row>
            {
              courseData.map(({id, imgUrl, title}) => (
                <Col span={6} key={id}>
                  <div className={styles.card}>
                    <div className={styles.cardPic}>
                      <img src={imgUrl} alt="spring" />
                      </div>
                    <div className={styles.courseContent}>
                      <h3>{title}</h3>
                    </div>
                  </div>
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    )
  }
}

export default Dashboard