import React, { Component } from 'react'
import { connect } from 'dva'
import { Button, Form, Input, Select, message } from 'antd'
import { DIRECTION, DIRECTION_DETAIL } from 'utils/constants.js'
import styles from './styles/index.less'

const FormItem = Form.Item
const TextArea = Input.TextArea
const { Option } = Select
const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const mapStateToProps = ({ loading, courseManage }) => {
  return {
    loading: loading.effects['courseManage/addCourse'],
  }
}

@connect(mapStateToProps)
class commonModal extends Component {

  state = {
    buttonLoading: false,
    direction: DIRECTION_DETAIL[DIRECTION[0].id],
    directionDetail: DIRECTION_DETAIL[DIRECTION[0].id][0].id
  }

  handleSubmitAddCourse = (e) => {
    e.preventDefault()
    const { form, isEdit, editData } = this.props
    const { id } = editData
    form.validateFields((err, values) => {
      if (!err) {
        this.setState(() => {
          return {
            buttonLoading: true
          }
        })
        if (isEdit) {
          const obj = {
            id,
            ...values
          }
          this.props.dispatch({ type: 'courseManage/editCourse', payload: obj, callback: this.courseCallback })
        } else {
          this.props.dispatch({ type: 'courseManage/addCourse', payload: values, callback: this.courseCallback })
        }
      }
    })
  }

  courseCallback = (flag) => {
    const { isEdit } = this.props
    if (flag) {
      this.setState(() => {
        return {
          buttonLoading: false
        }
      }, () => {
        message.success(isEdit ? '编辑成功' : '添加成功')
        this.props.handelVisible(false)
        this.props.getTableData()
      })
    } else {
      this.setState(() => {
        return {
          buttonLoading: false
        }
      }, () => {
        message.error(isEdit ? '编辑失败' : '添加失败')
      })
    }
  }

  handleCancel = () => {
    this.props.handelVisible(false)
    this.props.form.resetFields()
  }

  handleDirectionChange = (value) => {
    const i = DIRECTION.findIndex( item => {
      return item.id === value
    })
    this.setState(() => {
      return {
        direction: DIRECTION_DETAIL[DIRECTION[i].id],
        directionDetail: DIRECTION_DETAIL[DIRECTION[i].id][0].id
      }
    })
  }

  handleDirectionDetailChange = (value) => {
    const valueArr = value.split('-')
    const val = `1-${valueArr[1]}`
    this.setState(() => {
      return {
        directionDetail: DIRECTION_DETAIL[val][0].id
      }
    })
  }

  getEditStNameInfo = (value) => {
    const valueArr = value.split('-')
    const val = `1-${valueArr[1]}`
    const data = DIRECTION_DETAIL[val][valueArr[2]-1].name_info
    return data
  }

  render () {
    const { buttonLoading, direction, directionDetail } = this.state
    const { form, editData, isEdit } = this.props
    const { getFieldDecorator } = form
    const editSt = isEdit ? this.getEditStNameInfo(editData.st) : null
    return (
      <Form {...formLayout} colon={false} hideRequiredMark={true} onSubmit={this.handleSubmitAddCourse}>
        <FormItem label="课程名">
          {getFieldDecorator('courseName', {
            rules: [{ required: true, message: '请输入课程名' }],
            validateTrigger: 'onBlur',
            initialValue: isEdit ? editData.courseName : null
          })(
            <Input  />
          )
          }
        </FormItem>
        <FormItem label="课程描述">
          {getFieldDecorator('courseDescribe', {
            rules: [{ required: true, message: '请输入课程描述' }],
            validateTrigger: 'onBlur',
            initialValue: isEdit ? editData.courseDescribe : null
          })(
            <TextArea style={{ height: 60 }} />
          )
          }
        </FormItem>
        <div className={styles.changeFormItemStyle}>
          <FormItem label="课程类别">
            {getFieldDecorator('mt', {
              rules: [{ required: true }],
              validateTrigger: 'onBlur',
              initialValue: isEdit ? editData.mt : DIRECTION[0].id
            })(
              <Select
                style={{ width: 130 }}
                onChange={this.handleDirectionChange}
              >
                {
                  DIRECTION.map( ({ id, name_info }) => (
                    <Option key={id}>{name_info}</Option>
                  ))
                }
              </Select>
            )
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('st', {
                rules: [{ required: true }],
                validateTrigger: 'onBlur',
                initialValue: isEdit ? editSt : directionDetail
              })(
                <Select
                  style={{ width: 130 }}
                  onChange={this.handleDirectionDetailChange}
                >
                  {
                    direction.map( ({ id, name_info }) => (
                      <Option key={id}>{name_info}</Option>
                    ))
                  }
                </Select>
            )
            }
          </FormItem>
        </div>
        <FormItem label="课程等级">
          {getFieldDecorator('grade', {
            rules: [{ required: true }],
            validateTrigger: 'onBlur',
            initialValue: isEdit ? editData.grade :'入门'
          })(
            <Select>
              <Option value='入门'>入门</Option>
              <Option value='初级'>初级</Option>
              <Option value='高级'>高级</Option>
            </Select>
          )
          }
        </FormItem>
        <FormItem label="课程时常">
          {getFieldDecorator('time', {
            rules: [{ required: true, message: '请输入课程时常' }],
            validateTrigger: 'onBlur',
            initialValue: isEdit ? editData.time : null
          })(
            <Input placeholder="请输入*时*分"/>
          )
          }
        </FormItem>
        <div className={styles.footerWrap}>
          <Button type="primary" loading={buttonLoading} htmlType="submit">确定</Button>
          <Button onClick={() => this.handleCancel(false)}>取消</Button>
        </div>
      </Form>
    )
  }
}

const commonModalForm = Form.create({ name: 'commonModal' })(commonModal)

export default commonModalForm