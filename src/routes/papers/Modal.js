import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Modal,  Select} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import { Table } from 'antd';
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const modal = ({
                 subjects = [],
                 item = {},
                 onOk,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
                 ...modalProps
               }) => {


  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];
  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }];

// rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  };





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

        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
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
