import React from 'react'
import { Layout } from 'antd'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalSideMenu from '@/components/GlobalSideMenu'
import GlobalFooter from '@/components/GlobalFooter'
import styles  from './index.less';

const { Content  } = Layout

class BasicLayout extends React.Component {
  state = {
    collapsed: false
  }

  changeCollapsed = (flag) => {
    this.setState({
      collapsed: flag
    })
  }

  render() {
    const { collapsed } = this.state
    const { children, location } = this.props
    const loginLayoutRoutes = ['/login']
    const { pathname } = location
    if (loginLayoutRoutes.includes(pathname)) {
      return (
        <div>{children}</div>
      )
    }
    return (
      <div>
        <Layout>
          <GlobalSideMenu collapsed={collapsed} />
          <Layout>
            <GlobalHeader collapsed={collapsed} changeCollapsed={this.changeCollapsed} />
            <Content className={styles.content}>{children}</Content>
            <GlobalFooter />
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default BasicLayout;
