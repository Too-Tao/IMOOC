import React, { Component } from 'react'
import { Popover, Rate, Icon, Spin, Pagination, Input, Button, Modal, message } from 'antd'
import { connect } from 'dva'
import styles from './styles/index.less'

const { TextArea } = Input

const mapStateToProps = ({ loading, detail, global }) => {
  return {
    addCommentLoading: loading.effects['detail/addComment'],
    detailDataLoading: loading.effects['detail/getDetailData'],
    commentLoading: loading.effects['detail/getCommentData'],
    detailData: detail.detailData,
    commentData: detail.commentData,
    total: detail.total,
    userInfo: global.userInfo,
    commentIds: detail.commentIds
  }
}
@connect(mapStateToProps)
class CourseDetail extends Component {

  state = {
    visible: false,
    removeLoadingState: false,
    liked: false,
    likedId: [],
    comment: '',
    mark: 0,
    query: {
      page: 1,
      pageSize: 10
    }
  }

  componentDidMount () {
    const { dispatch, match } = this.props
    dispatch({ type: 'detail/getDetailData', payload: match.params })
    this.getPageCommentData()
  }

  getPageCommentData = () => {
    const { query } = this.state
    const { dispatch, match } = this.props
    const obj = {
      ...query,
      courseId: match.params.id
    }
    dispatch({ type: 'detail/getCommentData', payload: obj })
  }

  showTotal = (total) => `共有${total}条用户评论`

  handleChangePage = (page) => {
    this.setState(() => {
      return {
        query: {
          page,
          pageSize: 10
        }
      }
    }, () => this.getPageCommentData())
  }

  handleLike = (id) => {
    const { likedId } = this.state
    if (!likedId.includes(id)) {
      const obj = {
        commentId: id
      }
      this.props.dispatch({ type: 'detail/like', payload: obj, callback: () => this.likeCallback(id) })
    }
  }

  likeCallback = (id) => {
    const { commentId } = this.props
    commentId.push(id)
    this.setState(() => {
      return {
        liked: true,
      }
    }, () => {
      message.success('点赞成功')
    })
  }

  showRemoveCourse = (id) => {
    Modal.confirm({
      title: '提示',
      okText: '确定',
      cancelText: '取消',
      content: '是否删除这条评论',
      onOk: () => this.handleRemoveComment(id)
    })
  }

  handleRemoveComment = (id) => {
    this.setState(() => {
      return {
        removeLoadingState: true
      }
    })
    const obj = {
      id
    }
    this.props.dispatch({ type: 'detail/removeComment', payload: obj, callback: this.removeSuccessCallback })
  }

  removeSuccessCallback = () => {
    this.setState(() => {
      return {
        removeLoadingState: false
      }
    }, () => this.getPageCommentData())
    message.success('删除成功')
  }

  handleChangeVisible = (flag) => {
    this.setState(() => {
      return {
        visible: flag
      }
    })
  }

  handleWriteComment = (e) => {
    let comment = e.target.value
    this.setState(() => {
      return {
        comment
      }
    })
  }

  handleAddComment = (id) => {
    const { comment, mark } = this.state
    if (comment !== '') {
      const obj = {
        courseId: id,
        commentContent: comment,
        mark
      }
      this.props.dispatch({ type: 'detail/addComment', payload: obj, callback: this.addCommentCallback })
    } else {
      message.info('请输入评论')
    }
  }

  handleChangeStar = (value) => {
    this.setState(() => {
      return {
        mark: value
      }
    })
  }

  addCommentCallback = () => {
    this.handleChangeVisible(false)
    message.success('评论添加成功')
    this.getPageCommentData()
  }

  render () {
    console.log(this.props)
    const { visible, removeLoadingState, liked } = this.state
    const { commentData,
            detailData,
            total,
            detailDataLoading,
            commentLoading,
            addCommentLoading,
            userInfo,
            commentIds
          } = this.props
    const { name } = userInfo
    const { courseName,
            teacherPic,
            teacherName,
            grade,
            time,
            num,
            easyUnderstandScore,
            studyHref,
            contentScore,
            overallScore,
            clearLogicScore,
            id
          } = detailData
      const content = (
        <div className={styles.popverWrap}>
          <div className={styles.memberNum}>{total}人评价</div>
          <div className={styles.memberScore}>
            <div>{contentScore}</div>
            <div>{overallScore}</div>
            <div>{clearLogicScore}</div>
          </div>
          <div className={styles.memberBriefComment}>
            <div>内容使用</div>
            <div>简介易懂</div>
            <div>逻辑清晰</div>
          </div>
        </div>
      )
    return (
      <div>
        <Spin spinning={detailDataLoading}>
        <div className={styles.headWrap}>
          <div className={styles.title}>{courseName}</div>
          <div className={styles.detailContent}>
            <div className={styles.avatar}>
              <img src={teacherPic} alt="avatar"/>
            </div>
            <div className={styles.name}>{teacherName}</div>
            <div className={styles.desc}>
              <span>难度</span>
              <span>{grade}</span>
            </div>
            <div className={styles.desc}>
              <span>时常</span>
              <span>{time}</span>
            </div>
            <div className={styles.desc}>
              <span>学习人数</span>
              <span>{num}</span>
            </div>
            <div className={styles.desc + " " + styles.clearContent}>
              <span>综合评分</span>
              <Popover content={content}>
                <span className={styles.score}>{easyUnderstandScore}</span>
              </Popover>
            </div>
            <div className={styles.toLearning}><a href={studyHref} target={studyHref} rel="nofollow me noopener noreferrer" >开始学习</a></div>
          </div>
        </div>
        </Spin>
        <div className={styles.contentWrap}>
          <div className={styles.overallRatingInfo}>
            <div className={styles.overallRatingTitle + " " + styles.l}>综合<br />评分</div>
            <div className={styles.overallRatingScore + " " + styles.l}>{easyUnderstandScore}</div>
            <div className={styles.star + " " + styles.l}>
              <Rate disabled allowHalf value={easyUnderstandScore} count={10} />
            </div>
            <ul className={styles.overallRatingUl}>
              <li>
                内容实用<span>{contentScore}</span>
              </li>
              <li>
                简洁易懂<span>{overallScore}</span>
              </li>
              <li>
                逻辑清晰<span>{clearLogicScore}</span>
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
              <Button type="primary" onClick={() => this.handleChangeVisible(true)} style={{ float: 'right' }}>我要评论</Button>
          </div>
          <Spin spinning={commentLoading || removeLoadingState}>
            {
              commentData.length !== 0
              ? commentData.map(({ id, content, userPic, userName, commentTime, voteSize, mark }) => (
                <div className={styles.evaluationList} key={id}>
                  <div className={styles.evaluation}>
                    <div className={styles.evaluationCon}>
                      <span className={styles.userAvatar}>
                        {
                          userPic === null
                          ? <img src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' alt="userAvatar"/>
                          : <img src={userPic} alt="userAvatar"/>
                        }
                      </span>
                      <div className={styles.evaluationComment}>
                        <div className={styles.commentHeader}>
                          <span>{userName}</span>
                          <div className={styles.commentStarWrap}>
                            <Rate disabled allowHalf value={mark} style={{ fontSize: 8 }} count={10} />
                            <span>{mark}分</span>
                          </div>
                        </div>
                        <p className={styles.commentContent}>{content}</p>
                        <div className={styles.commentFooter}>
                          {/* <span className={styles.likeWrap} onClick={() => this.handleLike(id)}>
                            {
                              commentIds.includes(id)
                              ?  <Icon type="like" style={{ fontSize: 15, color: '#1890FF' }} />
                              :  <Icon type="like" style={{ fontSize: 15 }} />
                            }
                            <span>{voteSize}</span>
                          </span> */}
                          <span className={styles.time}>
                            时间：{commentTime}
                          </span>
                        </div>
                        <div>
                          {
                            userName === name
                            ? <div className={styles.remove} onClick={() => this.showRemoveCourse(id)}>删除</div>
                            : null
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              : null
            }
          </Spin>
          <Pagination
            size='small'
            total={total}
            showTotal={this.showTotal}
            style={{ textAlign: 'center', width: '100%', marginTop: 30 }}
            onChange={this.handleChangePage}
          />
          <Modal
            title="快来添加你的评论吧"
            visible={visible}
            onOk={() => this.handleAddComment(id)}
            onCancel={() => this.handleChangeVisible(false)}
            okText="提交"
            cancelText="取消"
            destroyOnClose={true}
            confirmLoading={addCommentLoading}
          >
            你的评分：<Rate onChange={this.handleChangeStar} count={10} />
            <TextArea
              style={{ height: 150 }}
              onChange={(e) => this.handleWriteComment(e)}
            />
          </Modal>
        </div>
      </div>
    )
  }
}

export default CourseDetail