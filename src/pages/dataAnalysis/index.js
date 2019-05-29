import React, { Component } from 'react'
import { Row, Col } from 'antd'
import styles from './styles/index.less'

class DataAnalysis extends Component {
  render () {
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
              <div className={styles.echartsFooterItem}></div>
            </Col>
            <Col span={8}>
              <div className={styles.echartsFooterItem}></div>
            </Col>
            <Col span={8}>
              <div className={styles.echartsFooterItem}></div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default DataAnalysis