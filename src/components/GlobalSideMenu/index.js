import React, { PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'
import styles from './index.less'
import logo from 'images/login/logo.png'

const { Sider } = Layout
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const getIcon = () => (
  <img className={styles.logoImg} src={logo} alt="logo" />
)

export default class SideMenu extends PureComponent {
  state = {
    collapsed: false
  }
  render () {
    const { collapsed } = this.props
    return (
      <div>
        <Sider className={styles.sideStyle} trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo}>
            <a href="/">
              <Icon component={getIcon} />
              <h1>慕课推荐系统</h1>
            </a>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <MenuItem key="1">
              <Icon type="home" />
              <span>课程推荐</span>
            </MenuItem>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="video-camera" />
                  <span>课程管理</span>
                </span>
              }
            >
              <MenuItem key="2">
                <span>全文检索</span>
              </MenuItem>
              <MenuItem key="3">
                <span>分类查询</span>
              </MenuItem>
              <MenuItem key="4">
                <span>查询课程</span>
              </MenuItem>
            </SubMenu>
            <MenuItem key="5">
              <Icon type="area-chart" />
              <span>数据分析</span>
            </MenuItem>
            <MenuItem key="6">
              <Icon type="message" />
              <span>评论管理</span>
            </MenuItem>
            <MenuItem key="7">
              <Icon type="read" />
              <span>分类管理</span>
            </MenuItem>
            <MenuItem key="8">
              <Icon type="user" />
              <span>用户管理</span>
            </MenuItem>
          </Menu>
        </Sider>
      </div>
    )
  }
}