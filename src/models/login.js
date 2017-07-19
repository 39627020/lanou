import {login} from '../services/login'
import {routerRedux} from 'dva/router'
import {queryURL,config} from 'utils'

const {prefix} = config

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
    token: localStorage.getItem(`${prefix}token`)
  },

  effects: {
    * login({
              payload,
            }, {put, call}) {
      yield put({type: 'showLoginLoading'})
      const data = yield call(login, payload)
      yield put({type: 'hideLoginLoading'})
      if (data.success) {
       localStorage.setItem(`${prefix}token`, data.token)
        const from = queryURL('from');
        yield put({type: 'app/query'})
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data
      }
    },
  },
  reducers: {
    showLoginLoading(state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading(state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
