import React, { Component } from 'react'
import { Row, Col, Spin } from 'antd'
import { connect } from 'dva'
import styles from './styles/index.less'
import HollowPieEcharts from './components/echarts/hollowPieEcharts'
import SolidPieEcharts from './components/echarts/solidPieEcharts'
import BarEcharts from './components/echarts/barEcharts'
import LineEcharts from './components/echarts/lineEcharts'


const mapStateToProps = ({ loading, dataAnalysis }) => {
  return {
    loading1: loading.effects['dataAnalysis/getBarEchartsData'],
    loading2: loading.effects['dataAnalysis/getLineEchartsData'],
    loading3: loading.effects['dataAnalysis/getCourseDifficultData'],
    loading4: loading.effects['dataAnalysis/getCourseTypeData'],
    loading5: loading.effects['dataAnalysis/getTeacherTitleData'],
    barEchartsData: dataAnalysis.barEchartsData,
    lineEchartsData: dataAnalysis.lineEchartsData,
    courseDifficultData: dataAnalysis.courseDifficultData,
    courseTypeData: dataAnalysis.courseTypeData,
    teacherTitleData: dataAnalysis.teacherTitleData
  }
}

@connect(mapStateToProps)
class DataAnalysis extends Component {
  componentDidMount () {
    this.props.dispatch({ type: 'dataAnalysis/getBarEchartsData' })
    this.props.dispatch({ type: 'dataAnalysis/getLineEchartsData' })
    this.props.dispatch({ type: 'dataAnalysis/getCourseDifficultData' })
    this.props.dispatch({ type: 'dataAnalysis/getCourseTypeData' })
    this.props.dispatch({ type: 'dataAnalysis/getTeacherTitleData' })
  }

  render () {
    const { loading1,
            loading2,
            loading3,
            loading4,
            loading5,
            barEchartsData,
            lineEchartsData,
            courseDifficultData,
            courseTypeData,
            teacherTitleData
          } = this.props
    return (
      <div>
        <Row gutter={24}>
          <Col span={12}>
            <Spin spinning={loading1}>
              <div className={styles.echartsHeaderItem}>
                <BarEcharts title="课程评分与数量" chartData={barEchartsData} />
              </div>
            </Spin>
          </Col>
          <Col span={12}>
            <Spin spinning={loading2}>
              <div className={styles.echartsHeaderItem}>
                <LineEcharts title="课程分类与数量" chartData={lineEchartsData} />
              </div>
            </Spin>
          </Col>
        </Row>
        <div className={styles.rowWrap}>
          <Row gutter={12}>
            <Col span={8}>
              <Spin spinning={loading3}>
                <div className={styles.echartsFooterItem}>
                  <HollowPieEcharts title="课程难度" chartData={courseDifficultData} />
                </div>
              </Spin>
            </Col>
            <Col span={8}>
              <Spin spinning={loading4}>
                <div className={styles.echartsFooterItem}>
                  <SolidPieEcharts title="课程类别" chartData={courseTypeData} />
                </div>
              </Spin>
            </Col>
            <Col span={8}>
              <Spin spinning={loading5}>
                <div className={styles.echartsFooterItem}>
                  <SolidPieEcharts title="教师职业" chartData={teacherTitleData} />
                </div>
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default DataAnalysis