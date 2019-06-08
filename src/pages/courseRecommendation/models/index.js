import api from '@/services'

const { courseRecommendationDataURL, courseCatagoryListURL } = api

export default {
  namespace: 'courseRecommendation',
  state: {
    listData: [],
    typeData: {}
  },
  effects: {
    *getListData (_, { call, put }) {
      const listData = yield call(courseRecommendationDataURL)
      yield put({ type: 'savePayload', payload: listData })
    },
    *getCourseType ({ callback }, { call, put }) {
      const typeData = yield call(courseCatagoryListURL)
      yield put({ type: 'saveTypePayload', payload: typeData })
      if (typeData) {
        callback(typeData)
        return
      }
    }
  },
  reducers: {
    savePayload (state, { payload }) {
      return {
        ...state,
        listData: payload.courseData
      }
    },
    saveTypePayload (state, { payload }) {
      return {
        ...state,
        typeData: payload
      }
    }
  }
}