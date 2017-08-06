const APIV1 = '/api/v1'
// const APIV2 = '/api/v2'
//const serverUrl = 'http://127.0.0.1:8080'
const serverUrl = 'http://47.93.48.40:8080'
module.exports = {
  name: '蓝鸥IT',
  prefix: 'lanouAdmin',
  footerText: '蓝鸥IT  © 2017 liuxing',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [serverUrl],
  openPages: ['/login', '/register', '/home', '/start'],
  apiPrefix: '/api/v1',
  serverUrl: serverUrl,
  api: {
    dashboard: `${serverUrl}${APIV1}/dashboard`,
    userLogin: `${serverUrl}${APIV1}/auth/login`,
    userLogout: `${serverUrl}${APIV1}/auth/logout`,
    userRegister: `${serverUrl}${APIV1}/auth/register`,
    userRole: `${serverUrl}${APIV1}/userRoles`,
    user: `${serverUrl}${APIV1}/users/:id`,
    testItem: `${serverUrl}${APIV1}/testItems/:id`,
    paper: `${serverUrl}${APIV1}/papers/:id`,
    exam: `${serverUrl}${APIV1}/exams/:id`,
    subject: `${serverUrl}${APIV1}/subjects/:id`,
    start: `${serverUrl}${APIV1}/start/:id`,
    startComplete: `${serverUrl}${APIV1}/start/complete`,
    startStart: `${serverUrl}${APIV1}/start/start`,
    startEnd: `${serverUrl}${APIV1}/start/end`,
    // posts: `${APIV1}/posts`,
    // menus: `${APIV1}/menus`,
    // v1test: `${APIV1}/test`,
    // v2test: `${APIV2}/test`,
  },
}
