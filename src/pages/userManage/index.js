import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Divider, Button, Icon, Spin, Modal } from 'antd'
import styles from './styles/index.less'

const columns = [
  { title: '用户名', dataIndex: 'username' },
  { title: '用户角色', dataIndex: 'userType' },
  { title: '用户邮箱', dataIndex: 'email' },
  { title: '联系电话', dataIndex: 'phone' },
  {
    title: '操作',
    dataIndex: 'id',
    render: () => (
      <div className={styles.operating}>
        <span>编辑</span>
        <Divider type="vertical" style={{ background: '#20a0ff' }} />
        <span>删除</span>
      </div>
    )
  }
]


const mapStateToProps = ({ loading, userManage }) => {
  return {
    loading: loading.effects['userManage/getTableData'],
    tableData: userManage.tableData
  }
}

@connect(mapStateToProps)
class userManage extends Component {

  state = {
    showAddUserModal: false
  }

  componentDidMount () {
    this.props.dispatch({ type: 'userManage/getTableData' })
  }

  handleShowAddUser = (flag) => {
    this.setState(() => {
      return { showAddUserModal: flag }
    })
  }

  setRowKey = (record) => record.id.toString()

  showTotal = (total) => `共有${total}个用户`

  render () {
    const { showAddUserModal } = this.state
    const { tableData, loading } = this.props
    return (
      <div>
        <div className={styles.header}>
          <p>用户管理</p>
          <Button type="primary" style={{ float: "right", marginTop: -40, width: 150 }} onClick={() => this.handleShowAddUser(true)}>
            <Icon type="plus-circle" />新增用户
          </Button>
        </div>
        <Spin spinning={loading}>
          <Table
            rowKey={this.setRowKey}
            columns={columns}
            dataSource={tableData}
            pagination={{
              size: "small",
              total: tableData.length,
              showTotal: this.showTotal,
              style: { textAlign: 'center', width: '100%' }
            }}
          />
        </Spin>
        <Modal
          footer={null}
          visible={showAddUserModal}
          onCancel={() => this.handleShowAddUser(false)}
        >
          <div>1231</div>
        </Modal>
      </div>
    )
  }
}

export default userManage