import api from '@/services'

const { barEchartsDataURL, lineEchartsDataURL, courseDifficultURL, courseTypeURL, teacherTitleURL } = api

export default {
  namespace: 'dataAnalysis',
  state: {
    barEchartsData: [],
    lineEchartsData: {
      data: [],
      list: []
    },
    courseDifficultData: [],
    courseTypeData: [],
    teacherTitleData: []
  },
  effects: {
    *getBarEchartsData ({ callback }, { call, put }) {
      const getBarEchartsData = yield call(barEchartsDataURL)
      yield put({ type: 'saveBarEchartsData', payload: getBarEchartsData })
    },
    *getLineEchartsData ({ callback }, { call, put }) {
      const getLineEchartsData = yield call(lineEchartsDataURL)
      yield put({ type: 'saveLineEchartsData', payload: getLineEchartsData })
    },
    *getCourseDifficultData (_, { call, put }) {
      const getCourseDifficultData = yield call(courseDifficultURL)
      yield put({ type: 'saveCourseDifficultData', payload: getCourseDifficultData })
    },
    *getCourseTypeData (_, { call, put }) {
      const getCourseTypeData = yield call(courseTypeURL)
      yield put({ type: 'saveCourseTypeData', payload: getCourseTypeData })
    },
    *getTeacherTitleData (_, { call, put }) {
      const getTeacherTitleData = yield call(teacherTitleURL)
      yield put({ type: 'saveTeacherTitleData', payload: getTeacherTitleData })
    },
  },
  reducers: {
    saveBarEchartsData (state, { payload }) {
      const { queryResult } = payload
      const { list } = queryResult
      return {
        ...state,
        barEchartsData: list
      }
    },
    saveLineEchartsData (state, { payload }) {
      const { statisticsViewList } = payload
      const { data, list } = statisticsViewList
      return {
        ...state,
        lineEchartsData: {
          data,
          list
        }
      }
    },
    saveCourseDifficultData (state, { payload }) {
      const { queryResult } = payload
      const { list } = queryResult
      return {
        ...state,
        courseDifficultData: list
      }
    },
    saveCourseTypeData (state, { payload }) {
      const { queryResult } = payload
      const { list } = queryResult
      return {
        ...state,
        courseTypeData: list
      }
    },
    saveTeacherTitleData (state, { payload }) {
      const { queryResult } = payload
      const { list } = queryResult
      return {
        ...state,
        teacherTitleData: list
      }
    },
  }
}