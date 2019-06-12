import React, { Component } from 'react'
import Link from 'umi/link'
import { Table, Spin } from 'antd'
import { connect } from 'dva'
import styles from './styles/index.less'

const mapStateToProps = ({ loading, teacher }) => {
  return {
    loading: loading.effects['teacher/getList'],
    listData: teacher.listData
  }
}

@connect(mapStateToProps)
class TeacherManage extends Component {

  state = {
    query: {
      size: 10
    }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'teacher/getList', payload: this.state.query })
  }

  setRowKey = (record) => record.id.toString()

  render () {
    const { listData } = this.props
    const { loading } = this.props
    const columns = [
      { title: '教师ID', dataIndex: 'id' },
      {
        title: '教师名称',
        dataIndex: 'teacherName',
        render: (teacherName, { teacherPic }) => (
          <div className={styles.teacherNameWrap}>
            <span><img src={teacherPic} alt="img" /></span>
            <span>{teacherName}</span>
          </div>
        )
      },
      { title: '教师职称', dataIndex: 'job' },
      { title: '粉丝数', dataIndex: 'fans' },
      {
        title: '操作',
        dataIndex: 'operating',
        render: (_, { id }) => (
          <div  className={styles.operating}>
            <Link to={`/teacherDetail/${id}`}>教师详情</Link>
          </div>
        )
      }
    ]

    return (
      <div>
        <div className={styles.header}>
          <p>热门教师推荐</p>
        </div>
        <Spin spinning={loading}>
          <Table
            rowKey={this.setRowKey}
            columns={columns}
            dataSource={listData instanceof Array ? listData : []}
            pagination={{
              style: { textAlign: 'center', width: '100%' }
            }}
          />
        </Spin>
      </div>
    )
  }
}

export default TeacherManage
