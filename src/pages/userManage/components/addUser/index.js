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
  nameRules: [{ required: true, message: '请输入你的姓名' }, { validator: validatorName }],
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
    autoCompleteResult: [],
    buttonLoading: false,
    query: {
      page: 1,
      pageSize: 5
    }
  }

  comparePassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value !== getFieldValue('password')) {
      callback('两次密码输入不一致')
    } else {
      callback()
    }
  }

  handleSubmitAddUser = (e) => {
    e.preventDefault()
    this.submitFormData()
  }

  submitFormData = () => {
    const { form, dispatch, isEdit, formData } = this.props
    const { id } = formData
    form.validateFields((err, values) => {
      if (!err) {
        const obj = {
          id,
          ...values
        }

        // const formDataValue = new FormData(obj)
        this.setState(() => {
          return {
            buttonLoading: true
          }
        }, () => {
          if (isEdit) {
            dispatch({ type: 'userManage/editUserMsg', payload: obj, callback: this.dispatchCallback })
          } else {
            delete values.confirm_password_register
            dispatch({ type: 'userManage/addUser', payload: values, callback: this.dispatchCallback })
          }
        })
      }
    })
  }

  dispatchCallback = (responseData) => {
    const { success, message } = responseData
    if (success) {
      this.successCallback()
    } else {
      this.errorCallback(message)
    }
  }

  successCallback = () => {
    const { isEdit } = this.props
    this.setState(() => {
      return {
        buttonLoading: false
      }
    }, () => {
      this.handleCancel()
      this.props.dispatch({ type: 'userManage/getTableData', payload: this.state.query })
      if (isEdit) {
        message.success('修改用户信息成功')
      } else {
        message.success('添加用户成功')
      }
    })
  }

  errorCallback = (message) => {
    this.setState(() => {
      return {
        buttonLoading: false
      }
    }, () => {
      message.error(message)
    })
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
    const { autoCompleteResult, buttonLoading } = this.state
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
                <Input disabled={isEdit} placeholder="输入不可存在空格" />
            )
          }
        </FormItem>
        <FormItem label="姓名">
          {getFieldDecorator('name', {
            rules: usernameRules,
            validateTrigger: 'onBlur',
            initialValue: isEdit ? formData.name : null
          })(
            <Input placeholder="请输入你的姓名" />
          )
          }
        </FormItem>
        {
          isEdit
          ? <FormItem label="用户角色">
            {getFieldDecorator('utype', {
              initialValue: formData.utype
            })(
                <Select>
                  <SelectOption value={'101003'}>超级管理员</SelectOption>
                  <SelectOption value={'101001'}>普通用户</SelectOption>
                </Select>
              )
            }
            </FormItem>
          : <div>
              <FormItem label="密码">
                {getFieldDecorator('password', {
                    rules: passwordRules,
                    validateTrigger: 'onBlur'
                  })(
                    <Input type="password" placeholder="请输入6-16个字符的密码" />
                  )
                }
              </FormItem>
              <FormItem label="确认密码">
                {getFieldDecorator('confirm_password_register', {
                    rules: [{ required: true, message: '请确认密码' }, { validator: this.comparePassword }],
                    validateTrigger: 'onBlur'
                  })(
                    <Input type="password" placeholder="请确认密码" />
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
                <Input placeholder="请正确输入邮箱地址" />
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
            <Input placeholder="请输入你电话号码或固定电话号码" />
          )

        }
        </FormItem>
        <FormItem className={styles.buttonStyle}>
          <Button type="primary" htmlType="submit" loading={buttonLoading}>{isEdit ? '确认' : '添加'}</Button>
          <Button onClick={() => this.handleCancel(false)}>取消</Button>
        </FormItem>
      </Form>
    )
  }
}

const AddUserForm = Form.create({ name: 'addUser' })(AddUser)

export default AddUserForm