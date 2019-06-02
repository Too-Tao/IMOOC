import api from '@/services'

const { dataAnalysisDataURL } = api

export default {
  namespace: 'dataAnalysis',
  state: {
    dataAnalysisData: {}
  },
  effects: {
    *getDataAnalysisData ({ callback }, { call, put }) {
      const getDataAnalysisData = yield call(dataAnalysisDataURL)
      yield put({ type: 'savePayload', payload: getDataAnalysisData })
      if (getDataAnalysisData) {
        callback(getDataAnalysisData)
        return
      }
    },
  },
  reducers: {
    savePayload (state, { payload }) {
      return {
        ...state,
        dataAnalysisData: { ...payload }
      }
    }
  }
}