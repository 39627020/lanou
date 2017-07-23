import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

const Papers =({})=>{
  return(
    <div>试卷</div>
  )
}





export default connect(({ papers, loading }) => ({ papers, loading }))(Papers)
