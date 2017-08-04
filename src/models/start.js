import modelExtend from 'dva-model-extend'
import {model} from './common'
import * as examService from '../services/exams'
import * as paperService from '../services/papers'
import * as startService from '../services/start';

export default modelExtend(model, {
    namespace: 'start',
    state: {
      doPaper: false,
      examInfoModal: false,
      moreExamModal: false,
      exams: [],
      currentExam: {},
      currentPaper: {},
    },
    subscriptions: {
      setup({dispatch}) {
        dispatch({type: 'query'})
      },
    },
    effects: {
      * query({payload = {}}, {put, call}) {
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
      * queryPaper({payload}, {put, call}) {
        const data = yield call(paperService.queryOneById, payload)
        if (data.success) {
          yield put({
              type: 'updateState',
              payload: {
                currentPaper: {
                  ...payload,
                  testItems: data.testItems.map((_) => {
                    if (_.type == 'CHOICE') {
                      _.question = JSON.parse(_.question)
                    }
                    return _
                  }),
                },
              },
            }
          )
        }
      },
      * startExam({payload}, {put, call}) {
        yield put({
          type: 'updateState',
          payload: {
            currentExam: payload,
          },
        })
        const paperId = payload.paper.id
        yield put({type: 'queryPaper', payload: {id: paperId}})
        yield put({type: 'showExamPaper'})
      },
      * completeExam({payload}, {put, call}) {
        const data = yield  call(startService.completeExam, payload)
        if (data.success)
          yield put({type: 'hideExamPaper'})

      },
      * endExam({payload}, {put, call}) {
        yield put({
          type: 'updateState',
          payload: {
            currentExam: {}, currentPaper: {},
          },
        })
        yield put({type: 'hideExamPaper'})
      },
      * queryExamInfo({payload}, {put, call}) {
        /**
         * 设置当前考试
         */
        yield put({
          type: 'updateState',
          payload: {
            currentExam: payload,
          },
        })
        /**
         * 设置当前试卷和用户的答案
         */
        const data = yield  call(startService.queryOneByExamId, {id: payload.id})
        if (data.success) {
          yield put({
            type: 'updateState',
            payload: {
              examInfo: {
                answers: data.answers
              }
            },
          })
          const paperId = payload.paper.id
          yield put({type: 'queryPaper', payload: {id: paperId}})
          yield  put({type: 'showExamInfoModal'})
        }

      },
    },
    reducers: {

      showExamPaper(state) {
        return {...state, doPaper: true}
      },
      hideExamPaper(state) {
        return {...state, doPaper: false}
      },

      showExamInfoModal(state) {
        return {...state, examInfoModal: true}
      },
      hideExamInfoModal(state) {
        return {...state, examInfoModal: false,examInfo:{}}
      },
      showMoreExamModal(state) {
        return {...state, moreExamModal: true}
      },
      hideMoreExamModal(state) {
        return {...state, moreExamModal: false}
      },
    },
  }
)

