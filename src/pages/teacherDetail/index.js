import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Icon, Spin } from 'antd'
import styles from './styles/index.less'

const mapStateToProps = ({ loading, teacherDetail }) => {
  return {
    loading: loading.effects['teacherDetail/getTeacherData'],
    data: teacherDetail.data
  }
}

@connect(mapStateToProps)
class TeacherDetail extends Component {

  state = {
    courseBaseList: []
  }

  componentDidMount () {
    const { dispatch, location } = this.props
    const { pathname } = location
    const list = pathname.split('/teacherDetail/')
    const obj = { id: list[1] }
    dispatch({ type: 'teacherDetail/getTeacherData', payload: obj })
  }

  render () {
    const { data, loading } = this.props
    const { teacherPic, teacherName , job, teacherInfo, experience, score, follow, fans, courseBaseList } = data
    return (
      <Spin spinning={loading}>
        <div className={styles.bgWrap}>
          <div className={styles.mask}>
            <div className={styles.content}>
              <div className={styles.avatarWrap}><img src={teacherPic} alt="img" /></div>
              <div className={styles.titleImg}>
                <p>慕课网官方认证</p>
                <h3>精英讲师</h3>
              </div>
              <div className={styles.teacherName}>{teacherName}</div>
              <div className={styles.job}>{job}</div>
              <div className={styles.teacherDesc}>{teacherInfo}</div>
              <div className={styles.bottomWrap}>
                <ul>
                  <li>
                    <p>{experience}</p>
                    <p>经验</p>
                  </li>
                  <li>
                    <p>{score}</p>
                    <p>积分</p>
                  </li>
                  <li>
                    <p>{follow}</p>
                    <p>关注</p>
                  </li>
                  <li>
                    <p>{fans}</p>
                    <p>粉丝</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.bottomBg}></div>
          </div>
        </div>
        <div className={styles.courseWrap}>
          <div className={styles.title}>
            <h2>实战</h2>
            <p>上进唯实战可得，突破绝技成长瓶颈</p>
          </div>
          <div className={styles.courses}>
            <Row gutter={24}>
              {
                !!courseBaseList
                ? courseBaseList.map(({ id, courseName, courseDescribe, studyHref }) => (
                    <Col type="flex" span={12} justify="space-around" key={id}>
                      <div className={styles.courseCard}>
                        <img src="https://img.mukewang.com/5b8e323900017f7406000338-240-135.jpg" alt="img" />
                        <div className={styles.mask}>
                          <div className={styles.courseMsgWrap}>
                            <p>{courseName}</p>
                            <p>{courseDescribe}</p>
                            <a href={studyHref} target="_blank" rel="noopener noreferrer">
                              <Icon type="right-circle" style={{ fontSize: 30, color: '#fff' }} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))
                : null
              }
            </Row>
          </div>
        </div>
        </Spin>
    )
  }
}

export default TeacherDetail