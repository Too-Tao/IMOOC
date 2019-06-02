import React, { PureComponent } from 'react'
import { Layout, Icon, Dropdown, Menu, Modal } from 'antd'
import { connect } from 'dva'
import styles from './index.less'

const { Header } = Layout
const MenuItem = Menu.Item
const menu = (
  <Menu>
    <MenuItem>
      <a href="/">
        <Icon type="user" />
        <span className={styles.dropdownSpan}>个人中心</span>
      </a>
    </MenuItem>
    <MenuItem>
      <a href="/">
        <Icon type="setting" />
        <span className={styles.dropdownSpan}>个人设置</span>
      </a>
    </MenuItem>
  </Menu>
)

const mapStateToProps = ({ loading, globalHeader }) => {
  return {
    loading: loading.effects['globalHeader/logout']
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

  modalConfig = () => {
    Modal.confirm({
      title: '提示',
      content: '是否确认退出登陆？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => { this.props.dispatch({ type: 'globalHeader/logout' }) }
    })
  }
  render () {
    const { collapsed } = this.props
    return (
      <Header className={styles.HeaderStyle}>
        <span onClick={this.toggle}>
          <Icon
            className={styles.trigger}
            type={ collapsed ? 'menu-unfold' : 'menu-fold'}
          />
        </span>
        <span className={styles.headerRight}>
          <Dropdown overlay={menu} placement="bottomCenter">
            <span>
              <span className={styles.userPic}>
                <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="userPic"/>
              </span>
              <span>Jack Ma</span>
            </span>
          </Dropdown>
          <span onClick={this.modalConfig}>
            <Icon type="logout" />
          </span>
        </span>
      </Header>
    )
  }
}

export default GlobalHeader