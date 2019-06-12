import api from '@/services'
import { message } from 'antd'

const { getTableDataURL, addUserURL, editUserMsgURL, removeUserURL } = api

export default {
  namespace: 'userManage',
  state: {
    tableData: [],
    total: 0
  },
  effects: {
    *getTableData ({ payload }, { call, put }) {
      const tableData = yield call(getTableDataURL, payload)
      yield put({ type: 'saveTablePayload', payload: tableData })
    },
    *addUser ({ payload, callback }, { call }) {
      const addUserStatus = yield call(addUserURL, payload)
      if (addUserStatus) {
        callback(addUserStatus)
        return
      }
    },
    *editUserMsg ({ payload, callback }, { call }) {
      const editUserMsgStatus = yield call(editUserMsgURL, payload)
      if (editUserMsgStatus.success) {
        callback(editUserMsgStatus)
        return
      }
    },
    *removeUser ({ payload, callback }, { call }) {
      const removeUserStatus = yield call(removeUserURL, payload)
      const responseData = JSON.parse(removeUserStatus)
      if (responseData.success) {
        callback()
        return
      } else {
        message.error(responseData.message)
      }
    }
  },
  reducers: {
    saveTablePayload (state, { payload }) {
      const { queryResult } = payload
      const { list, total } = queryResult
      return {
        ...state,
        tableData: list,
        total: total
      }
    }
  }
}