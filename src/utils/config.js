const APIV1 = '/api/v1'
//const APIV2 = '/api/v2'

module.exports = {
  name: '蓝鸥IT',
  prefix: 'lanouAdmin',
  footerText: '蓝鸥IT  © 2017 liuxing',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: ['/login','/register','/home','/start'],
  apiPrefix: '/api/v1',
  api: {
    dashboard: `${APIV1}/dashboard`,
    userLogin: `${APIV1}/auth/login`,
    userLogout: `${APIV1}/auth/logout`,
    userRegister:`${APIV1}/auth/register`,
    userRole:`${APIV1}/userRoles`,
    user: `${APIV1}/users/:id`,
    testItem: `${APIV1}/testItems/:id`,
    paper: `${APIV1}/papers/:id`,
    exam: `${APIV1}/exams/:id`,
    subject: `${APIV1}/subjects/:id`,
    // posts: `${APIV1}/posts`,
    // menus: `${APIV1}/menus`,
    // v1test: `${APIV1}/test`,
    // v2test: `${APIV2}/test`,
  },
}
