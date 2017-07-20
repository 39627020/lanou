import {query, logout} from '../services/app'
import * as menusService from '../services/menus'
import {routerRedux} from 'dva/router'
import {parse} from 'qs'
import config from 'config'
import {EnumRoleType} from 'enums'

const {prefix} = config

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
      roles: [],
    },
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    menuPopoverVisible: false, //宽度过小时，侧边栏弹出
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',//
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {

    setup({dispatch}) {
      dispatch({type: 'query'})
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({type: 'changeNavbar'})
        }, 300)
      }
    },

  },
  effects: {

    * query({
              payload,
            }, {call, put}) {
      const {success, user} = yield call(query, payload)
      if (success && user) {
        const {permissions} = user
        //todo:修改逻辑 符合后台登录要求
      //  const {list} = yield call(menusService.query)
        const list =[ { id: '1', icon: 'laptop', name: 'Dashboard', route: '/dashboard' }, { id: '2', bpid: '1', name: 'Users', icon: 'user', route: '/user' }, { id: '7', bpid: '1', name: 'Posts', icon: 'shopping-cart', route: '/post' }, { id: '21', mpid: '-1', bpid: '2', name: 'User Detail', route: '/user/:id' }, { id: '5', bpid: '1', name: 'Recharts', icon: 'code-o' }, { id: '51', bpid: '5', mpid: '5', name: 'LineChart', icon: 'line-chart', route: '/chart/lineChart' }, { id: '52', bpid: '5', mpid: '5', name: 'BarChart', icon: 'bar-chart', route: '/chart/barChart' }, { id: '53', bpid: '5', mpid: '5', name: 'AreaChart', icon: 'area-chart', route: '/chart/areaChart' } ]
        let menu = list
        if (permissions.roles.includes(EnumRoleType.ADMIN) || permissions.roles.includes(EnumRoleType.DEVELOPER)) {
          //访问全部菜单
          permissions.visit = list.map(item => item.id)
        } else {
          //返回合适的item
          menu = list.filter(item => {
            //对每个item的验证条件
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            //不满足就返回false
            return cases.every(_ => _)
          })
        }
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            menu,
          },
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
          let from = location.pathname
          window.location = `${location.origin}/login?from=${from}`
        }
      }
    },

    * logout({
               payload,
             }, {call, put}) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({type: 'query'})
      } else {
        throw (data)
      }
    },

    * changeNavbar({
                     payload,
                   }, {put, select}) {
      const {app} = yield(select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({type: 'handleNavbar', payload: isNavbar})
      }
    },

  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider(state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme(state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar(state, {payload}) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys(state, {payload: navOpenKeys}) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
