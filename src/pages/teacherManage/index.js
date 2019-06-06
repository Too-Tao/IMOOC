import React, { Component } from 'react'
import Link from 'umi/link'
import { Table, Spin } from 'antd'
import { connect } from 'dva'
import styles from './styles/index.less'


const tableData = [
  { id: '0', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
  { id: '1', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
  { id: '2', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
  { id: '3', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
  { id: '4', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
  { id: '5', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
  { id: '6', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
  { id: '7', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
  { id: '8', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
  { id: '9', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
  { id: '10', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
  { id: '11', teacherId: '0001', teacherName: '哇哈哈', teacherJob: '高级前端工程师', fans: '123' },
]

const mapStateToProps = ({ loading, teacher }) => {
  return {
    loading: loading.effects['teacher/getList'],
    listData: teacher.listData
  }
}

@connect(mapStateToProps)
class TeacherManage extends Component {

  componentDidMount () {
    this.props.dispatch({ type: 'teacher/getList' })
  }

  setRowKey = (record) => record.id.toString()

  render () {
    const { list } = this.props.listData
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
            dataSource={list}
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
