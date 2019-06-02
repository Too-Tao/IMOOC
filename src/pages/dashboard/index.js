import React, { Component } from 'react'
import { Carousel, Row, Col, Icon } from 'antd'
import { connect } from 'dva'
import styles from './styles/index.less'

const mapStateToProps = ({ loading, dashboard }) => {
  return {
    loading: loading.effects['dashboard/getDashboardData'],
    dashboardData: dashboard.dashboardData
  }
}
@connect(mapStateToProps)
class Dashboard extends Component {

  state = {
    dashboardData: {
      swipperImg: [],
      recommendData: []
    }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'dashboard/getDashboardData', callback: this.getData })
  }

  getData = (dashboardData) => {
    this.setState(() => {
      return {
        dashboardData
      }
    })
  }

  handleToPrev = () => {
    this.refs.img.prev()
  }

  handleToNext = () => {
    this.refs.img.next()
  }

  render () {
    const { swipperImg, recommendData } = this.state.dashboardData
    return (
      <div className={styles.wrapper}>
        <div className={styles.carouselWrapper}>
          <div className={styles.iconWrapper} onClick={this.handleToPrev}>
            <Icon type="left" />
          </div>
          <Carousel autoplay effect="fade" ref="img">
            {
              swipperImg.map(({ id, imgUrl, link }) => (
                <a className={styles.aStyle} key={id} href={link}><img src={imgUrl} target="_blank" alt="courseImg"/></a>
              ))
            }
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
              recommendData.map(({id, imgUrl, title, link}) => (
                <Col span={6} key={id}>
                  <a className={styles.card} href={link} target="_blank" >
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
    )
  }
}

export default Dashboard