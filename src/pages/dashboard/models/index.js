import api from '@/services'

const {dashboardURL} = api

export default {
  namespace: 'dashboard',
  state: {
    dashboardData: []
  },
  effects: {
    *getDashboardData ({ callback }, { call, put }) {
      const dashboardData = yield call(dashboardURL, {})
      yield put({ type: 'savePayload', payload: dashboardData })
      if (dashboardData && callback) {
        callback(dashboardData)
      }
    }
  },
  reducers: {
    savePayload (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}