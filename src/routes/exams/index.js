import React from 'react';
import PropTypes from 'prop-types';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import List from './List';
import MultiChoiceEdit from '../../components/DataTable/MultiChoiceEdit';

const Exams = ({exams, loading, dispatch, location}) => {
  const {list, pagination, selectedRowKeys} = exams;
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
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'exams/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        });
      },
    },
  };
  const handleDeleteItems = () => {
    dispatch({
      type: 'exams/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    });
  };
  const handleCancelMultiChoice = () => {
    dispatch({
      type: 'exams/updateState',
      payload: {
        selectedRowKeys: [],
      },
    });
  };
  return (
    <div className="content-inner">
      {
        selectedRowKeys.length > 0 &&
        <MultiChoiceEdit selectedRowKeys={selectedRowKeys} handleCancelMultiChoice={handleCancelMultiChoice} handleDeleteItems={handleDeleteItems}/>
      }
      <List {...listProps} />
    </div>
  );
};
Exams.propTypes = {
  exams: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};


export default connect(({exams, loading}) => ({exams, loading}))(Exams);
