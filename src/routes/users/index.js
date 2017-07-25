import React from 'react';
import PropTypes from 'prop-types';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';
import MultiChoiceEdit from '../../components/DataTable/MultiChoiceEdit';
const Users = ({location, dispatch, users, loading}) => {
  const {list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys} = users;
  const {pageSize} = pagination;

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['users/update'],
    title: `${modalType === 'create' ? '新建用户' : '修改用户'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `users/${modalType}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'users/hideModal',
      });
    },
  };

  const listProps = {
    dataSource: list,
    loading: loading.effects['users/queryMany'],
    pagination,
    location,
    isMotion,
    onChange(page) {
      const {query, pathname} = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }));
    },
    onDeleteItem(id) {
      dispatch({
        type: 'users/delete',
        payload: id,
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'users/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        });
      },
    },
  };

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }));
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/users',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/users',
      }));
    },
    onAdd() {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
    switchIsMotion() {
      dispatch({type: 'users/switchIsMotion'});
    },
  };

  const handleDeleteItems = () => {
    dispatch({
      type: 'users/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    });
  };
  const handleCancelMultiChoice = () => {
    dispatch({
      type: 'users/updateState',
      payload: {
        selectedRowKeys: [],
      },
    });
  };
  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <MultiChoiceEdit selectedRowKeys={selectedRowKeys} handleCancelMultiChoice={handleCancelMultiChoice} handleDeleteItems={handleDeleteItems}/>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(({users, loading}) => ({users, loading}))(Users);
