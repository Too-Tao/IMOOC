import api from '@/services'

const { loginURL, registerURL } = api

export default {
  namespace: 'login',

  state: {
    data: {}
  },

  effects: {
    *login ({ payload, callback }, { call, put }) {
      const loginStatus = yield call(loginURL, payload)
      yield put({ type: 'savaPayload', payload: loginStatus })
      if (loginStatus) {
        callback(loginStatus)
        return
      }
    },
    *register ({ payload, callback }, { call }) {
      const registerStatus = yield call(registerURL, payload)
      if (registerStatus) {
        callback(registerStatus)
        return
      }
    },
  },
  reducers: {
    savaPayload (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}
