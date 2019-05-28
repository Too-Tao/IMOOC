import React, { Component } from 'react'
import { Popover, Rate, Icon  } from 'antd'
import styles from './styles/index.less'

const content = (
  <div className={styles.popverWrap}>
    <div className={styles.memberNum}>91089人评价</div>
    <div className={styles.memberScore}>
      <div>9.8</div>
      <div>9.5</div>
      <div>9.2</div>
    </div>
    <div className={styles.memberBriefComment}>
      <div>内容使用</div>
      <div>简介易懂</div>
      <div>逻辑清晰</div>
    </div>
  </div>
)

class CourseDetail extends Component {
  render () {
    return (
      <div>
        <div className={styles.headWrap}>
          <div className={styles.title}>初识HTML+CSS</div>
          <div className={styles.detailContent}>
            <div className={styles.avatar}>
              <img src="http://img1.mukewang.com/5b88f1f50001688401500150-80-80.jpg" alt="avatar"/>
            </div>
            <div className={styles.name}>慕课官方账号</div>
            <div className={styles.desc}>
              <span>难度</span>
              <span>入门</span>
            </div>
            <div className={styles.desc}>
              <span>时常</span>
              <span>9小时18分</span>
            </div>
            <div className={styles.desc}>
              <span>学习人数</span>
              <span>1035848</span>
            </div>
            <div className={styles.desc + " " + styles.clearContent}>
              <span>综合评分</span>
              <Popover content={content}>
                <span className={styles.score}>9.5</span>
              </Popover>
            </div>
            <div className={styles.toLearning}><a href="">开始学习</a></div>
          </div>
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.overallRatingInfo}>
            <div className={styles.overallRatingTitle + " " + styles.l}>综合<br />评分</div>
            <div className={styles.overallRatingScore + " " + styles.l}>9.5</div>
            <div className={styles.star + " " + styles.l}>
              <Rate disabled defaultValue={5} />
            </div>
            <ul className={styles.overallRatingUl}>
              <li>
                内容实用<span>9.8</span>
              </li>
              <li>
                简洁易懂<span>9.5</span>
              </li>
              <li>
                逻辑清晰<span>9.2</span>
              </li>
            </ul>
          </div>
          <div className={styles.typeTitle}>
              <em>学</em>
              /
              <em>员</em>
              /
              <em>评</em>
              /
              <em>价</em>
          </div>
          <div className={styles.evaluationList}>
            <div className={styles.evaluation}>
              <div className={styles.evaluationCon}>
                <a className={styles.userAvatar} href="https://www.imooc.com/u/4063493/courses">
                  <img src="http://img2.mukewang.com/57e7e7190001d60f01000100-40-40.jpg" alt="userAvatar"/>
                </a>
                <div className={styles.evaluationComment}>
                  <div className={styles.commentHeader}>
                    <a href="https://www.imooc.com/u/4063493/courses">每天学10小时</a>
                    <div className={styles.commentStarWrap}>
                      <Rate disabled defaultValue={5} style={{ fontSize: 12 }} />
                      <span>10分</span>
                    </div>
                  </div>
                  <p className={styles.commentContent}>前面还好，看到最后的时候就感觉有点乱了，下次再看吧</p>
                  <div className={styles.commentFooter}>
                    <span className={styles.likeWrap}>
                      <Icon type="like" style={{ fontSize: 15 }} />
                      <span>0</span>
                    </span>
                    <span className={styles.time}>
                      时间：9小时前
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CourseDetail