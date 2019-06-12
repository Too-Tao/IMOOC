import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Divider, Button, Icon, Popover, Spin, Modal, message } from 'antd'
import styles from './styles/index.less'
import CommonModalForm from './components/commonModal';


const mapStateToProps = ({ loading, courseManage }) => {
  return {
    loading: loading.effects['courseManage/getCourseData'],
    tableData: courseManage.tableData,
    total: courseManage.total
  }
}

@connect(mapStateToProps)
class CourseManage extends Component {

  state = {
    isEdit: false,
    editData: [],
    visible: false,
    query: {
      page: 1,
      pageSize: 10
    }
  }

  componentDidMount () {
    this.getTableData()
  }

  getTableData = () => {
    const { query } = this.state
    this.props.dispatch({ type: 'courseManage/getCourseData', payload: query })
  }

  handleChangePage = (pagination) => {
    const { current, pageSize } = pagination
    this.setState(() => {
      return {
        query: {
          page: current,
          pageSize
        }
      }
    }, () => {
      this.getTableData()
    })
  }

  handelVisible = (flag) => {
    this.setState(() => {
      return {
        visible: flag
      }
    })
  }

  handleClickAddCourse = () => {
    this.setState(() => {
      return {
        isEdit: false,
      }
    })
    this.handelVisible(true)
  }

  handleEdit = (record) => {
    this.setState(() => {
      return {
        isEdit: true,
        editData: record
      }
    }, () => {
      this.handelVisible(true)
    })
  }

  showRemoveCourse = (id, courseName) => {
    Modal.confirm({
      title: '提示',
      okText: '确定',
      cancelText: '取消',
      content: `是否删除${courseName}这门课程`,
      onOk: () => this.handleRemoveCourse(id)
    })
  }

  handleRemoveCourse = (id) => {
    const obj = {
      id
    }
    this.props.dispatch({ type: 'courseManage/removeCourse', payload: obj, callback: this.removeCallback })
  }

  removeCallback = () => {
    message.success('删除成功')
    this.getTableData()
  }

  setRowKey = (record) => record.id.toString()

  showTotal = (total) => `共有${total}门课`

  render () {
    const { tableData, total, loading } = this.props
    const { visible, isEdit, editData } = this.state
    const columns = [
      { title: '课程ID', dataIndex: 'id' },
      {
        title: '课程名称',
        dataIndex: 'courseName',
        render: (courseName, { courseDescribe }) => (
          <Popover content={
            <div>{courseDescribe}</div>
          }>
            {courseName}
          </Popover>
        )
      },
      { title: '课程等级', dataIndex: 'grade' },
      { title: '课程时常', dataIndex: 'time' },
      {
        title: '操作',
        dataIndex: 'opt',
        render: (_, record) => (
          <div  className={styles.operating}>
            <span onClick={() => this.handleEdit(record)}>编辑</span>
            <Divider type="vertical" style={{ background: '#20a0ff' }} />
            <span onClick={() => this.showRemoveCourse(record.id, record.courseName)}>删除</span>
          </div>
        )
      }
    ]

    return (
      <div>
        <div className={styles.header}>
          <p>课程管理</p>
          <Button type="primary" style={{ float: "right", marginTop: -40, width: 150 }} onClick={() => this.handleClickAddCourse()}>
            <Icon type="plus-circle" />新增课程
          </Button>
        </div>
        <Spin spinning={loading}>
        <Table
          rowKey={this.setRowKey}
          columns={columns}
          dataSource={tableData}
          pagination={{
            size: "small",
            total: total,
            showTotal: this.showTotal,
            style: { textAlign: 'center', width: '100%' }
          }}
          onChange={this.handleChangePage}
        />
        </Spin>
        <Modal
          footer={null}
          visible={visible}
          onCancel={() => this.handelVisible(false)}
          destroyOnClose={true}
        >
          <div>{isEdit ? '编辑课程' : '新增课程' }</div>
          <CommonModalForm handelVisible={this.handelVisible} editData={editData} isEdit={isEdit} getTableData={this.getTableData} />
        </Modal>
      </div>
    )
  }
}

export default CourseManage