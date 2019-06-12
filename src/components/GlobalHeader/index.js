import React, { PureComponent } from 'react'
import { Layout, Icon, Popover , Modal } from 'antd'
import { connect } from 'dva'
import styles from './index.less'

const { Header } = Layout

const mapStateToProps = ({ loading, global }) => {
  return {
    loading: loading.effects['global/logout'],
    userInfo: global.userInfo
  }
}
@connect(mapStateToProps)
class GlobalHeader extends PureComponent {

  toggle = () => {
    this.props.changeCollapsed(!this.props.collapsed)
  }

  changeVisible = (flag) => {
    this.setState({
      visible: flag
    })
  }

  handleLogout = () => {
    this.props.dispatch({ type: 'global/logout' })
  }

  modalConfig = () => {
    Modal.confirm({
      title: '提示',
      content: '是否确认退出登陆？',
      okText: '确认',
      cancelText: '取消',
      onOk: this.handleLogout
    })
  }
  render () {
    const { collapsed, userInfo } = this.props
    const { name, utype } = userInfo
    const popoverContent = (
      <div>当前用户为{ utype === '101003' ? '超级管理员' : '普通用户'}</div>
    )
    return (
      <Header className={styles.HeaderStyle}>
        <span onClick={this.toggle}>
          <Icon
            className={styles.trigger}
            type={ collapsed ? 'menu-unfold' : 'menu-fold'}
          />
        </span>
        <span className={styles.headerRight}>
          <Popover  content={popoverContent}>
            <span>
              <span className={styles.userPic}>
                <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="userPic"/>
              </span>
              <span>{ !!name ? name : '用户一' }</span>
            </span>
          </Popover >
          <span onClick={this.modalConfig}>
            <Icon type="logout" />
          </span>
        </span>
      </Header>
    )
  }
}

export default GlobalHeader