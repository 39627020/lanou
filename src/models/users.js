import modelExtend from 'dva-model-extend'
import * as usersService from '../services/users'
import {pageModel} from './common'
import {config} from 'utils'

const {prefix} = config

export default modelExtend(pageModel, {
  namespace: 'users',

  state: {
    currentItem: {}, //当前选择的user
    modalVisible: false, //模态框是否可见
    modalType: 'create', //模态框类型，create update
    selectedRowKeys: [], //选中的user
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true', //是否启用动画
  },

  subscriptions: {
    /**
     * 初始化
     * @param dispatch
     * @param history
     */
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    * query({payload = {}}, {call, put}) {
      const data = yield call(usersService.queryMany, payload)
      //获取到消息,开始分页
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.content,
            pagination: {
              current: Number(payload.page) || data.number+1,//服务器是从0开始算页码
              pageSize: Number(payload.pageSize) || data.size,
              total: data.totalElements,
            },
          },
        })
      }
    },

    * 'delete'({payload}, {call, put, select}) {
      const data = yield call(usersService.removeOneById, {id: payload})
      //多选时删除一个，保留选择记录
      const {selectedRowKeys} = yield select(_ => _.users)
      if (data.success) {
        yield put({type: 'updateState', payload: {selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload)}})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },

    * 'multiDelete'({payload}, {call, put}) {
      const data = yield call(usersService.removeMany, payload)
      console.log(payload)
      if (data.success) {
        yield put({type: 'updateState', payload: {selectedRowKeys: []}})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },

    * create({payload}, {call, put}) {
      const data = yield call(usersService.create, payload)
      if (data.success) {
        yield put({type: 'hideModal'})
        yield put({type: 'query'})
      } else {
        throw data
      }
    },

    * update({payload}, {select, call, put}) {
      const id = yield select(({users}) => users.currentItem.id)
      const newUser = {...payload, id}
      const data = yield call(usersService.update, newUser)
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
      return {...state, ...payload, modalVisible: true}
    },

    hideModal(state) {
      return {...state, modalVisible: false}
    },

    switchIsMotion(state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return {...state, isMotion: !state.isMotion}
    },

  },
})
