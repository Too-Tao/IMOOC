import api from '@/services'
import router from 'umi/router'
import Cookie from 'cookiejs'
import { message } from 'antd'
import { IMOOC_LOGIN_TOKEN } from '@/utils/constants'

const { logoutURL } = api

export default {
  namespace: 'globalHeader',
  state: {},
  effects: {
    *logout (_, { call }) {
      const logoutStatus = yield call(logoutURL)
      if (logoutStatus) {
        message.success('已安全退出')
        Cookie.remove(IMOOC_LOGIN_TOKEN)
        router.push('/login')
      }
    }
  }
}