import api from '@/services'
import router from 'umi/router'
import jwtDecode from 'jwt-decode'
import Cookie from 'cookiejs'
import { message } from 'antd'

const { logoutURL, tokenURL } = api

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
        Cookie.remove('uid')
        router.push('/login')
      }
    },
    *getUserInfo ({ callback }, { call, put }) {
      const userInfoData = yield call(tokenURL)
      yield put({ type: 'saveUserInfo', payload: userInfoData })
      if (userInfoData.success) {
        callback(userInfoData)
        return
      } else {
        router.push('/login')
      }
    },
  },
  reducers: {
    saveUserInfo (state, { payload }) {
      const { jwt } = payload
      const decoded = jwtDecode(jwt)
      return {
        ...state,
        userInfo: decoded
      }
    },
  }
}