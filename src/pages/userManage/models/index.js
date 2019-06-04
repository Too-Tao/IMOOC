import api from '@/services'

const { tableDataURL, addUserURL, editUserMsgURL, removeUserURL } = api

export default {
  namespace: 'userManage',
  state: {
    tableData: []
  },
  effects: {
    *getTableData (_, { call, put }) {
      const tableData = yield call(tableDataURL)
      yield put({ type: 'savePayload', payload: tableData })
    },
    *addUser ({ payload, callback }, { call }) {
      const addUserStatus = yield call(addUserURL, payload)
      if (addUserStatus) {
        callback()
        return
      }
    },
    *editUserMsg ({ payload, callback }, { call }) {
      const editUserMsgStatus = yield call(editUserMsgURL, payload)
      if (editUserMsgStatus) {
        callback()
        return
      }
    },
    *removeUser ({ payload, callback }, { call }) {
      const removeUserStatus = yield call(removeUserURL, payload)
      if (removeUserStatus) {
        callback()
        return
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