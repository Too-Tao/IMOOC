import api from '@/services'

const { teacherDetailURL } = api

export default {
  namespace: 'teacherDetail',
  state: {
    data: []
  },
  effects: {
    *getTeacherData ({ payload }, { call, put }) {
      const data = yield call(teacherDetailURL, payload)
      yield put({ type: 'savePayload', payload: data })
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