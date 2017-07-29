import React from 'react';
import PropTypes from 'prop-types';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import List from './List';
import MultiChoiceEdit from '../../components/DataTable/MultiChoiceEdit';
import Filter from './Filter';

const Exams = ({exams, loading, app,dispatch, location}) => {
  const {list, pagination, selectedRowKeys, modalVisible, modalType, currentItem} = exams;
  const {query = {}, pathname} = location;
  const {subjects} =app;
  /**
   * 搜索栏参数
   */
  const filterProps = {
    subjects,
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...query,
          ...value,
        },
      }));
    },
    onAdd() {
      dispatch({
        type: 'exams/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
  };
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['exams/update'],
    title: `${modalType === 'create' ? '新增考试' : '修改考试'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `exams/${modalType}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'exams/hideModal',
      });
    },
  };
  /**
   * 列表参数
   * @type {{pagination: *, dataSource: *, loading, location: *, onChange: (function(*)), rowSelection: {selectedRowKeys: *, onChange: (function(*=))}}}
   */
  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['exams/queryMany'],
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
    onDeleteItem(id) {
      dispatch({
        type: 'exams/delete',
        payload: id,
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'exams/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    }
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
      <Filter {...filterProps}/>
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


export default connect(({exams, loading,app}) => ({exams, loading,app}))(Exams);
