import modelExtend from 'dva-model-extend'
import {model} from './common'
import * as examService from '../services/exams'
import * as paperService from '../services/papers'
import * as startService from '../services/start';
import * as subjectService from '../services/subject';

export default modelExtend(model, {
    namespace: 'start',
    state: {
      doPaper: false,
      examInfoModal: false,
      moreExamModal: false,
      exams: [],
      moreExams: {},
      currentExam: {},
      currentPaper: {},
    },
    subscriptions: {
      setup({dispatch}) {
        dispatch({type: 'query'})
      },
    },
    effects: {
      /**
       * 初始化考试列表，不带分页，每种最多4个
       * @param payload
       * @param put
       * @param call
       * @param select
       */* query({payload = {}}, {put, call, select}) {
        const subjectData = yield call(subjectService.queryMany)
        const subjects = subjectData.list.map(_ => _.type)
        payload = {
          subjectList: subjects,
          pageSize: 4,
          ...payload,
        }
        const data = yield call(examService.queryMany, payload)
        if (data.success) {
          yield put({
            type: 'updateState',
            payload: {
              exams: data.list,
            },
          })
        }
      },
      /**
       * 查询更多的考试，返回带分页
       * @param payload
       * @param put
       * @param call
       */* queryMoreExam({payload = {}}, {put, call,}) {
        yield  put({type: 'showMoreExamModal'})
        const data = yield call(examService.queryMany, payload)
        if (data.success) {
          yield put({
            type: 'updateState',
            payload: {
              moreExams: {
                list: data.content,
                pagination: {
                  current: Number(payload.page) || data.number + 1, // 服务器是从0开始算页码
                  pageSize: Number(payload.pageSize) || data.size,
                  total: data.totalElements,
                },
              },
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
        console.log(data)
        if (data.success && data.status)
          yield put({type: 'hideExamPaper'})
        else {
          throw data
        }

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
        yield  put({type: 'showExamInfoModal'})
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
        return {...state, examInfoModal: false, examInfo: {}}
      },
      showMoreExamModal(state) {
        return {...state, moreExamModal: true}
      },
      hideMoreExamModal(state) {
        return {...state, moreExamModal: false, moreExams: {}}
      },
    },
  }
)

