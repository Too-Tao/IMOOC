import api from '@/services'

const { courseRecommendationDataURL, classifiedURL } = api

export default {
  namespace: 'courseRecommendation',
  state: {
    listData: [],
    typeData: [],
    total: 0
  },
  effects: {
    *getListData ({ payload }, { call, put }) {
      const listData = yield call(courseRecommendationDataURL, payload)
      yield put({ type: 'savePayload', payload: listData })
    },
    *getCourseType (_, { call, put }) {
      const typeData = yield call(classifiedURL)
      yield put({ type: 'saveTypePayload', payload: typeData })
    }
  },
  reducers: {
    savePayload (state, { payload }) {

      const { queryResult } = payload
      return {
        ...state,
        listData: queryResult.list,
        total: queryResult.total
      }
    },
    saveTypePayload (state, { payload }) {
      const { children } = payload
      return {
        ...state,
        typeData: children
      }
    }
  }
}