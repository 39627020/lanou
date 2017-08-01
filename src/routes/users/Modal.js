import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, InputNumber, Radio, Modal, Cascader} from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
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
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      data.address = data.address.join(' ')
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">

        <FormItem label="用户" hasFeedback {...formItemLayout}>
          {
            modalOpts.type === "create" ?
              getFieldDecorator('username', {
                initialValue: item.username,
                rules: [
                  {
                    required: true,
                    message: "用户不能为空",
                  },
                ],
              })(<Input/>) : <div style={{'text-align': 'center'}}>{item.username}</div>
          }
        </FormItem>
        {modalOpts.type === "create" ?
          <FormItem label="密码" hasFeedback {...formItemLayout}>
            {

              getFieldDecorator('password', {
                initialValue: item.password,
                rules: [
                  {
                    required: true,
                    message: "密码不能为空",
                  },
                ],
              })(<Input/>)
            }
          </FormItem> : ""
        }
        <FormItem label="昵称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nickName', {
            initialValue: item.nickName,
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
            initialValue: item.female,
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
            initialValue: item.age,
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
            initialValue: item.phone,
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
            initialValue: item.email,
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
            initialValue: item.address && item.address.split(' '),
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
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
