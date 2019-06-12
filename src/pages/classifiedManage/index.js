import React, { Component } from 'react'
import { connect } from 'dva'
import { Table } from 'antd'
import styles from './styles/index.less'

const mapStateToProps = ({ loading, classified }) => {
  return {
    loading: loading.effects['classified/getTableData'],
    tableData: classified.tableData
  }
}

@connect(mapStateToProps)
class ClassifiedManage extends Component {

  componentDidMount () {
    this.props.dispatch({ type: 'classified/getTableData' })
  }

  setRowKey = (record) => record.id.toString()

  showTotal = (total) => `共有${total}分类`

  render () {
    const { tableData } = this.props
    const columns = [
      { title: '课程分类ID', dataIndex: 'id' },
      { title: '课程分类名称', dataIndex: 'name_info' },
    ]

    return (
      <div>
        <div className={styles.header}>
          <p>课程分类管理</p>
        </div>
        <Table
          rowKey={this.setRowKey}
          columns={columns}
          dataSource={tableData}
          pagination={{
            total: tableData.length,
            showTotal: this.showTotal,
            style: { textAlign: 'center', width: '100%' }
          }}
        />
      </div>
    )
  }
}

export default ClassifiedManage
