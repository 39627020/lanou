import {pageModel} from './common';
import modelExtend from 'dva-model-extend';
import * as papersService from '../services/papers';
import * as itemService from '../services/testItems';

export default modelExtend(pageModel, {
  namespace: "papers",
  state: {
    testItems: {
      list: [],
      pagination: {},
      selectedRowKeys: [],
    },
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false, //模态框是否可见
    modalItemVisible: true,
    modalType: 'create', //模态框类型，create update
  },
  subscriptions: {
    setup({dispatch, history}) {

      history.listen(location => {
        if (location.pathname === '/papers') {
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
      const data = yield call(papersService.queryMany, payload);
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
    * update({payload}, {select, call, put}) {
      const id = yield select(({papers}) => papers.currentItem.id);
      const newItem = {...payload, id};
      const data = yield call(papersService.update, newItem);
      if (data.success) {
        yield put({type: 'hideModal'});
        yield put({type: 'query'});
      } else {
        throw data;
      }
    },
    * create({payload}, {call, put}) {
      const data = yield call(papersService.create, payload)
      if (data.success) {
        yield put({type: 'hideModal'})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },

    * loadCurItems({payload = {}}, {select, call, put}) {
      const currentItem = yield select(({papers}) => papers.currentItem);
      const id = currentItem.id;
      const newItem = {...payload, id};
      console.log(newItem);
      const data = yield call(papersService.queryOneById, newItem);
      if (data.success) {
        yield put({
            type: 'updateState',
            payload: {
              currentItem: {...currentItem, testItems: data.testItems}
            },
          }
        );
      } else {
        throw data;
      }
    },
    * queryTestItems({payload = {}}, {select, put, call}) {
      const testItems = yield select(({papers}) => papers.testItems);
      const data = yield call(itemService.queryMany, payload);
      //获取到消息,开始分页
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            modalItemVisible: false,
            testItems: {
              ...testItems,
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
    * 'delete'({payload}, {call, put, select}) {
      //多选时删除一个，保留选择记录
      const {selectedRowKeys} = yield select(_ => _.papers)
      const data = yield call(papersService.removeOneById, {id: payload})
      if (data.success) {
        yield put({type: 'updateState', payload: {selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload)}})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },

    * 'multiDelete'({payload}, {call, put}) {
      const data = yield call(papersService.removeMany, payload)
      if (data.success) {
        yield put({type: 'updateState', payload: {selectedRowKeys: []}})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },
  },
  reducers: {

    showModal(state, {payload}) {
      return {...state, ...payload, modalVisible: true, modalItemVisible: true};
    },

    hideModal(state) {
      return {
        ...state, modalVisible: false, testItems: {
          list: [],
          pagination: {},
          selectedRowKeys: [],
        }
      };
    },
  },
});
