import api from '@/services'

const { teacherListURL } = api

export default {
  namespace: 'teacher',
  state: {
    listData: []
  },
  effects: {
    *getList (_, { call, put }) {
      const data = yield call(teacherListURL)
      yield put({ type: 'savePayload', payload: data })
    }
  },
  reducers: {
    savePayload (state, { payload }) {
      return {
        ...state,
        listData: payload
      }
    }
  }
}