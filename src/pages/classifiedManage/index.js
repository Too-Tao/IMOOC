import React, { Component } from 'react'
import { Table, Divider, Button, Icon } from 'antd'
import styles from './styles/index.less'


const tableData = [
  { id: '0', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
  { id: '1', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
  { id: '2', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
  { id: '3', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
  { id: '4', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
  { id: '5', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
  { id: '6', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
  { id: '7', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
  { id: '8', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
  { id: '9', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
  { id: '10', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
  { id: '11', courseId: '0001', courseName: 'Flutter从入门到进阶 实战携程网App', courseLevel: '高级', courseTime: '一小时三分' },
]

class ClassifiedManage extends Component {

  setRowKey = (record) => record.id.toString()

  showTotal = (total) => `共有${total}门课`

  render () {

    const columns = [
      { title: '课程ID', dataIndex: 'courseId' },
      { title: '课程名称', dataIndex: 'courseName' },
      { title: '课程等级', dataIndex: 'courseLevel' },
      { title: '课程时常', dataIndex: 'courseTime' },
      {
        title: '操作',
        dataIndex: 'id',
        render: (id, record) => (
          <div  className={styles.operating}>
            {/* <span onClick={() => this.handleEdit(record)}>编辑</span>
            <Divider type="vertical" style={{ background: '#20a0ff' }} />
            <span onClick={() => this.showRemoveModal(id, record.username)}>删除</span> */}
            <span>编辑</span>
            <Divider type="vertical" style={{ background: '#20a0ff' }} />
            <span>删除</span>
          </div>
        )
      }
    ]

    return (
      <div>
        <div className={styles.header}>
          <p>用户管理</p>
          {/* <Button type="primary" style={{ float: "right", marginTop: -40, width: 150 }} onClick={() => this.handleClickAddUser()}> */}
          <Button type="primary" style={{ float: "right", marginTop: -40, width: 150 }}>
            <Icon type="plus-circle" />新增课程
          </Button>
        </div>
        <Table
          rowKey={this.setRowKey}
          columns={columns}
          dataSource={tableData}
          pagination={{
            total: tableData.length,
            showTotal: this.showTotal,
            style: { textAlign: 'center', width: '100%' }
          }}
        />
      </div>
    )
  }
}

export default ClassifiedManage
