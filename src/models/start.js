import modelExtend from 'dva-model-extend'
import { model } from './common'
import * as examService from '../services/exams'
import * as paperService from '../services/papers'

export default modelExtend(model, {
  namespace: 'start',
  state: {
    doPaper: false,
    exams: [],
    currentExam: {},
    currentPaper: {},
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
    },
  },
  effects: {
    * query ({ payload = {} }, { put, call }) {
      const data = yield call(examService.queryMany, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            exams: data.content,
          },
        })
      }
    },
    * queryPaper ({ payload }, { put, call }) {
      const data = yield call(paperService.queryOneById, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            currentPaper: {
              ...payload,
              testItems: data.testItems.map((_) => {
                if (_.type == 'CHOICE') { _.question = JSON.parse(_.question) }
                return _
              }),
            },
          },
        }
        )
      }
    },
    * startExam ({ payload }, { put, call }) {
      yield put({
        type: 'updateState',
        payload: {
          currentExam: payload,
        },
      })
      const paperId = payload.paper.id
      yield put({ type: 'queryPaper', payload: { id: paperId } })
      yield put({ type: 'showExamPaper' })
    },
    * endExam ({ payload }, { put, call }) {
      yield put({
        type: 'updateState',
        payload: {
          currentExam: {}, currentPaper: {},
        },
      })
      yield put({ type: 'hideExamPaper' })
    },

  },
  reducers: {

    showExamPaper (state) {
      return { ...state, doPaper: true }
    },
    hideExamPaper (state) {
      return { ...state, doPaper: false }
    },
  },
}
)

