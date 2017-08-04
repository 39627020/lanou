import React from 'react'
import {Form, Button, Modal, Table} from 'antd'


const modal2 = ({
                  showExamInfo,
                  doExam,
                  tableLoading,
                  tableDataSource,
                  tablePagination,
                  onChange,
                  onCancel,
                  ...moreExamProps
                }) => {

  const dataSource = tableDataSource
  const pagination = tablePagination
  const subject = tableDataSource[0].subject.type
  const columns = [

    {
      title: '考试分类',
      dataIndex: 'subject',
      className: 'subject-type',
      render: text => text.type,
    },
    {
      title: '考试简介',
      dataIndex: 'description',
      render: text => text,
    },
    {
      title: '考试操作',
      dataIndex: 'id',
      render: (text, record) => <span>
                          <Button size="small" onClick={() => {
                            onCancel(),
                              doExam(record)
                          }}>开始</Button>
                          <Button size="small" onClick={() => showExamInfo(record)}>详情</Button>
                        </span>,
    },


  ]
  return (
    <Modal
      onCancel={onCancel}
      {...moreExamProps}>
      <Table
        loading={tableLoading}
        bordered
        simple
        scroll={{x: 400}}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        rowKey={record => record.id}
        onChange={(pagination) => onChange(pagination,subject)}
      />
    </Modal>
  )
}


export default Form.create()(modal2)
