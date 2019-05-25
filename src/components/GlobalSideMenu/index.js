import React, { PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { menuRoutesData } from 'routes'
import Link from 'umi/link'
import styles from './index.less'
import logo from 'images/login/logo.png'

const { Sider } = Layout
const MenuItem = Menu.Item
const getIcon = () => (
  <img className={styles.logoImg} src={logo} alt="logo" />
)

export default class SideMenu extends PureComponent {
  state = {
    collapsed: false
  }
  render () {
    const { collapsed } = this.props
    console.log(this.props)
    return (
      <div>
        <Sider className={styles.sideStyle} trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo}>
            <Link to="/">
              <Icon component={getIcon} />
              <h1>慕课推荐系统</h1>
            </Link>
          </div>
          <Menu theme="dark" mode="inline">
            {
              menuRoutesData.map( ({ path, title, iconType }) => (
                <MenuItem key={path}>
                  <Link to={path}>
                    <Icon type={iconType} />
                    <span>{title}</span>
                  </Link>
                </MenuItem>
              ))
            }
          </Menu>
        </Sider>
      </div>
    )
  }
}