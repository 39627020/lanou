import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input,  Modal, Select} from 'antd';

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
        <FormItem label="考试类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('subject', {
            initialValue: item.subject,
            rules: [
              {
                required: true,
                message: "请选择考试类型",
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
        <FormItem label="考试简介" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: true,
                message: '考试简介不能为空!',
              },
            ],
          })(<Input type="textarea"/>)}
        </FormItem>

        <FormItem label="试卷选择" hasFeedback {...formItemLayout}>
          {getFieldDecorator('papers', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '试卷不能为空!',
              },
            ],
          })(<Input/>)}
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
