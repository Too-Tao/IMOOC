import React, { Component } from 'react'
import { Input, Row, Col, Pagination } from 'antd'
import router from 'umi/router'
import { connect } from 'dva'
import styles from './styles/index.less'
import classnames from 'classnames'
import CourseCard from './components/courseCard'
import logo from 'images/courseRecommendation/courseTop.png'
import { CAREER_DIRECTION, CLASSIFICATION, DIFFICULT } from 'utils/constants.js'

const Search = Input.Search

const mapStateToProps = ({ loading, courseRecommendation }) => {
  return {
    loading: loading.effects['courseRecommendation/getListData'],
    listData: courseRecommendation.listData
  }
}

@connect(mapStateToProps)
class CourseRecommendation extends Component {

  state = {
    directionCheckId: 0,
    classificationCheckId: 0,
    difficultCheckId: 0,
    query: {
      page: 1,
      size: 12
    }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'courseRecommendation/getListData' })
  }

  queryProject = () => {
    const { page, size } = this.state.query
    router.push({
      pathname: `/courseRecommendation/${page}/${size}`,
    })
  }

  handleChangePage = page => {
    const { query } = this.state
    this.setState(() => {
      return {
        query: {
          ...query,
          page
        }
      }
    }, () => {
      this.queryProject()
    })
  }

  showTotal = (total) => `共有${total}门课程`

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
    const { directionCheckId, classificationCheckId, difficultCheckId, query } = this.state
    const { listData } = this.props
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
              listData.map(({id, imgUrl, title, level, members, desc}) => (
                <Col span={6} key={id}>
                  <CourseCard
                    id={id}
                    imgUrl={imgUrl}
                    title={title}
                    level={level}
                    members={members}
                    desc={desc} />
                </Col>
              ))
            }
          </Row>
          <Pagination
            current={query.page}
            onChange={this.handleChangePage}
            total={listData.length}
            style={{ width: '100%', textAlign: 'center' }}
            showTotal={this.showTotal}
            pageSize={12}
            defaultCurrent={1}
           />
        </div>
      </div>
    )
  }
}

export default CourseRecommendation