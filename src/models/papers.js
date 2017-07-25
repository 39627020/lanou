import {pageModel} from './common';
import modelExtend from 'dva-model-extend';
import * as itemService from '../services/papers';

export default modelExtend(pageModel, {
  namespace: "papers",
  state: {
    currentItem: {},
    selectedRowKeys:[],
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
      const data = yield call(itemService.queryMany, payload);
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
    }
  },

});
