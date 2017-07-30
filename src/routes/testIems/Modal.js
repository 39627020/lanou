import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Modal, Select} from 'antd';

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
                 type,
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

  const {modalType} = modalProps;
  if (modalType == "create") {
    item = {type: type == 1 ? "QUESTION" : "CHOICE"};
  }
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        type: item.type,
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
        <FormItem label="试题类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('subject', {
            initialValue: item.subject,
            rules: [
              {
                required: true,
                message: "请选择试题类型",
              },
            ],
          })(
            <Select size="large" placeholder="请选择类别">
              {
                subjects.map(sub =>
                  <Option value={sub.type}>{sub.type}</Option>
                )
              }
            </Select>
          )}
        </FormItem>
        <FormItem label="试题问题" hasFeedback {...formItemLayout}>
          {getFieldDecorator('question', {
            initialValue: item.question,
            rules: [
              {
                required: true,
                message: '问题不能为空!',
              },
            ],
          })(<Input type="textarea"/>)}
        </FormItem>

        <FormItem label="试题答案" hasFeedback {...formItemLayout}>
          {getFieldDecorator('answer', {
            initialValue: item.answer,
            rules: [
              {
                required: true,
                message: '答案不能为空!',
              },
            ],
          })(<Input type="textarea"/>)}
        </FormItem>
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
