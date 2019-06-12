import React, { Component } from 'react'
import { Carousel, Row, Col, Icon } from 'antd'
import { RECOMMEND_DATA, SWIPPER_IMG_DATA } from 'utils/constants.js'
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
            {
              SWIPPER_IMG_DATA.map(({ id, imgUrl, link }) => (
                <a className={styles.aStyle} key={id} href={link} target="_blank" rel="noopener noreferrer"><img src={imgUrl} alt="courseImg"/></a>
              ))
            }
          </Carousel>
          <div className={styles.iconWrapper} onClick={this.handleToNext}>
            <Icon type="right" />
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
          <div className={styles.RowWrap}>
            <Row type="flex" justify="center">
              {
                RECOMMEND_DATA.map(({id, imgUrl, title, link}) => (
                  <Col span={5} key={id}>
                    <a className={styles.card} href={link} target="_blank" rel="noopener noreferrer" >
                      <div className={styles.cardPic}>
                        <img src={imgUrl} alt="img" />
                        </div>
                      <div className={styles.courseContent}>
                        <h3>{title}</h3>
                      </div>
                    </a>
                  </Col>
                ))
              }
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard