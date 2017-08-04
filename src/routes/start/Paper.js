import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Card, Modal, Radio, Button} from 'antd'

const confirm = Modal.confirm
const RadioGroup = Radio.Group
const FormItem = Form.Item
import style from './Paper.less'

const paper = ({
                 paperLoading,
                 completeLoading,
                 currentPaper,
                 currentExam,
                 onOk,
                 onCancel,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
               }) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }
  const handleCancel = () => {
    confirm({
      title: '你确定要退出考试吗？',
      content: '退出考试后，你做的题目讲无法保存！',
      onOk() {
        onCancel()
      },
      onCancel() {
      },
    })
  }
  return (
    <div className={style.paper_container}>
      <Card>
        <h1 style={{textAlign: 'center'}}>{currentExam.description}</h1>
      </Card>
      <Form>
        {currentPaper.testItems == undefined ? '' :
          currentPaper.testItems.map(
            testItem =>
              (<Card>

                {
                  testItem.type == 'QUESTION'
                    ? <div>
                      <h2> {testItem.question}</h2>
                      <FormItem hasFeedback style={{marginTop: 16}}>
                        {getFieldDecorator(`${testItem.id}`, {
                          rules: [
                            {
                              required: true,
                              message: '答案不能为空!',
                            },
                          ],
                        })(<Input type="textarea"/>)}
                      </FormItem>
                    </div>
                    : <div>
                      <h2> {testItem.question.question}</h2>
                      <FormItem hasFeedback style={{marginTop: 16}}>
                        {getFieldDecorator(`${testItem.id}`, {
                          rules: [
                            {
                              required: true,
                              message: '答案不能为空!',
                            },
                          ],
                        })(
                          <RadioGroup>
                            <Radio value="A">A.{testItem.question.answer.A}</Radio>
                            <Radio value="B">B.{testItem.question.answer.B}</Radio>
                            <Radio value="C">C.{testItem.question.answer.C}</Radio>
                            <Radio value="D">D.{testItem.question.answer.D}</Radio>
                          </RadioGroup>
                        )}
                      </FormItem>
                    </div>
                }
              </Card>)
          )
        }
      </Form>
      <Card>
        <div style={{textAlign: 'right'}}>
          <Button style={{marginRight: 16}} type="primary" onClick={handleOk} loading={completeLoading}>完成考试</Button>
          <Button style={{marginRight: 16}} type="danger" onClick={handleCancel}>退出考试</Button>
        </div>
      </Card>
    </div>)
}
paper.prototype = {

  onEditItem: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default Form.create()(paper)
