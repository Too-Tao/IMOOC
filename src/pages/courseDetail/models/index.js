import api from '@/services'
import { message } from 'antd'

const { courseDetailURL, getCommentURL, likeURL, removeCommentURL, addCommentURL } = api

export default {
  namespace: 'detail',
  state: {
    detailData: {},
    commentData: [],
    commentIds: [],
    total: 0
  },
  effects: {
    *getDetailData ({ payload }, {call, put}) {
      const data = yield call(courseDetailURL, payload)
      yield put({ type: 'savePayload', payload: data })
    },
    *getCommentData ({ payload }, { call, put }) {
      const data = yield call(getCommentURL, payload)
      yield put({ type: 'saveComment', payload: data })
    },
    *like ({ payload, callback }, { call, put }) {
      const data = yield call(likeURL, payload)
      if (data.success) {
        callback()
        return
      } else {
        message.error(data.message)
      }
    },
    *removeComment ({ payload, callback }, { call }) {
      const data = yield call(removeCommentURL, payload)
      const result = JSON.parse(data)
      if (result.success) {
        callback()
        return
      } else {
        message.error(data.message)
      }
    },
    *addComment ({ payload, callback }, { call }) {
      const data = yield call(addCommentURL, payload)
      if (data.success) {
        callback()
      } else {
        message.error(data.message)
      }
    }
  },
  reducers: {
    savePayload (state, { payload }) {
      const { coursePub } = payload
      return {
        ...state,
        detailData: coursePub
      }
    },
    saveComment (state, { payload }) {
      console.log(payload)
      const { commentList } = payload
      const { list, total, commentIds } = commentList
      return {
        ...state,
        commentData: list,
        total
      }
    }
  }
}