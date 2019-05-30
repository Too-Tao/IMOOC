import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import styles from './styles/index.less'
import { validatorName, validatorPassword } from 'utils/validator.js'

const FormItem = Form.Item

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const rulesData = {
  usernameRules: [{ required: true, message: '请输入用户名' }, { validator: validatorName }],
  passwordRules: [{ required: true, message: '请输入密码' }, { validator: validatorPassword }]
}

class Registration extends Component {

  comparePassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value !== getFieldValue('password_register')) {
      callback('两次密码输入不一致')
    } else {
      callback()
    }
  }

  handleSubmitRegister = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.handleCancelRegister(false)
      }
    })
  }

  handleCancelRegister = (flag) => {
    this.props.handleRegisteredModal(flag)
    this.props.form.resetFields()
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { usernameRules, passwordRules } = rulesData
    return (
      <Form {...formLayout} colon={false} hideRequiredMark={true} onSubmit={this.handleSubmitRegister}>
        <FormItem label="用户名">
          {getFieldDecorator('username_register', {
              rules: usernameRules,
              validateTrigger: 'onBlur'
            })(
              <Input  />
            )
          }
        </FormItem>
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
              rules: [{ required: true, message: '请输入密码' }, { validator: this.comparePassword }],
              validateTrigger: 'onBlur'
            })(
              <Input type="password" />
            )
          }
        </FormItem>
        <FormItem className={styles.buttonStyle}>
          <Button type="primary" htmlType="submit">注册</Button>
          <Button onClick={() => this.handleCancelRegister(false)}>取消</Button>
        </FormItem>
      </Form>
    )
  }
}

const RegistrationForm = Form.create({ name: 'register' })(Registration)

export default RegistrationForm