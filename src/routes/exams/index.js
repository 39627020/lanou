import React from 'react';
import PropTypes from 'prop-types';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import List from './List';
import MultiChoiceEdit from '../../components/DataTable/MultiChoiceEdit';
import Filter from './Filter';
import lodash from 'lodash';
import Modal from './Modal';

const Exams = ({exams, loading, app, dispatch, location}) => {
  const {list, pagination, selectedRowKeys, modalVisible, modalType, currentItem, papers} = exams;
  const {query = {}, pathname} = location;
  const {subjects} = app;
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
        type: 'exams/queryPapers',
      });
      dispatch({
        type: 'exams/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
  };
  const modalProps = {
    papersLoading:loading.effects['exams/queryPapers'],
    papers,
    subjects: subjects,
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['exams/update'],
    title: `${modalType === 'create' ? '新增考试' : '修改考试'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      let newData = {
        ...data,
        paperId: papers.selectedRowKeys[0]
      };
      dispatch({
        type: `exams/${modalType}`,
        payload: newData,
      });
    },
    onCancel() {
      dispatch({
        type: 'exams/hideModal',
      });
    },
    rowSelection: {
      type: 'radio',
      selectedRowKeys: papers.selectedRowKeys.length > 0 ? papers.selectedRowKeys : currentItem.paper ?[currentItem.paper.id]:[],
      onChange: (keys) => {
        dispatch({
          type: 'exams/updateState',
          payload: {
            papers: {
              ...papers,
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
    loading:{spinning:loading.effects['exams/query'],size:"large",tip:"请稍候..."},
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
        type: 'exams/queryPapers',
      });
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
        <MultiChoiceEdit selectedRowKeys={selectedRowKeys} handleCancelMultiChoice={handleCancelMultiChoice}
                         handleDeleteItems={handleDeleteItems}/>
      }
      <Filter {...filterProps}/>
      <List {...listProps} />
      {modalVisible && <Modal  {...modalProps} />}
    </div>
  );
};
Exams.propTypes = {
  exams: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};


export default connect(({exams, loading, app}) => ({exams, loading, app}))(Exams);
