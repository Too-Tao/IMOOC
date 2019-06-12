import api from '@/services'
import { message } from 'antd'

const { getCourseDataListURL, addCourseURL, editCourseURL, removeCourseURL } = api

export default {
  namespace: 'courseManage',
  state: {
    tableData: [],
    total: 0
  },
  effects: {
    *getCourseData ({ payload }, { call, put }) {
      const courseData = yield call(getCourseDataListURL, payload)
      yield put({ type: 'savePayload', payload: courseData})
    },
    *addCourse ({ payload, callback }, { call }) {
      const data = yield call(addCourseURL, payload)
      if (data.success) {
        callback(data.success)
        return
      } else {
        message.error(data.message)
      }
    },
    *editCourse ({ payload, callback }, { call }) {
      const data = yield call(editCourseURL, payload)
      if (data.success) {
        callback(data.success)
        return
      } else {
        message.error(data.message)
      }
    },
    *removeCourse ({ payload, callback }, { call }) {
      const data = yield call(removeCourseURL, payload)
      const responseData = JSON.parse(data)
      if (responseData.success) {
        callback()
        return
      } else {
        message.error(responseData.message)
      }
    }
  },
  reducers: {
    savePayload (state, { payload }) {
      const { queryResult } = payload
      const { list, total } = queryResult
      return {
        ...state,
        tableData: list,
        total
      }
    }
  }
}