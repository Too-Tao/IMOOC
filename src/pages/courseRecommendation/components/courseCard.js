import React, { Component } from 'react'
import { Icon } from 'antd'
import Link from 'umi/link'
import styles from '../styles/courseCard.less'

class CourseCard extends Component {
  render () {
    const { imgUrl, title, level, members, desc, id } = this.props
    return (
      <div className={styles.courseCardWrap}>
        <Link to={`/courseDetail/${id}`}>
          <div className={styles.coursePic}>
            <img src={imgUrl} alt="img"/>
          </div>
          <div className={styles.courseMsgContent}>
            <h3>{title}</h3>
            <div className={styles.courseInfo}>
              <span>{level}</span>
              <span>
              <Icon type="user" />{members}
              </span>
            </div>
            <p className={styles.courseDesc}>
              {desc}
            </p>
          </div>
        </Link>
      </div>
    )
  }
}

export default CourseCard