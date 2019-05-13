/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Form, Input, Icon, Button } from 'antd'
import styles from './styles/index.less'
import logoPng from 'images/login/logo.png'

const FormItem = Form.Item

class Login extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.loginWrap}>
        <div className={styles.headerWrap}>
          <img src={logoPng} alt="logo"/>
          <span>慕课推荐系统</span>
        </div>
        <div className={styles.word}><p>慕课推荐系统是一款根据不同学习者推荐不同课程的一套系统</p></div>
        <div className={styles.formWrap}>
          <Form>
            <FormItem>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: '请输入用户名' }],
                validateTrigger: 'onBlur'
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: '请输入密码' }],
                validateTrigger: 'onBlur'
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} placeholder="请输入密码" />} />
              )
              }
            </FormItem>
            <Button type="primary" htmlType="submit" style={{ width: 388 }}>登陆</Button>
            <a href="javascript:" style={{ float: 'left', marginTop: 15 }}>忘记密码</a>
            <a href="javascript:" style={{ float: 'right', marginTop: 15 }}>注册账号</a>
          </Form>
        </div>
      </div>
    )
  }
}

const LoginForm = Form.create({ name: 'login' })(Login)

export default LoginForm