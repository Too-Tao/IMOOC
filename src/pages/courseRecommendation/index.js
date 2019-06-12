import React, { Component } from 'react'
import { Row, Col, Pagination, Spin } from 'antd'
import { connect } from 'dva'
import styles from './styles/index.less'
import classnames from 'classnames'
import CourseCard from './components/courseCard'
import logo from 'images/courseRecommendation/courseTop.png'
import { DIFFICULT } from 'utils/constants.js'

const direction = 0, classification = 1, difficult = 2
const mapStateToProps = ({ loading, courseRecommendation }) => {
  return {
    loading: loading.effects['courseRecommendation/getListData'],
    loadingType: loading.effects['courseRecommendation/getCourseType'],
    listData: courseRecommendation.listData,
    typeData: courseRecommendation.typeData,
    total: courseRecommendation.total
  }
}

@connect(mapStateToProps)
class CourseRecommendation extends Component {

  state = {
    directionCheckedAll: true,
    directionCheckedAllId: '1-0',
    classificationCheckedAll: true,
    classificationCheckedAllId: '1-0-0',
    directionCheckId: ' ',
    classificationCheckId: ' ',
    difficultCheck: '全部',
    query: {
      page: 1,
      pageSize: 12,
    },
    selectQuery: {
      page: 1,
      pageSize: 12,
      mt: '',
      st: '',
      grade: ''
    }
  }

  componentDidMount () {
    this.queryProject()
    this.props.dispatch({ type: 'courseRecommendation/getCourseType' })
  }

  queryProject = () => {
    this.props.dispatch({ type: 'courseRecommendation/getListData', payload: this.state.query })
  }

  getSelectData = () => {
    this.props.dispatch({ type: 'courseRecommendation/getListData', payload: this.state.selectQuery })
  }

  handleChangePage = (page) => {

    this.setState(() => {
      return {
        query: {
          page,
          pageSize: 12
        }
      }
    }, () => {
      this.queryProject()
    })
  }
  getClassificationItem = (typeData, directionCheckId, directionCheckedAll) => {
    let childrenArr = []
    if (Array.prototype.isPrototypeOf(typeData) && typeData.length === 0) {
      const children = []
      return children
    } else if (directionCheckedAll) {
      for (let item of typeData) {
        const { children } = item
        for (let i of children) {
          childrenArr.push({ id: i.id, name_info: i.name_info })
        }
      }
      return childrenArr
    } else {
      const typeDataItem = typeData.find((value) => {
        return value.id === directionCheckId
      })
      const { children } = typeDataItem
      return children
    }
  }

  showTotal = (total) => `共有${total}门课程`

  handleCheck = (mtId, stId, grade, type, directionCheckedAll) => {
    if ( mtId === '1-0' || stId === '1-0-0' ) {
      this.setState({
        directionCheckedAll: true,
        classificationCheckedAll: true,
        selectQuery: {
          page: 1,
          pageSize: 12,
          mt: '',
          st: '',
          grade: ''
        }
      }, () => this.getSelectData())
    } else {
        type === 0
        ? this.setState({
          directionCheckId: mtId,
          directionCheckedAll: false,
          selectQuery: {
            page: 1,
            pageSize: 12,
            mt: mtId,
            st: stId,
            grade: grade
          }
        }, () => this.getSelectData())
        : type === 1
        ? this.setState({
          classificationCheckId: stId,
          directionCheckedAll: directionCheckedAll,
          classificationCheckedAll: false,
          selectQuery: {
            page: 1,
            pageSize: 12,
            mt: mtId,
            st: stId,
            grade: grade
          }
        }, () => this.getSelectData())
        : this.setState({
          difficultCheck: grade,
          selectQuery: {
            page: 1,
            pageSize: 12,
            mt: mtId,
            st: stId,
            grade: grade
          }
        }, () => this.getSelectData())
      }
  }

  render () {
    const { directionCheckedAllId, classificationCheckedAllId, directionCheckedAll, classificationCheckedAll, directionCheckId, classificationCheckId, difficultCheck, selectQuery } = this.state
    const { listData, typeData, total, loading, loadingType } = this.props
    const { mt, st, grade } = selectQuery
    const children = this.getClassificationItem(typeData, directionCheckId, directionCheckedAll)
    return (
      <div>
        <div className={styles.headerWrapper}>
          <span><img src={logo} alt="logo"/></span>
        </div>
        <Spin spinning={loadingType}>
          <div className={styles.list}>
            <div>
              <span className={styles.title}>方向：</span>
              <div className={styles.ulWrap}>
                <span className={styles.all + " " + classnames(!!directionCheckedAll ? styles.checked: " ")} onClick={this.handleCheck.bind(this, directionCheckedAllId, classificationCheckedAllId, difficultCheck, direction)}><span>全部</span></span>
                <ul>
                  {
                    !!typeData
                    ?
                      typeData.map(({ id, name_info }) => (
                        <li className={classnames((id === directionCheckId && !directionCheckedAll ) ? styles.checked : " ")} onClick={this.handleCheck.bind(this, id, st, grade, direction)} key={id} >
                          <span>{name_info}</span>
                        </li>
                      ))
                    : null
                  }
                </ul>
              </div>
            </div>
            <div className={styles.classificationWrap}>
              <span className={styles.title}>分类：</span>
              <div className={styles.ulWrap}>
              <span className={styles.all + " " + classnames(!!classificationCheckedAll ? styles.checked: " ")} onClick={this.handleCheck.bind(this, directionCheckedAllId, classificationCheckedAllId, difficultCheck, classification)}><span>全部</span></span>
                <ul>
                  {
                    !!children
                      ? children.map( ({ id, name_info }) => (
                            <li className={classnames((id === classificationCheckId && !classificationCheckedAll ) ? styles.checked : " ")} onClick={this.handleCheck.bind(this, mt, id, grade, classification, directionCheckedAll)} key={id}>
                              <span>{name_info}</span>
                            </li>
                        ))
                      : null
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
                      <li key={id} className={classnames(value === difficultCheck ? styles.checked : " ")} onClick={this.handleCheck.bind(this, mt, st, value, difficult)}>
                        <span>{value}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </Spin>
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
          <Spin spinning={loading}>
            <Row>
              {
                listData.map(({id, coursePic, courseName, grade, num, courseDescribe}) => (
                  <Col span={6} key={id}>
                    <CourseCard
                      id={id}
                      imgUrl={coursePic}
                      title={courseName}
                      level={grade}
                      members={num}
                      desc={courseDescribe} />
                  </Col>
                ))
              }
            </Row>
          </Spin>
          <Pagination
            defaultPageSize={12}
            onChange={this.handleChangePage}
            total={total}
            style={{ width: '100%', textAlign: 'center' }}
            showTotal={this.showTotal}
            defaultCurrent={1}
           />
        </div>
      </div>
    )
  }
}

export default CourseRecommendation