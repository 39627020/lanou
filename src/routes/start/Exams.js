import { Table, Button, Form, Card, Col, Row } from 'antd'
import style from './Exams.less'
import { Link } from 'dva/router'

const exmas = ({ ...examsProps }) => {
  const { subjects, exams, doExam, showExamInfo, showMoreExams } = examsProps
  const handleDoExam = (e) => {
    doExam(e)
  }
  const handleShowExamInfo = (e) => {
    showExamInfo(e)
  }
  const handleMoreExam = (e) => {
    showMoreExams(e)
  }
  return (

    <div className={style.exams_container}>
      <Row gutter={16} type="flex" align="top">
        {
          subjects.map(sub =>
            (<Col span={12} style={{ marginBottom: 16 }}>
              <Card title={sub.type} bordered={false}>
                {
                  exams.filter(_ => _.subject.type == sub.type)
                    .slice(0, 4)
                    .map(exam =>
                      (<div style={{ position: 'relative', marginBottom: 8 }}>
                        <span>{exam.description}</span>
                        <span style={{ position: 'absolute', right: 0 }}>
                          <Button
                            style={{ marginRight: 16 }}
                            size="small"
                            onClick={() => handleDoExam(exam)}
                          >开始</Button>
                          <Button size="small" onClick={() => handleShowExamInfo(exam)}>详情</Button>
                        </span>
                      </div>)
                    )
                }
                <div style={{ position: 'relative', marginBottom: 16 }}>
                  <Button style={{ position: 'absolute', left: 0 }} size="small" onClick={() => handleMoreExam(sub)}>更多</Button>
                </div>
              </Card>
            </Col>))
        }
      </Row>
    </div>
  )
}
export default Form.create()(exmas)
