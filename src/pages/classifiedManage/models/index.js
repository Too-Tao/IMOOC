import api from '@/services'

const { classifiedURL } = api

export default {
  namespace: 'classified',
  state: {
    tableData: []
  },
  effects: {
    *getTableData (_, { call, put }) {
      const data = yield call(classifiedURL)
      yield put({ type: 'savePayload', payload: data })
    }
  },
  reducers: {
    savePayload (state, { payload }) {
      const { children } = payload
      return {
        ...state,
        tableData: children
      }
    }
  }
}