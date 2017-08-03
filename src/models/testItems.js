import { pageModel } from './common'
import modelExtend from 'dva-model-extend'
import * as itemService from '../services/testItems'

export default modelExtend(pageModel, {
  namespace: 'testItems',
  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible1: false, // 模态框是否可见
    modalVisible2: false, // 模态框是否可见
    modalType: 'create', // 模态框类型，create update
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/testItems') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
  effects: {

    * query ({ payload = {} }, { put, call }) {
      const data = yield call(itemService.queryMany, payload)
      // 获取到消息,开始分页
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.content,
            pagination: {
              current: Number(payload.page) || data.number + 1, // 服务器是从0开始算页码
              pageSize: Number(payload.pageSize) || data.size,
              total: data.totalElements,
            },
          },
        })
      }
    },
    * create ({ payload }, { call, put }) {
      const data = yield call(itemService.create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ testItems }) => testItems.currentItem.id)
      const newItem = { ...payload, id }
      const data = yield call(itemService.update, newItem)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * delete ({ payload }, { call, put, select }) {
      // 多选时删除一个，保留选择记录
      const { selectedRowKeys } = yield select(_ => _.testItems)
      const data = yield call(itemService.removeOneById, { id: payload })
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        const error = { message: '存在依赖，删除失败！' }
        throw error
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(itemService.removeMany, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        const error = { message: '存在依赖，删除失败！' }
        throw error
      }
    },
  },
  reducers: {

    showModal1 (state, { payload }) {
      return { ...state, ...payload, modalVisible1: true }
    },
    showModal2 (state, { payload }) {
      return { ...state, ...payload, modalVisible2: true }
    },

    hideModal (state) {
      return { ...state, modalVisible1: false, modalVisible2: false }
    },

  },
})
