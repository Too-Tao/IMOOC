import React from 'react'
import styles from './index.css';

class BasicLayout extends React.Component {
  render() {
    const { children, location } = this.props
    const loginLayoutRoutes = ['/login']
    const { pathname } = location
    if (loginLayoutRoutes.includes(pathname)) {
      return (
        <div>{children}</div>
      )
    }
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to umi!</h1>
        {children}
      </div>
    )
  }
}

export default BasicLayout;
