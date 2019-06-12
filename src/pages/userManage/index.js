import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Divider, Button, Icon, Spin, Modal, message, Popover } from 'antd'
import styles from './styles/index.less'
import AddUserForm from './components/addUser/index'


const mapStateToProps = ({ loading, userManage, global }) => {
  return {
    loading: loading.effects['userManage/getTableData'],
    tableData: userManage.tableData,
    total: userManage.total,
    userInfo: global.userInfo
  }
}

@connect(mapStateToProps)
class userManage extends Component {

  state = {
    showAddUserModal: false,
    showEditModal: false,
    isEdit: false,
    editModalData: [],
    query: {
      page: 1,
      pageSize: 5
    }
  }

  componentDidMount () {
    const { query } = this.state
    this.getTableDataFun(query)
  }

  getTableDataFun = (params) => {
    this.props.dispatch({ type: 'userManage/getTableData', payload: params })
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
    this.props.dispatch({ type: 'userManage/getTableData', payload: this.state.query })
    message.success('成功删除该用户')
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
      const { query } = this.state
      this.getTableDataFun(query)
    })
  }

  setRowKey = (record) => record.id.toString()

  showTotal = (total) => `共有${total}个用户`

  render () {
    const { showAddUserModal, editModalData, isEdit, query } = this.state
    const { tableData, loading, total, userInfo } = this.props
    const userId = userInfo.id
    const popoverContent = (
      <div>我</div>
    )
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        render: (username, { id }) => (
          <div>
            {
              userId === id
              ? <Popover content={popoverContent}><Icon type="eye" theme="twoTone" style={{ fontSize: 18, marginRight: 10 }} />{username}</Popover>
              : <div>{username}</div>
            }
          </div>
        )
      },
      { title: '姓名', dataIndex: 'name'},
      {
        title: '用户角色',
        dataIndex: 'utype',
        render: (utype) => (
          <div>
            {
              utype === '101003'
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
          <div>
            {
              userId === record.id
              ? <span className={styles.operating} onClick={ () => this.handleEdit(record)}>编辑</span>
              : <div>
                  <span className={styles.operating} onClick={ () => this.handleEdit(record)}>编辑</span>
                  <Divider type="vertical" style={{ background: '#20a0ff' }} />
                  <span className={styles.operating} onClick={() => this.showRemoveModal(id, record.username)}>删除</span>
                </div>
            }
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
              total: total,
              showTotal: this.showTotal,
              style: { textAlign: 'center', width: '100%' },
              pageSize: query.pageSize
            }}
            onChange = {this.handleChangePage}
          />
        </Spin>
        <Modal
          footer={null}
          visible={showAddUserModal}
          onCancel={() => this.handleShowAddUser(false)}
          destroyOnClose={true}
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