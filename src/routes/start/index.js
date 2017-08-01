import Header from '../home/Nav';
import {connect} from 'dva';
import React from 'react';
import '../home/less/nav.less';
import NProgress from 'nprogress'

const Start = (loading) => {
  let lastHref
  const href = window.location.href
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }
  return <Header/>
}
export default connect(({start, loading, app}) => ({start, loading, app}))(Start);

