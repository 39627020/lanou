import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import { Tabs } from 'antd'
import MultiChoiceEdit from '../../components/DataTable/MultiChoiceEdit'
import Filter from './Filter'
import Modal from './Modal'


const TabPane = Tabs.TabPane
const TestItemEnum = {
  QUESTION: 1,
  CHOICE: 2,
}

const TestItems = ({ testItems, loading, app, dispatch, location }) => {
  const { list, pagination, selectedRowKeys, modalVisible1, modalVisible2, modalType, currentItem } = testItems
  const { query, pathname } = location
  const { subjects } = app
  // 深度拷贝list，并格式化

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
    }))
  }

  /**
   * 搜索栏参数
   */
  const filterProps = {
    subjects,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...query,
          ...value,
        },
      }))
    },
    onAdd (type) {
      if (type == 1) {
        dispatch({
          type: 'testItems/showModal1',
          payload: {
            modalType: 'create',
          },
        })
      } else {
        dispatch({
          type: 'testItems/showModal2',
          payload: {
            modalType: 'create',
          },
        })
      }
    },
  }
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    subjects,
    modalType,
    maskClosable: false,
    confirmLoading: loading.effects['testItems/update'],
    title: `${modalType === 'create' ? '新增试题' : '修改试题'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `testItems/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'testItems/hideModal',
      })
    },
  }
  /**
   * 列表参数
   * @type {{pagination: *, dataSource: *, loading, location: *, onChange: (function(*)), rowSelection: {selectedRowKeys: *, onChange: (function(*=))}}}
   */
  const listProps = {
    pagination,
    loading: { spinning: loading.effects['testItems/query'], size: 'large', tip: '请稍候...' },
    location,
    onChange: (page) => {
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'testItems/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
    onDeleteItem (id) {
      dispatch({
        type: 'testItems/delete',
        payload: id,
      })
    },
    onEditItem (type, item) {
      if (type == 1) {
        dispatch({
          type: 'testItems/showModal1',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      } else {
        dispatch({
          type: 'testItems/showModal2',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      }
    },
  }


  /**
   * 多选框相关方法
   */
  const handleDeleteItems = () => {
    dispatch({
      type: 'testItems/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }
  /**
   * 多选框相关方法
   */
  const handleCancelMultiChoice = () => {
    dispatch({
      type: 'testItems/updateState',
      payload: {
        selectedRowKeys: [],
      },
    })
  }
  return (
    <div className="content-inner">
      <Tabs
        activeKey={query.type === String(TestItemEnum.CHOICE) ? String(TestItemEnum.CHOICE) : String(TestItemEnum.QUESTION)}
        onTabClick={handleTabClick}
      >
        <TabPane tab="问答题" key={String(TestItemEnum.QUESTION)}>
          {
            selectedRowKeys.length > 0 &&
            <MultiChoiceEdit
              selectedRowKeys={selectedRowKeys}
              handleCancelMultiChoice={handleCancelMultiChoice}
              handleDeleteItems={handleDeleteItems}
            />
          }
          <Filter type={String(TestItemEnum.QUESTION)} {...filterProps} />
          <List
            dataSource={list.filter(i => i.type == 'QUESTION')}
            type={String(TestItemEnum.QUESTION)}
            {...listProps}
          />
          {modalVisible1 && <Modal visible={modalVisible1} type={String(TestItemEnum.QUESTION)} {...modalProps} />}
        </TabPane>
        <TabPane tab="选择题" key={String(TestItemEnum.CHOICE)}>
          {
            selectedRowKeys.length > 0 &&
            <MultiChoiceEdit
              selectedRowKeys={selectedRowKeys}
              handleCancelMultiChoice={handleCancelMultiChoice}
              handleDeleteItems={handleDeleteItems}
            />
          }
          <Filter type={String(TestItemEnum.CHOICE)} {...filterProps} />
          <List
            dataSource={list.filter(i => i.type == 'CHOICE')}
            type={String(TestItemEnum.CHOICE)}
            {...listProps}
          />
          {modalVisible2 && <Modal visible={modalVisible2} type={String(TestItemEnum.CHOICE)}{...modalProps} />}
        </TabPane>
      </Tabs>
    </div>
  )
}
TestItems.propTypes = {
  testItems: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ testItems, loading, app }) => ({ testItems, loading, app }))(TestItems)
