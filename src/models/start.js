import modelExtend from 'dva-model-extend';
import {model} from './common';
import *as examService from '../services/exams'
import *as paperService from '../services/papers'

export default modelExtend(model, {
    namespace: 'start',
    state: {
      exams: [],
      currentPaper: {}
    },
    subscriptions: {
      setup({dispatch}) {
        dispatch({type: "query"})
        //todo
        dispatch({type: "queryPaper", payload: {id: 1}})
      }
    },
    effects: {
      * query({payload = {}}, {put, call}) {
        const data = yield call(examService.queryMany, payload);
        if (data.success) {
          yield put({
            type: 'updateState',
            payload: {
              exams: data.content,
            },
          });
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
                  testItems: data.testItems,
                }
              },
            }
          )
        }
      }
    }
  }
)
;
