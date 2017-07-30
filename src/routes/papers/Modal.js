import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Modal, Select} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
import {Table} from 'antd';

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
  const {currentItem} = modalProps;
  const columns = [{
    title: '题型',
    dataIndex: 'type',
    render: text => text == "QUESTION" ? '问答题' : '选择题'
  },
    {
      title: '题干',
      dataIndex: 'question',
    }, {
      title: '答案',
      dataIndex: 'answer',
    }];
  const data = currentItem.testItems;

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
        <Table columns={columns} dataSource={data}/>
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
