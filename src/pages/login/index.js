/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Form, Input, Icon, Button, notification, Modal  } from 'antd'
import RegistrationForm from './components/register/index'
import styles from './styles/index.less'
import logoPng from 'images/login/logo.png'

const FormItem = Form.Item

const openNotificationWithIcon = type => {
  notification[type]({
    message: '提示',
    description:
      '忘记密码请联系管理员',
  })
}

class Login extends Component {

  state = {
    visible: false
  }

  handleRegisteredModal = (flag) => {
    this.setState(() => {
      return { visible: flag }
    })
  }


  render() {
    const { visible } = this.state
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
            <a href="javascript:" style={{ float: 'left', marginTop: 15 }} onClick={() => openNotificationWithIcon('info')}>忘记密码</a>
            <a href="javascript:" style={{ float: 'right', marginTop: 15 }} onClick={() => this.handleRegisteredModal(true)}>注册账号</a>
          </Form>
          <Modal
            visible={visible}
            onOk={() => this.handleRegisteredModal(false)}
            onCancel={() => this.handleRegisteredModal(false)}
            footer={null}
          >
            <div className={styles.registerTitle}>用户注册</div>
            <RegistrationForm handleRegisteredModal={this.handleRegisteredModal} />
          </Modal>
        </div>
      </div>
    )
  }
}

const LoginForm = Form.create({ name: 'login' })(Login)

export default LoginForm