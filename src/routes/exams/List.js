import React from 'react'
import { Table, Modal } from 'antd'
import styles from './List.less'
import { DropOption } from 'components'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'

const confirm = Modal.confirm
import { Link } from 'dva/router'

const List = ({ ...tableProps }) => {
  const { onEditItem, onDeleteItem } = tableProps

  /**
   * 操作选项
   * @param record
   * @param e
   */
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '你确定要删除这个用户吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '图标',
      width: 64,
      render: text => <Avatar style={{ backgroundColor: '#d04b60' }} icon="book" />,
    },
    {
      title: '考试分类',
      dataIndex: 'subject',
      className: 'subject-type',
      render: text => text,
    },
    {
      title: '考试简介',
      dataIndex: 'description',
      render: text => text,
    },
    {
      title: '所属试卷',
      dataIndex: 'paper',
      render: text => (text == null ? '' : <Link to={`papers/${text.id}`}>{text.description}</Link>),
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return (<DropOption
          onMenuClick={e => handleMenuClick(record, e)}
          menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]}
        />)
      },
    },
  ]


  return (
    <div>
      <Table
        bordered
        simple
        {...tableProps}
        scroll={{ x: 600 }}
        columns={columns}
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}
List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
}
export default List
