import React, { Component } from 'react'
import { Form, Input, Button, AutoComplete, message, Select } from 'antd'
import { connect } from 'dva'
import styles from './styles/index.less'
import { validatorName, validatorPassword, validatorEmail, validatorPhone } from 'utils/validator.js'
import { EMAIL_ADDRESS } from 'utils/constants.js'

const FormItem = Form.Item
const AutoCompleteOption = AutoComplete.Option
const SelectOption = Select.Option

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const rulesData = {
  usernameRules: [{ required: true, message: '请输入用户名' }, { validator: validatorName }],
  passwordRules: [{ required: true, message: '请输入密码' }, { validator: validatorPassword }],
  emailRules: [{ required: true, message: '请输入邮箱地址' }, { validator: validatorEmail }],
  phoneRules: [{ required: true, message: '请输入联系电话' }, { validator: validatorPhone }]
}

const mapStateToProps = ({ loading, userManage }) => {
  return {
    loading: loading.effects['userManage/addUser'],
  }
}

@connect(mapStateToProps)
class AddUser extends Component {

  state = {
    autoCompleteResult: []
  }

  comparePassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value !== getFieldValue('password_register')) {
      callback('两次密码输入不一致')
    } else {
      callback()
    }
  }

  handleSubmitAddUser = (e) => {
    const { form, dispatch, isEdit } = this.props
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        if (isEdit) {
          dispatch({ type: 'userManage/editUserMsg', payload: values, callback: this.dispatchCallback })
        } else {
          delete values.confirm_password_register
          dispatch({ type: 'userManage/addUser', payload: values, callback: this.dispatchCallback })
        }
      }
    })
  }

  dispatchCallback = () => {
    const { isEdit } = this.props
    this.handleCancel()
    this.props.dispatch({ type: 'userManage/getTableData' })
    if (isEdit) {
      message.success('修改用户信息成功')
    } else {
      message.success('添加用户成功')
    }
  }

  handleCancel = () => {
    this.props.handleShowAddUser(false)
    this.props.form.resetFields()
  }

  handleSelectEmail = (value) => {
    let autoCompleteResult
    if (!value) {
      autoCompleteResult = []
    } else {
      autoCompleteResult = EMAIL_ADDRESS.map(item => (
        `${value}${item}`
      ))
    }
    this.setState(() => {
      return {
        autoCompleteResult
      }
    })
  }

  render () {
    const { autoCompleteResult } = this.state
    const { isEdit, formData } = this.props
    const { getFieldDecorator } = this.props.form
    const { usernameRules, passwordRules, emailRules, phoneRules } = rulesData
    const emailOptions = autoCompleteResult.map((item) => (
      <AutoCompleteOption key={item}>{item}</AutoCompleteOption>
    ))

    return (
      <Form {...formLayout} colon={false} hideRequiredMark={true} onSubmit={this.handleSubmitAddUser}>
        <FormItem label="用户名">
          {getFieldDecorator('username', {
              rules: usernameRules,
              validateTrigger: 'onBlur',
              initialValue: isEdit ? formData.username : null
            })(
                <Input disabled={isEdit} />
            )
          }
        </FormItem>
        {
          isEdit
          ? <FormItem label="用户角色">
            {getFieldDecorator('userType', {
              initialValue: formData.userType
            })(
                <Select>
                  <SelectOption value={0}>超级管理员</SelectOption>
                  <SelectOption value={1}>普通用户</SelectOption>
                </Select>
              )
            }
            </FormItem>
          : <div>
              <FormItem label="密码">
                {getFieldDecorator('password_register', {
                    rules: passwordRules,
                    validateTrigger: 'onBlur'
                  })(
                    <Input type="password" />
                  )
                }
              </FormItem>
              <FormItem label="确认密码">
                {getFieldDecorator('confirm_password_register', {
                    rules: [{ required: true, message: '请确认密码' }, { validator: this.comparePassword }],
                    validateTrigger: 'onBlur'
                  })(
                    <Input type="password" />
                  )
                }
              </FormItem>
            </div>
        }
        <FormItem label="邮箱">
          {getFieldDecorator('email', {
              rules: emailRules,
              validateTrigger: 'onBlur',
              initialValue: isEdit ? formData.email : null
            })(
              <AutoComplete
                dataSource={emailOptions}
                onChange={this.handleSelectEmail}
              >
                <Input />
              </AutoComplete>
            )

          }
        </FormItem>
        <FormItem label="联系电话">
        {getFieldDecorator('phone', {
            rules: phoneRules,
            validateTrigger: 'onBlur',
            initialValue: isEdit ? formData.phone : null
          })(
            <Input />
          )

        }
        </FormItem>
        <FormItem className={styles.buttonStyle}>
          <Button type="primary" htmlType="submit">{isEdit ? '确认' : '添加'}</Button>
          <Button onClick={() => this.handleCancel(false)}>取消</Button>
        </FormItem>
      </Form>
    )
  }
}

const AddUserForm = Form.create({ name: 'addUser' })(AddUser)

export default AddUserForm