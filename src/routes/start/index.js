import Header from '../home/Nav'
import {connect} from 'dva'
import React from 'react'
import '../home/less/nav.less'
import NProgress from 'nprogress'
import style from './index.less'
import Paper from './Paper'
import Exams from './Exams'
import ExamInfoModal from './ExamInfoModal'
import MoreExamModal from './MoreExamModal'

const Start = ({loading, start, app, dispatch}) => {
  // 界面上的加载条
  let lastHref
  const href = window.location.href
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }
  const {
    exams, currentPaper, examInfoModal,
    moreExamModal, currentExam, doPaper, examInfo,
  } = start
  const {isNavbar, subjects} = app
  const examsProps = {
    subjects,
    exams,
    doExam: (exam) => {
      dispatch({
        type: 'start/startExam',
        payload: exam,
      })
    },
    showExamInfo: (exam) => {
      dispatch({
        type: 'start/queryExamInfo',
        payload: exam,

      })
    },
    showMoreExams: (exam) => {
      console.log(exam)
    },
  }
  const paperProps = {
    completeLoading: loading.effects['start/completeExam'],
    paperLoading: loading.effects['start/queryPaper'],
    currentPaper,
    currentExam,
    onOk: (data) => {
      dispatch({
        type: 'start/completeExam',
        payload:
          {
            examId: currentExam.id,
            paperId: currentPaper.id,
            answer: data,
          },
      })
    },
    onCancel: () => {
      dispatch(
        {
          type: 'start/endExam',
        }
      )
    },
  }
  const examInfoProps = {
    visible: {examInfoModal},
    infoLoading:loading.effects['start/queryExamInfo'],
    title: "考试详情",
    footer: null,
    examInfo,
    currentPaper,
    onCancel() {
      dispatch({
        type: "start/hideExamInfoModal"
      })
    }
  }
  const moreExamProps = {
    title: "考试详情"
  }
  return (
    <div className={style.start_container}>
      <Header id="nav_1_0" key="nav_1_0" isMode={isNavbar} style={{position: 'fixed'}}/>
      {doPaper ? <Paper {...paperProps} /> : <Exams {...examsProps} />}
      {examInfoModal && <ExamInfoModal {...examInfoProps}/>}
      {/*{moreExamModal && <MoreExamModal {...moreExamProps}/>}*/}
    </div>

  )
}
export default connect(({start, loading, app}) => ({start, loading, app}))(Start)

