import * as appService from '../services/app';
import modelExtend from 'dva-model-extend';
import {model} from './common';

import * as subjectService from '../services/subject';
import {routerRedux} from 'dva/router';
import {parse} from 'qs';
import config from 'config';
import {EnumRoleType} from 'enums';

const {prefix} = config;

export default modelExtend(model, {
  namespace: 'app',
  state: {
    user: {},
    subjects: [],
    permissions: {
      visit: [],
      roles: [],
    },
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: '系统概况',
        router: '/dashboard',
      },
    ],
    menuPopoverVisible: false, //侧边栏是否弹出，仅在宽度较小时有效
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',// 侧边栏是否折叠，宽度教宽时有效
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true',//是否黑夜主题
    isNavbar: document.body.clientWidth < 769,//是隐藏侧边栏，只显示导航栏
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],//侧边栏子菜单的折叠情况
  },
  subscriptions: {

    setup({dispatch}) {
      dispatch({type: 'query'});
      let tid;
      /*
      窗口宽度改变时，自适应界面
       */
      window.onresize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          dispatch({type: 'changeNavbar'});
        }, 300);
      };
    },

  },
  effects: {
    /**
     * 初始化页面。若已经登录，则获取菜单，权限等必要信息，否则跳转登录界面
     * @param payload
     * @param call
     * @param put
     */* query({
                 payload,
               }, {call, put}) {

      const {success, user} = yield call(appService.queryOneByUserName, payload);
      if (success && user) {
        //加载subject分类
        const subjectData = yield call(subjectService.queryMany);
        let subjects = subjectData.list;
        const {permissions} = user;
        //todo:修改逻辑 符合后台登录要求
        // const menuData = yield call(menusService.queryMany)
        const list = [{id: '1', icon: 'laptop', name: '系统概况', route: '/dashboard'}, {
          id: '2',
          bpid: '1',
          name: '用户管理',
          icon: 'user',
          route: '/users'
        },
          {
            id: '21',
            mpid: '-1',
            bpid: '2',
            name: '用户详情',
            route: '/users/:id'
          },
          {
            id: '3',
            bpid: '1',
            name: '考试管理',
            icon: 'book',
            route: '/exams'
          },
          {
            id: '4',
            bpid: '1',
            name: '试卷管理',
            icon: 'switcher',
            route: '/papers'
          },
          {
            id: '5',
            bpid: '1',
            name: '题库管理',
            icon: 'database',
            route: '/testItems'
          },
          {
            id: '6',
            bpid: '1',
            name: '数据统计',
            icon: 'code-o'
          }, {
            id: '61',
            bpid: '6',
            mpid: '6',
            name: 'LineChart',
            icon: 'line-chart',
            route: '/chart/lineChart'
          }, {
            id: '62',
            bpid: '6',
            mpid: '6',
            name: 'BarChart',
            icon: 'bar-chart',
            route: '/chart/barChart'
          }, {
            id: '63',
            bpid: '6',
            mpid: '6',
            name: 'AreaChart',
            icon: 'area-chart',
            route: '/chart/areaChart'
          },
          {
            id: '7',
            bpid: '1',
            name: 'UI Element',
            icon: 'camera-o',
          },
          {
            id: '71',
            bpid: '7',
            mpid: '7',
            name: 'IconFont',
            icon: 'heart-o',
            route: '/UIElement/iconfont',
          },
          {
            id: '72',
            bpid: '7',
            mpid: '7',
            name: 'DataTable',
            icon: 'database',
            route: '/UIElement/dataTable',
          },
          {
            id: '73',
            bpid: '7',
            mpid: '7',
            name: 'DropOption',
            icon: 'bars',
            route: '/UIElement/dropOption',
          },
          {
            id: '74',
            bpid: '7',
            mpid: '7',
            name: 'Search',
            icon: 'search',
            route: '/UIElement/search',
          },
          {
            id: '75',
            bpid: '7',
            mpid: '7',
            name: 'Editor',
            icon: 'edit',
            route: '/UIElement/editor',
          },
          {
            id: '76',
            bpid: '7',
            mpid: '7',
            name: 'layer (Function)',
            icon: 'credit-card',
            route: '/UIElement/layer',
          },
        ];
        let menu = list;
        if (permissions.roles.includes(EnumRoleType.ADMIN) || permissions.roles.includes(EnumRoleType.DEVELOPER)) {
          //访问全部菜单
          permissions.visit = list.map(item => item.id);
        } else {
          //返回合适的item
          menu = list.filter(item => {
            //对每个item的验证条件
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ];
            //不满足就返回false
            return cases.every(_ => _);
          });
        }
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            menu,
            subjects,
          },
        });
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/dashboard'));
        }
      } else {
        if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
          let from = location.pathname;
            window.location = `${location.origin}/login?from=${from}`;
        }
      }
    },
    /**
     * 登出
     * @param payload
     * @param call
     * @param put
     */* logout({
                  payload,
                }, {call, put}) {
      const data = yield call(appService.logout, parse(payload));
      if (data.success) {
        yield put({type: 'query'});
      } else {
        throw (data);
      }
    },
    /**
     * 自适应界面,是否只显示NavBar
     * @param payload
     * @param put
     * @param select
     */* changeNavbar({
                        payload,
                      }, {put, select}) {
      const {app} = yield select(_ => _);
      const isNavbar = document.body.clientWidth < 769;
      if (isNavbar !== app.isNavbar) {
        yield put({type: 'handleNavbar', payload: isNavbar});
      }
    },
  },
  reducers: {
    /**
     * 是否隐藏侧边，手动
     * @param state
     * @returns {{siderFold: boolean}}
     */
    switchSider(state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },
    /**
     * 更改侧边栏主题
     * @param state
     * @returns {{darkTheme: boolean}}
     */
    switchTheme(state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    },
    /**
     * 在页面很窄时，是否弹出菜单
     * @param state
     * @returns {{menuPopoverVisible: boolean}}
     */
    switchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      };
    },
    /**
     * 修改菜单的显示状态
     * @param state
     * @param payload
     * @returns {{isNavbar: *}}
     */
    handleNavbar(state, {payload}) {
      return {
        ...state,
        isNavbar: payload,
      };
    },
    /**
     * 侧边栏子菜单呢的折叠情况
     * @param state
     * @param navOpenKeys
     * @returns {{}}
     */
    handleNavOpenKeys(state, {payload: navOpenKeys}) {
      return {
        ...state,
        ...navOpenKeys,
      };
    },
  },
});
