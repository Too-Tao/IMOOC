import React, { Component } from 'react'
import { Carousel, Row, Col, Icon } from 'antd'
import courseImg1 from 'images/dashboard/carousel001.jpg'
import courseImg2 from 'images/dashboard/carousel002.jpg'
import courseImg3 from 'images/dashboard/carousel003.jpg'
import courseImg4 from 'images/dashboard/carousel004.jpg'
import springImg from 'images/dashboard/spring.jpg'

import styles from './styles/index.less'

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
        <div className={styles.typeTitle}>
          <em>实</em>
          /
          <em>战</em>
          /
          <em>推</em>
          /
          <em>荐</em>
        </div>
        <Row type="flex" justify="space-around">
          <Col span={4}>
            <div className={styles.card}>
              <div className={styles.cardPic}>
                <img src={springImg} alt="spring" />
                </div>
              <div className={styles.courseContent}>
                <h3>SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战</h3>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.card}>
              <div className={styles.cardPic}>
                <img src={springImg} alt="spring" />
              </div>
              <div className={styles.courseContent}>
                <h3>SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战</h3>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.card}>
              <div className={styles.cardPic}>
                <img src={springImg} alt="spring" />
              </div>
              <div className={styles.courseContent}>
                <h3>SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战</h3>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.card}>
              <div className={styles.cardPic}>
                <img src={springImg} alt="spring" />
              </div>
              <div className={styles.courseContent}>
                <h3>SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战</h3>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.card}>
              <div className={styles.cardPic}>
                <img src={springImg} alt="spring" />
              </div>
              <div className={styles.courseContent}>
                <h3>SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战</h3>
              </div>
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={4}>
            <div className={styles.card}>
              <div className={styles.cardPic}>
                <img src={springImg} alt="spring" />
                </div>
              <div className={styles.courseContent}>
                <h3>SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战</h3>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.card}>
              <div className={styles.cardPic}>
                <img src={springImg} alt="spring" />
              </div>
              <div className={styles.courseContent}>
                <h3>SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战</h3>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.card}>
              <div className={styles.cardPic}>
                <img src={springImg} alt="spring" />
              </div>
              <div className={styles.courseContent}>
                <h3>SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战</h3>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.card}>
              <div className={styles.cardPic}>
                <img src={springImg} alt="spring" />
              </div>
              <div className={styles.courseContent}>
                <h3>SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战</h3>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.card}>
              <div className={styles.cardPic}>
                <img src={springImg} alt="spring" />
              </div>
              <div className={styles.courseContent}>
                <h3>SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战</h3>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard