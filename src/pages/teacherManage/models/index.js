import api from '@/services'

const { teacherListURL } = api

export default {
  namespace: 'teacher',
  state: {
    listData: {}
  },
  effects: {
    *getList ({ payload }, { call, put }) {
      const data = yield call(teacherListURL, payload)
      yield put({ type: 'savePayload', payload: data })
    },
  },
  reducers: {
    savePayload (state, { payload }) {
      const { queryResult } = payload
      const { list } = queryResult
      return {
        ...state,
        listData: list
      }
    },
  }
}