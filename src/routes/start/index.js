import Header from '../home/Nav';
import {connect} from 'dva';
import React from 'react';
const Start =()=>{
  return <Header/>
}
export default connect(({start, loading, app}) => ({start, loading, app}))(Start);

