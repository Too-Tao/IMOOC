import api from '@/services'

const { queryCourseDetailURL } = api

export default {
  namespace: 'detail',
  state: {
    detailData: []
  },
  effects: {
    *getDetailData ({ payload }, {call, put}) {
      const data = yield call(queryCourseDetailURL, payload)
      yield put({ type: 'savePayload', payload: data })
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