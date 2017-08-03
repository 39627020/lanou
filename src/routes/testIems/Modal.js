import React from 'react'
import PropTypes from 'prop-types'
import {Form, Radio, Card, Input, Modal, Select} from 'antd'

const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
                 type,
                 subjects = [],
                 item = {},
                 onOk,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                   getFieldValue,
                 },
                 ...modalProps
               }) => {
  const {modalType} = modalProps
  if (modalType == 'create') {
    item = {type: type == 2 ? 'CHOICE' : 'QUESTION'}
  }
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      let data = item.type == "QUESTION"
        ? {
          type: item.type,
          ...getFieldsValue(),
        }
        : {
          type: item.type,
          subject: getFieldValue('subject'),
          question: JSON.stringify({
            question: getFieldValue("choiceQuestion"),
            answer: {
              A: getFieldValue("A"),
              B: getFieldValue("B"),
              C: getFieldValue("C"),
              D: getFieldValue("D"),
            }
          }),
          answer: getFieldValue("answer"),
        }

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
        <FormItem label="试题类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('subject', {
            initialValue: item.subject,
            rules: [
              {
                required: true,
                message: '请选择试题类型',
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
        {
          //多种情况判断是否是问答题的修改框
          item.type == "QUESTION" || type == 1 || type == undefined
            ? <FormItem label="问答题题干" hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('question', {
                  initialValue: item.question,
                  rules: [
                    {
                      required: true,
                      message: '问题不能为空!',
                    },
                  ],
                })(<Input type="textarea"/>)

              }
            </FormItem>
            : <Card>
              <FormItem label="选择题题干" hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('choiceQuestion', {
                    initialValue: item.question == undefined ? "" : item.question.question,
                    rules: [
                      {
                        required: true,
                        message: '问题不能为空!',
                      },
                    ],
                  })(<Input type="textarea"/>)
                }
              </FormItem>
              <FormItem label="选项A" hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('A', {
                    initialValue: item.question == undefined ? "" : item.question.answer.A,
                    rules: [
                      {
                        required: true,
                        message: 'A选项不能为空!',
                      },
                    ],
                  })(<Input/>)
                }
              </FormItem>
              <FormItem label="选项B" hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('B', {
                    initialValue: item.question == undefined ? "" : item.question.answer.B,
                    rules: [
                      {
                        required: true,
                        message: 'B选项不能为空!',
                      },
                    ],
                  })(<Input/>)
                }
              </FormItem>
              <FormItem label="选项C" hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('C', {
                    initialValue: item.question == undefined ? "" : item.question.answer.C,
                    rules: [
                      {
                        required: true,
                        message: 'C选项不能为空!',
                      },
                    ],
                  })(<Input/>)
                }
              </FormItem>
              <FormItem label="选项D" hasFeedback {...formItemLayout}>
                {
                  getFieldDecorator('D', {
                    initialValue: item.question == undefined ? "" : item.question.answer.D,
                    rules: [
                      {
                        required: true,
                        message: 'D选项不能为空!',
                      },
                    ],
                  })(<Input/>)
                }
              </FormItem>
            </Card>
        }

        {
          item.type == "QUESTION" || type == 1 || type == undefined
            ? <FormItem label="试题答案" hasFeedback {...formItemLayout}>
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
            : <FormItem label="试题答案" hasFeedback {...formItemLayout}>
              {getFieldDecorator('answer', {
                initialValue: item.answer,
                rules: [
                  {
                    required: true,
                    message: '答案不能为空!',
                  },
                ],
              })(<RadioGroup>
                <Radio value="A">选项 A</Radio>
                <Radio value="B">选项 B</Radio>
                <Radio value="C">选项 C</Radio>
                <Radio value="D">选项 D</Radio>
              </RadioGroup>)}
            </FormItem>
        }

      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  subjects: PropTypes.array,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
