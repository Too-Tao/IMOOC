import api from '@/services'
import router from 'umi/router'
import Cookie from 'cookiejs'
import { message } from 'antd'
import { IMOOC_LOGIN_TOKEN } from '@/utils/constants'

const { logoutURL, userInfoURL } = api

export default {
  namespace: 'global',
  state: {
    userInfo: {}
  },
  effects: {
    *logout (_, { call }) {
      const logoutStatus = yield call(logoutURL)
      if (logoutStatus) {
        message.success('已安全退出')
        Cookie.remove(IMOOC_LOGIN_TOKEN)
        router.push('/login')
      }
    },
    *getUserInfo ({ callback }, { call, put }) {
      const userInfoData = yield call(userInfoURL)
      yield put({ type: 'saveUserInfo', payload: userInfoData })
      if (userInfoData) {
        callback()
        return
      }
    },
  },
  reducers: {
    saveUserInfo (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
  }
}