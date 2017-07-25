import React from 'react';
import PropTypes from 'prop-types';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import List from './List';
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;
const TestItemEnum = {
  QUESTION: 1,
  CHOICE: 2,
};

const TestItems = ({testItems, loading, dispatch, location}) => {
  const {list, pagination} = testItems;
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
  };

  const quesitonPops = {
    type: 1,
    ...listProps
  };
  const selectPops = {
    type: 2,
    ...listProps
  };
  return (
    <div className="content-inner">
      <Tabs
        activeKey={query.type === String(TestItemEnum.CHOICE) ? String(TestItemEnum.CHOICE) : String(TestItemEnum.QUESTION)}
        onTabClick={handleTabClick}>
        <TabPane tab="问答题" key={String(TestItemEnum.QUESTION)}>
          <List {...quesitonPops} />
        </TabPane>
        <TabPane tab="选择题" key={String(TestItemEnum.CHOICE)}>
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
