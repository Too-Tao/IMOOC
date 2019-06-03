import api from '@/services'

const { tableDataURL } = api

export default {
  namespace: 'userManage',
  state: {
    tableData: []
  },
  effects: {
    *getTableData (_, { call, put }) {
      const tableData = yield call(tableDataURL)
      yield put({ type: 'savePayload', payload: tableData })
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