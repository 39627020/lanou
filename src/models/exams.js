import {pageModel} from './common';
import modelExtend from 'dva-model-extend';
import * as examService from '../services/exams';
import * as paperService from '../services/papers';

export default modelExtend(pageModel, {
  namespace: "exams",
  state: {
    papers: {
      list: [],
      pagination: {},
      selectedRowKeys: [],
    },
    currentItem: {},
    currentPaper: {},
    selectedRowKeys: [],
    modalVisible: false, //模态框是否可见
    modalType: 'create', //模态框类型，create update
  },
  subscriptions: {
    setup({dispatch, history}) {

      history.listen(location => {
        if (location.pathname === '/exams') {
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },
  },
  effects: {

    * query({payload = {}}, {put, call}) {
      const data = yield call(examService.queryMany, payload);
      //获取到消息,开始分页
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.content,
            pagination: {
              current: Number(payload.page) || data.number + 1,//服务器是从0开始算页码
              pageSize: Number(payload.pageSize) || data.size,
              total: data.totalElements,
            },
          },
        });
      }
    },
    * queryPapers({payload = {}}, {select, put, call}) {
      const papers = yield select(({exams}) => exams.papers);
      const data = yield call(paperService.queryMany, payload);
      //获取到消息,开始分页
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            papers: {
              ...papers,
              list: data.content,
              pagination: {
                current: Number(payload.page) || data.number + 1,//服务器是从0开始算页码
                pageSize: Number(payload.pageSize) || data.size,
                total: data.totalElements,
              },
            }
          },
        });
      }
    },
    * update({payload}, {select, call, put}) {
      const id = yield select(({exams}) => exams.currentItem.id);
      const newItem = {...payload, id};
      const data = yield call(examService.update, newItem);
      if (data.success) {
        yield put({type: 'hideModal'});
        yield put({type: 'query'});
      } else {
        throw data;
      }
    },
    * create({payload}, {call, put}) {
      const data = yield call(examService.create, payload)
      if (data.success) {
        yield put({type: 'hideModal'})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },

  },
  reducers: {

    showModal(state, {payload}) {
      return {...state, ...payload, modalVisible: true};
    },

    hideModal(state) {
      return {...state, modalVisible: false};
    },

  },
});
