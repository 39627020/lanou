import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Radio, Modal, InputNumber, Form, Input, Cascader} from 'antd';
import {config} from 'utils';
import city from '../../utils/city';

const FormItem = Form.Item;

const Register = ({

                    loading,
                    dispatch,
                    form: {
                      getFieldDecorator,
                      validateFieldsAndScroll,
                      getFieldsValue,
                    },
                  }) => {

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  }
  const onCancel = () => {
    window.location = `${location.origin}/home`;
  }
  const onRegister = () => {
    validateFieldsAndScroll((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
      }
      data.address = data.address.join(' ')
      dispatch({
        type: `register/register`,
        payload: data,
      });
    });
  }
  return (
    <Modal
      confirmLoading={loading.effects['register/register']}
      onOk={onRegister}
      onCancel={onCancel}
      visible="true"
    >
      <Form layout="horizontal">
        <FormItem label="用户" hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('username', {

              rules: [
                {
                  required: true,
                  message: "用户不能为空",
                },
              ],
            })(<Input/>)
          }
        </FormItem>

        <FormItem label="密码" hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('password', {

              rules: [
                {
                  required: true,
                  message: "密码不能为空",
                },
              ],
            })(<Input/>)
          }
        </FormItem>

        <FormItem label="昵称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nickName', {

            rules: [
              {
                required: true,
                message: "昵称不能为空",
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem label="性别" hasFeedback {...formItemLayout}>
          {getFieldDecorator('female', {

            rules: [
              {
                required: true,
                type: 'boolean',
                message: "性别不能为空",
              },
            ],
          })(
            <Radio.Group>
              <Radio value={false}>男</Radio>
              <Radio value>女</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="年龄" hasFeedback {...formItemLayout}>
          {getFieldDecorator('age', {

            rules: [
              {
                required: true,
                type: 'number',
                message: "年龄不能为空",
              },
            ],
          })(<InputNumber min={18} max={100}/>)}
        </FormItem>
        <FormItem label="手机" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {

            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '请输入正确的手机号码!',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem label="邮箱" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {

            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: '请输入正确的电子邮箱!',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem label="住址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: '地址不能为空',
              },
            ],
          })(<Cascader
            size="large"
            style={{width: '100%'}}
            options={city}
            placeholder="请选择地址"
          />)}
        </FormItem>
      </Form>
    </Modal>)
};

Register.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(({ loading}) => ({loading}))(Form.create()(Register));
