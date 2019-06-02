import api from '@/services'

const { loginURL, registerURL } = api

export default {
  namespace: 'login',

  state: { },

  effects: {
    *login ({ payload, callback }, { call }) {
      const loginStatus = yield call(loginURL, payload)
      if (loginStatus) {
        callback()
        return
      }
    },
    *register ({ payload, callback }, { call }) {
      const registerStatus = yield call(registerURL, payload)
      if (registerStatus) {
        callback()
        return
      }
    }
  },
  reducers: { }
}
