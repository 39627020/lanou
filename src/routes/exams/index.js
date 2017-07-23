import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

const Exams =({})=>{
  return(
    <div>考试</div>
  )
}

export default connect(({ exams, loading }) => ({ exams, loading }))(Exams)
