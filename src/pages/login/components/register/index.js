import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { connect } from 'dva'
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

const mapStateToProps = ({ loading }) => {
  return {
    loading: loading.effects['login/register']
  }
}

@connect(mapStateToProps)
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
    const { form, dispatch } = this.props
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'login/register', payload: values, callback: this.handleRegisterCallback })
      }
    })
  }

  handleRegisterCallback = () => {
    this.handleCancelRegister(false)
    message.success('注册成功')
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