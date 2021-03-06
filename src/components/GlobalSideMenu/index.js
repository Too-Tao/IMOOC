import React, { PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { menuRoutesData } from 'routes'
import { connect } from 'dva'
import Link from 'umi/link'
import styles from './index.less'
import logo from 'images/login/logo.png'

const { Sider } = Layout
const MenuItem = Menu.Item
const getIcon = () => (
  <img className={styles.logoImg} src={logo} alt="logo" />
)

const mapStateToProps = ({ global }) => {
  return {
    userInfo: global.userInfo
  }
}

@connect(mapStateToProps)
class SideMenu extends PureComponent {
  state = {
    collapsed: false
  }

  componentDidMount () {

  }

  filterRoleMenu = (menuRoutesData) => {
    const { userInfo } = this.props
    const { utype } = userInfo
    return this.filterMethods(menuRoutesData, utype)
  }

  filterMethods = (menuRoutesData, utype) => {
    // console.log(utype)
    return menuRoutesData.filter(item => {
      let { exclude } = item
      return !!exclude && exclude === utype ? null : item
    })
  }

  render () {
    const { collapsed } = this.props
    const menuRoutesDataFilter = this.filterRoleMenu(menuRoutesData)
    // console.log(menuRoutesDataFilter)
    return (
      <div>
        <Sider className={styles.sideStyle} trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo}>
            <Link to="/">
              <span>
                <Icon component={getIcon} />
              </span>
              <h1>慕课推荐系统</h1>
            </Link>
          </div>
          <Menu theme="dark" mode="inline">
            {
              menuRoutesDataFilter.map( ({ path, title, iconType, noShowInMenu }) => (
                !noShowInMenu
                ?
                <MenuItem key={path}>
                  <Link to={path}>
                    <Icon type={iconType} />
                    <span>{title}</span>
                  </Link>
                </MenuItem>
                : null
              ))
            }
          </Menu>
        </Sider>
      </div>
    )
  }
}

export default SideMenu