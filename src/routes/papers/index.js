import React from 'react';
import PropTypes from 'prop-types';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import List from './List';


const Papers = ({papers, loading, dispatch, location}) => {
  const {list, pagination} = papers;
  const {query = {}, pathname} = location;

  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['papers/queryMany'],
    location,
    onChange: (page) => {
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }));
    },
  };

  return (
    <div className="content-inner">
      <List {...listProps} />
    </div>
  );
};
Papers.propTypes = {
  papers: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};


export default connect(({papers, loading}) => ({papers, loading}))(Papers);
