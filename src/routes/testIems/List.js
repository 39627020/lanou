import React from 'react';
import {Table, Modal} from 'antd';
import styles from './List.less';
import {DropOption} from 'components';
import PropTypes from 'prop-types';

const confirm = Modal.confirm;


const List = ({...tableProps}) => {

  const {onEditItem, onDeleteItem} = tableProps;
  /**
   * 选择题展示
   * @param text
   * @returns {XML}
   */
  const selectRowRender = (text) => {
    const obj = JSON.parse(text);
    return (
      <div>
        <div>题干：{obj.question}</div>
        <div>
          <div>
            A:{obj.answer.A}
          </div>
          <div>
            B:{obj.answer.B}
          </div>
          <div>
            C:{obj.answer.C}
          </div>
          <div>
            D:{obj.answer.D}
          </div>
        </div>
      </div>

    );
  };
  /**
   * 操作选项
   * @param record
   * @param e
   */
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record);
    } else if (e.key === '2') {
      confirm({
        title: '你确定要删除这个用户吗?',
        onOk() {
          onDeleteItem(record.id);
        },
      });
    }
  };

  const {type} = tableProps;
  const columns = [
    {
      title: '试题分类',
      dataIndex: 'subject',
      className: `subject-type`,
      render: (text) => text.type,
    },
    /**
     * 判断是选择题还是问答题
     * type=1 问答题
     * 其他 选择题
     */
    type === 1 ?
      {
        title: '问题描述',
        dataIndex: 'question',
        render: (text) => text,
      } :
      {
        title: '题目与选项',
        dataIndex: 'question',
        render: selectRowRender
      },
    {
      title: '参考答案',
      dataIndex: 'answer',
      render: (text) => text,
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)}
                           menuOptions={[{key: '1', name: '修改'}, {key: '2', name: '删除'}]}/>;
      },
    },
  ];


  return (
    <div>
      <Table
        bordered
        simple
        {...tableProps}
        scroll={{x: 800}}
        columns={columns}
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  );
};
List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
};
export default List;
