import React from 'react'
import { Layout } from 'antd'
import router from 'umi/router'
import { connect } from 'dva'
import Cookie from 'cookiejs'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalSideMenu from '@/components/GlobalSideMenu'
import GlobalFooter from '@/components/GlobalFooter'
import styles  from './index.less';

const { Content  } = Layout

const mapStateToProps = ({ global }) => {
  return {
    userInfo: global.userInfo
  }
}

@connect(mapStateToProps)
class BasicLayout extends React.Component {
  state = {
    collapsed: false
  }

  componentDidMount () {
    if (Cookie.get('uid')) {
      this.props.dispatch({ type: 'global/getUserInfo', callback: this.getUserInfoCallback })
    } else {
      router.push('/login')
    }
  }

  getUserInfoCallback = () => {
    const { pathname } = this.props.location
    const { userInfo } = this.props
    if (userInfo.utype === 101001 && (pathname === '/courseManage' || pathname === '/commentManage' || pathname === '/classifiedManage' || pathname === '/userManage')) {
      router.replace('/')
    }
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
    // console.log(this.props.userInfo)
    if (loginLayoutRoutes.includes(pathname)) {
      return (
        <div>{children}</div>
      )
    }
    return (
      <div>
        <Layout>
          <GlobalSideMenu collapsed={collapsed} />
          <Layout style={{ minHeight: '100vh' }}>
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
