import {create} from '../services/users'
import {config} from 'utils'
const {prefix} = config
export default {
  namespace: 'register',
  state: {},

  effects: {
    * create({payload}, {call, put}) {
      const data = yield call(create, payload)
      if (data.success) {
        localStorage.setItem(`${prefix}loginToken`, data.token)
        localStorage.setItem(`${prefix}loginUsername`, payload.username)
        window.location = `${location.origin}/home`;
      } else {
        throw data
      }
    },
  },
  reducers: {},
}
