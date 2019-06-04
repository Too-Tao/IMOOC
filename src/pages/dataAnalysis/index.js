import React, { Component } from 'react'
import { Row, Col, Spin } from 'antd'
import { connect } from 'dva'
import styles from './styles/index.less'
import HollowPieEcharts from './components/echarts/hollowPieEcharts'
import SolidPieEcharts from './components/echarts/solidPieEcharts'

const mapStateToProps = ({ loading, dataAnalysis }) => {
  return {
    loading: loading.effects['dataAnalysis/getDataAnalysisData'],
    dataAnalysisData: dataAnalysis.dataAnalysisData
  }
}

@connect(mapStateToProps)
class DataAnalysis extends Component {
  state = {
    dataAnalysisData: {}
  }
  componentDidMount () {
    this.props.dispatch({ type: 'dataAnalysis/getDataAnalysisData', callback: this.getData })
  }

  getData = (data) => {
    this.setState(() => {
      return {
        dataAnalysisData: data
      }
    })
  }

  render () {
    const { loading } = this.props
    const { courseDifficultyData, courseCategoryData, teacherTitleData } = this.state.dataAnalysisData
    return (
      <div>
        <Row gutter={24}>
          <Col span={12}>
            <div className={styles.echartsHeaderItem}></div>
          </Col>
          <Col span={12}>
            <div className={styles.echartsHeaderItem}></div>
          </Col>
        </Row>
        <div className={styles.rowWrap}>
          <Row gutter={12}>
            <Col span={8}>
              <Spin spinning={loading}>
                <div className={styles.echartsFooterItem}>
                  <HollowPieEcharts title="课程难度" chartData={courseDifficultyData} />
                </div>
              </Spin>
            </Col>
            <Col span={8}>
              <Spin spinning={loading}>
                <div className={styles.echartsFooterItem}>
                  <SolidPieEcharts title="课程类别" chartData={courseCategoryData} />
                </div>
              </Spin>
            </Col>
            <Col span={8}>
              <Spin spinning={loading}>
                <div className={styles.echartsFooterItem}>
                  <SolidPieEcharts title="教师头衔" chartData={teacherTitleData} />
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