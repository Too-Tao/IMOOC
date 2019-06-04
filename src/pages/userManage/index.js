import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Divider, Button, Icon, Spin, Modal, message } from 'antd'
import styles from './styles/index.less'
import AddUserForm from './components/addUser/index'


const mapStateToProps = ({ loading, userManage }) => {
  return {
    loading: loading.effects['userManage/getTableData'],
    tableData: userManage.tableData
  }
}

@connect(mapStateToProps)
class userManage extends Component {

  state = {
    showAddUserModal: false,
    showEditModal: false,
    isEdit: false,
    editModalData: []
  }

  componentDidMount () {
    this.props.dispatch({ type: 'userManage/getTableData' })
  }

  handleClickAddUser = () => {
    this.setState(() => {
      return {
        isEdit: false
      }
    }, () => {
      this.handleShowAddUser(true)
    })
  }

  handleShowAddUser = (flag) => {

    this.setState(() => {
      return { showAddUserModal: flag }
    })
  }


  handleEdit = (record) => {
    this.setState(() => {
      return {
        isEdit: true,
        editModalData: record
      }
    }, () => {
      this.handleShowAddUser(true)
    })
  }

  showRemoveModal = (id, username) => {
    Modal.confirm({
      title: '提示',
      okText: '确定',
      cancelText: '取消',
      content: `是否删除用户${username}`,
      onOk: () => this.handleRemove(id)
    })
  }

  handleRemove = (id) => {
    const obj = { id }
    this.props.dispatch({ type: 'userManage/removeUser', payload: obj, callback: this.removeCallback })
  }

  removeCallback = () => {
    this.props.dispatch({ type: 'userManage/getTableData' })
    message.success('成功删除该用户')
  }

  setRowKey = (record) => record.id.toString()

  showTotal = (total) => `共有${total}个用户`

  render () {
    const { showAddUserModal, editModalData, isEdit } = this.state
    const { tableData, loading } = this.props
    const columns = [
      { title: '用户名', dataIndex: 'username' },
      {
        title: '用户角色',
        dataIndex: 'userType',
        render: (userType) => (
          <div>
            {
              userType === 0
              ? <span>超级管理员</span>
              : <span>普通用户</span>
            }
          </div>
        )
      },
      { title: '用户邮箱', dataIndex: 'email' },
      { title: '联系电话', dataIndex: 'phone' },
      {
        title: '操作',
        dataIndex: 'id',
        render: (id, record) => (
          <div className={styles.operating}>
            <span onClick={ () => this.handleEdit(record)}>编辑</span>
            <Divider type="vertical" style={{ background: '#20a0ff' }} />
            <span onClick={() => this.showRemoveModal(id, record.username)}>删除</span>
          </div>
        )
      }
    ]

    return (
      <div>
        <div className={styles.header}>
          <p>用户管理</p>
          <Button type="primary" style={{ float: "right", marginTop: -40, width: 150 }} onClick={() => this.handleClickAddUser()}>
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
          <div>
            {
              isEdit
              ? <div className={styles.title}>编辑用户信息</div>
              : <div className={styles.title}>新增用户</div>
            }
            <AddUserForm handleShowAddUser={this.handleShowAddUser} isEdit={isEdit} formData={editModalData} />
          </div>
        </Modal>
      </div>
    )
  }
}

export default userManage