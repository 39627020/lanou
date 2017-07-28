import React from 'react';
import PropTypes from 'prop-types';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import List from './List';
import {Tabs} from 'antd';
import MultiChoiceEdit from '../../components/DataTable/MultiChoiceEdit';
import Filter from './Filter';

const TabPane = Tabs.TabPane;
const TestItemEnum = {
  QUESTION: 1,
  CHOICE: 2,
};

const TestItems = ({testItems, loading, dispatch, location,}) => {
  const {list, pagination, selectedRowKeys} = testItems;
  const {query = {}, pathname} = location;

  /**
   * 类型切换
   * @param key
   */
  const handleTabClick = (key) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        type: key,
      },
    }));
  };

  /**
   * 搜索栏参数
   * @type {{isMotion: *, filter: {}, onFilterChange: (function(*)), onSearch: (function(*)), onAdd: (function()), switchIsMotion: (function())}}
   */
  const filterProps = {

  };
  /**
   * 模态框参数
   * @type {{item: {}, type: *, visible: *, maskClosable: boolean, confirmLoading, title: string, wrapClassName: string, onOk: (function(*=)), onCancel: (function())}}
   */
  const modalProps = {

  };
  /**
   * 列表参数
   * @type {{pagination: *, dataSource: *, loading, location: *, onChange: (function(*)), rowSelection: {selectedRowKeys: *, onChange: (function(*=))}}}
   */
  const listProps = {
    pagination,
    dataSource: list,
    loading: loading.effects['testItems/queryMany'],
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
          type: 'testItems/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        });
      },
    },
  };

  const quesitonPops = {
    type: 1,
    ...listProps
  };
  const selectPops = {
    type: 2,
    ...listProps
  };
  /**
   * 多选框相关方法
   */
  const handleDeleteItems = () => {
    dispatch({
      type: 'testItems/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    });
  };
  /**
   * 多选框相关方法
   */
  const handleCancelMultiChoice = () => {
    dispatch({
      type: 'testItems/updateState',
      payload: {
        selectedRowKeys: [],
      },
    });
  };
  return (
    <div className="content-inner">
      <Tabs
        activeKey={query.type === String(TestItemEnum.CHOICE) ? String(TestItemEnum.CHOICE) : String(TestItemEnum.QUESTION)}
        onTabClick={handleTabClick}>
        <TabPane tab="问答题" key={String(TestItemEnum.QUESTION)}>
          {
            selectedRowKeys.length > 0 &&
            <MultiChoiceEdit selectedRowKeys={selectedRowKeys} handleCancelMultiChoice={handleCancelMultiChoice} handleDeleteItems={handleDeleteItems}/>
          }
          <List {...quesitonPops} />
        </TabPane>
        <TabPane tab="选择题" key={String(TestItemEnum.CHOICE)}>
          {
            selectedRowKeys.length > 0 &&
            <MultiChoiceEdit selectedRowKeys={selectedRowKeys} handleCancelMultiChoice={handleCancelMultiChoice} handleDeleteItems={handleDeleteItems}/>
          }
          <List {...selectPops} />
        </TabPane>
      </Tabs>
    </div>
  );
};
TestItems.propTypes = {
  testItems: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(({testItems, loading}) => ({testItems, loading}))(TestItems);
