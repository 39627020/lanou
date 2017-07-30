import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Modal, Select, Collapse, Tabs, Table} from 'antd';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const Option = Select.Option;
const FormItem = Form.Item;


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const modal = ({
                 onTestItemPageChange,
                 onSwitchItem,
                 type,
                 subjects = [],
                 item = {},
                 onOk,
                 onChoiceItem,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
                 ...modalProps
               }) => {
  const {modalItemVisible, testItemList, testItemPagination, rowSelection,} = modalProps;
  const columns = [
    {
      title: '题型',
      dataIndex: 'type',
      render: text => text == "QUESTION" ? '问答题' : '选择题'
    },
    {
      title: '类型',
      dataIndex: 'subject',
      render: text => text.type
    },
    {
      title: '题干',
      dataIndex: 'question',
    },
    {
      title: '答案',
      dataIndex: 'answer',
    }];
  const handleSwitchItem = key => onSwitchItem(key);
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
      };
      onOk(data);
    });
  };
  const handlePageChange1 = (page) => onTestItemPageChange(page, 1);
  const handlePageChange2 = (page) => onTestItemPageChange(page, 2);
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="试卷类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('subject', {
            initialValue: item.subject,
            rules: [
              {
                required: true,
                message: "请选择试卷类型",
              },
            ],
          })(
            <Select size="large" placeholder="请选择类型">
              {
                subjects.map(sub =>
                  <Option value={sub.type}>{sub.type}</Option>
                )
              }
            </Select>
          )}
        </FormItem>
        <FormItem label="试卷描述" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: true,
                message: '试卷描述不能为空!',
              },
            ],
          })(<Input type="textarea"/>)}
        </FormItem>

        {type == "update" && modalItemVisible &&
        <Table columns={columns} pagination={false} dataSource={item.testItems}/>}

        <Collapse onChange={onChoiceItem}>
          <Panel header="选择包含的题目" key="1">
            <Tabs defaultActiveKey="1" onChange={handleSwitchItem}>
              <TabPane tab="问答题" key="1">
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  pagination={testItemPagination}
                  onChange={handlePageChange1}
                  rowKey={record => record.id}
                  dataSource={testItemList}/>
              </TabPane>
              <TabPane tab="选择题" key="2">
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  pagination={testItemPagination}
                  onChange={handlePageChange2}
                  dataSource={testItemList}
                  rowKey={record => record.id}/>
              </TabPane>
            </Tabs>
          </Panel>
        </Collapse>
      </Form>

    </Modal>
  );
};

modal.propTypes = {
  form: PropTypes.object.isRequired,
  subjects: PropTypes.array,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
};

export default Form.create()(modal);
