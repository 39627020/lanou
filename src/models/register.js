import *as registerService from '../services/register'
import {config} from 'utils'

const {prefix} = config
export default {
  namespace: 'register',
  state: {},
  effects: {
    * register({payload}, {call}) {
      const data = yield call(registerService.register, payload)
      if (data.success) {
        console.log(data)
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
