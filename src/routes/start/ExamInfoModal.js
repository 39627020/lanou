import React from 'react'
import {Form, Radio, Avatar, Modal, Table} from 'antd'

const RadioGroup = Radio.Group;
const modal = ({
                 currentPaper,
                 examInfo,
                 ...examInfoProps
               }) => {
  const selectRowRender = (text) => {
    if (text.answer != undefined) {
      //选择题
      return (
        <div>
          <div>题干：{text.question}</div>
          <div>
            <RadioGroup>
              <Radio value="A">A.{text.answer.A}</Radio>
              <Radio value="B">B.{text.answer.B}</Radio>
              <Radio value="C">C.{text.answer.C}</Radio>
              <Radio value="D">D.{text.answer.D}</Radio>
            </RadioGroup>
          </div>
        </div>
      )
    } else {
      //问答题
      return (<div>{text}</div>)
    }
  }
  const columns = [
    {
      title: '图标',
      width: 64,
      render: text => <Avatar style={{backgroundColor: '#7f93d0'}} icon="database"/>,
    },
    {
      title: '试题分类',
      dataIndex: 'subject',
      className: 'subject-type',
      render: text => text.type,
    },
    {
      title: '题目与选项',
      dataIndex: 'question',
      render: selectRowRender,
    },
    {
      title: '我的答案',
      dataIndex: 'id',
      render: text => <div>
        {
          examInfo.answers == undefined ? "" :
            examInfo.answers.filter(item => {
              return item.testItemId == text
            })[0].answer
        }
      </div>,
    },
  ]
  return (

    <Modal
      {...examInfoProps}>
      <Table
        bordered
        simple
        dataSource={currentPaper.testItems}

        scroll={{x: 400}}
        columns={columns}
        rowKey={record => record.id}
      />
    </Modal>
  )
}


export default Form.create()(modal)
