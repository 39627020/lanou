import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

const TestItems =({})=>{
  return(
    <div>题库</div>
  )
}





export default connect(({ testItems, loading }) => ({ testItems, loading }))(TestItems)
