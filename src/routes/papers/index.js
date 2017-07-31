import React from 'react';
import PropTypes from 'prop-types';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import List from './List';
import MultiChoiceEdit from '../../components/DataTable/MultiChoiceEdit';
import Filter from './Filter';
import Modal from './Modal';
import lodash from 'lodash';

const Papers = ({papers, loading, app, dispatch, location}) => {
  const {list, pagination, selectedRowKeys, modalVisible, modalItemVisible, modalType, currentItem, testItems} = papers;
  const {query = {}, pathname} = location;
  const {subjects} = app;
  const testItemList = lodash.cloneDeep(testItems.list).map(i => {
    i.subject = i.subject.type;
    return i;
  });

  const testItemPagination = testItems.pagination;
  const cloneList = lodash.cloneDeep(list).map(i => {
    i.subject = i.subject.type;
    return i;
  });
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
        type: 'papers/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
  };
  const modalProps = {
    testItemsLoading:loading.effects['papers/queryTestItems'],
    testItemList,
    testItemPagination,
    modalItemVisible: modalItemVisible,
    subjects: subjects,
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['papers/update'],
    title: `${modalType === 'create' ? '新增试卷' : '修改试卷'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      let newData = {
        ...data,
        testItemIds: testItems.selectedRowKeys
      };
      dispatch({
        type: `papers/${modalType}`,
        payload: newData,
      });
    },
    onCancel() {
      dispatch({
        type: 'papers/hideModal',
      });
    },
    onChoiceItem() {
      dispatch({
        type: 'papers/queryTestItems',
      });
    },
    onSwitchItem(type) {
      dispatch({
        type: 'papers/queryTestItems',
        payload: {
          type: type,
        }
      });
    },
    onTestItemPageChange(page, type) {

      dispatch({
        type: 'papers/queryTestItems',
        payload: {
          type: type,
          page: page.current,
          pageSize: page.pageSize,
        }
      });
    },
    rowSelection: {
      selectedRowKeys: testItems.selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'papers/updateState',
          payload: {
            testItems: {
              ...testItems,
              selectedRowKeys: keys,
            }
          },
        });
      },
    },
  };
  /**
   * 列表参数
   * @type {{pagination: *, dataSource: *, loading, location: *, onChange: (function(*)), rowSelection: {selectedRowKeys: *, onChange: (function(*=))}}}
   */
  const listProps = {
    pagination,
    dataSource: cloneList,
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
          type: 'papers/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        });
      },
    },
    onDeleteItem(id) {
      dispatch({
        type: 'papers/delete',
        payload: id,
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'papers/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });

      dispatch({
        type: 'papers/loadCurItems',
      });
    }
  };
  const handleDeleteItems = () => {
    dispatch({
      type: 'papers/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    });
  };
  const handleCancelMultiChoice = () => {
    dispatch({
      type: 'papers/updateState',
      payload: {
        selectedRowKeys: [],
      },
    });
  };
  return (
    <div className="content-inner">
      {
        selectedRowKeys.length > 0 &&
        <MultiChoiceEdit selectedRowKeys={selectedRowKeys} handleCancelMultiChoice={handleCancelMultiChoice}
                         handleDeleteItems={handleDeleteItems}/>
      }
      <Filter {...filterProps}/>
      <List {...listProps} />
      {modalVisible && <Modal  {...modalProps} />}
    </div>
  );
};
Papers.propTypes = {
  papers: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};


export default connect(({papers, loading, app}) => ({papers, loading, app}))(Papers);
