import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import List from './List'

const TestItems = ({testItems, loading, dispatch, location}) => {
  const {list, pagination} = testItems

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['testItems/query'],
    location,
    onChange:(page)=> {

      const {query = {}, pathname} = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
  }
  return (
    <List {...listProps}/>
  )
}
TestItems.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({testItems, loading}) => ({testItems, loading}))(TestItems);
