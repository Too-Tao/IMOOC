import api from '@/services'

const { courseRecommendationDataURL } = api

export default {
  namespace: 'courseRecommendation',
  state: {
    listData: []
  },
  effects: {
    *getListData (_, { call, put }) {
      const listData = yield call(courseRecommendationDataURL)
      yield put({ type: 'savePayload', payload: listData })
    }
  },
  reducers: {
    savePayload (state, { payload }) {
      return {
        ...state,
        listData: payload.courseData
      }
    }
  }
}