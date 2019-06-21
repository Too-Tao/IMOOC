import React, { Component } from 'react'
import { Form, Input, Button, AutoComplete, message } from 'antd'
import { connect } from 'dva'
import styles from './styles/index.less'
import { validatorName, validatorPassword, validatorEmail, validatorPhone } from 'utils/validator.js'
import { EMAIL_ADDRESS } from 'utils/constants.js'

const FormItem = Form.Item
const AutoCompleteOption = AutoComplete.Option
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

const mapStateToProps = ({ loading }) => {
  return {
    loading: loading.effects['login/register']
  }
}

@connect(mapStateToProps)
class Registration extends Component {

  state = {
    autoCompleteResult: []
  }

  comparePassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value !== getFieldValue('password')) {
      callback('两次密码输入不一致')
    } else {
      callback()
    }
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

  handleSubmitRegister = (e) => {
    const { form, dispatch } = this.props
    e.preventDefault()
    form.validateFields((err, values) => {
      delete values.confirm_password
      if (!err) {
        const data = new URLSearchParams(values)
        dispatch({ type: 'login/register', payload: data, callback: this.handleRegisterCallback })
      }
    })
  }

  handleRegisterCallback = (responseData) => {
    const { success, message } = responseData
    if (success) {
      this.handleCancelRegister()
      message.success('注册成功')
    } else {
      message.error(message)
    }
  }

  handleCancelRegister = () => {
    this.props.handleRegisteredModal(false)
    this.props.form.resetFields()
  }

  render () {
    const { autoCompleteResult } = this.state
    const { loading } = this.props
    const { getFieldDecorator } = this.props.form
    const { usernameRules, passwordRules, emailRules, phoneRules } = rulesData
    const emailOptions = autoCompleteResult.map((item) => (
      <AutoCompleteOption key={item}>{item}</AutoCompleteOption>
    ))
    return (
      <Form {...formLayout} colon={false} hideRequiredMark={true} onSubmit={this.handleSubmitRegister}>
        <FormItem label="用户名">
          {getFieldDecorator('username', {
              rules: usernameRules,
              validateTrigger: 'onBlur'
            })(
              <Input  />
            )
          }
        </FormItem>
        <FormItem label="姓名">
        {getFieldDecorator('name', {
            rules: usernameRules,
            validateTrigger: 'onBlur',
          })(
            <Input placeholder="请输入你的姓名" />
          )
          }
        </FormItem>
        <FormItem label="密码">
          {getFieldDecorator('password', {
              rules: passwordRules,
              validateTrigger: 'onBlur'
            })(
              <Input type="password" />
            )
          }
        </FormItem>
        <FormItem label="确认密码">
          {getFieldDecorator('confirm_password', {
              rules: [{ required: true, message: '请确认密码' }, { validator: this.comparePassword }],
              validateTrigger: 'onBlur'
            })(
              <Input type="password" />
            )
          }
        </FormItem>
        <FormItem label="邮箱">
          {getFieldDecorator('email', {
              rules: emailRules,
              validateTrigger: 'onBlur'
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
            validateTrigger: 'onBlur'
          })(<Input />)

        }
        </FormItem>
        <FormItem className={styles.buttonStyle}>
          <Button type="primary" loading={loading} htmlType="submit">注册</Button>
          <Button onClick={() => this.handleCancelRegister(false)}>取消</Button>
        </FormItem>
      </Form>
    )
  }
}

const RegistrationForm = Form.create({ name: 'register' })(Registration)

export default RegistrationForm