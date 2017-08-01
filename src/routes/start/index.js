import Header from '../home/Nav';
import {connect} from 'dva';
import React from 'react';
import '../home/less/nav.less';
import NProgress from 'nprogress'
import style from './index.less'

import Exams from './Exams'
const Start = ({loading,start,app}) => {
  //界面上的加载条
  let lastHref
  const href = window.location.href
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }
  const {exams,currentPaper} =start
  const {isNavbar} = app
  //todo
  console.log(exams)
  console.log(currentPaper)
  console.log(isNavbar)
  return (
    <div>
      <Header id="nav_1_0" key="nav_1_0"  isMode={isNavbar}/>
      <Exams/>
    </div>

)
}
export default connect(({start, loading, app}) => ({start, loading, app}))(Start);

