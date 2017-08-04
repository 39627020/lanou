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
  const doExam = (exam) => {
    dispatch({
      type: 'start/startExam',
      payload: exam,
    })
  }
  const showExamInfo = (exam) => {
    dispatch({
      type: 'start/queryExamInfo',
      payload: exam,
    })
  }
  const {
    exams, currentPaper, examInfoModal, moreExams,
    moreExamModal, currentExam, doPaper, examInfo,
  } = start
  const {isNavbar, subjects} = app
  const examsProps = {
    subjects,
    exams,
    doExam,
    showExamInfo,
    showMoreExams: (subject) => {
      dispatch({
        type: 'start/queryMoreExam',
        payload: {
          subject: subject.type
        },
      })
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
    onCancel: (page, subject) => {
      dispatch(
        {
          type: 'start/endExam',
        }
      )
    },
  }
  const examInfoProps = {
    visible: {examInfoModal},
    infoLoading: loading.effects['start/queryExamInfo'],
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
    visible: {moreExamModal},
    title: "更多考试",
    tableLoading: loading.effects['start/queryMoreExam'],
    tableDataSource: moreExams.list,
    tablePagination: moreExams.pagination,
    footer: null,
    doExam,
    showExamInfo,
    onCancel() {
      dispatch({
        type: "start/hideMoreExamModal"
      })
    },
    onChange(page, subjectType) {

      dispatch({
        type: 'start/queryMoreExam',
        payload: {
          subject: subjectType,
          page: page.current,
          pageSize: page.pageSize,
       

        },
      })

    },

  }
  return (
    <div className={style.start_container}>
      <Header id="nav_1_0" key="nav_1_0" isMode={isNavbar} style={{position: 'fixed'}}/>
      {doPaper ? <Paper {...paperProps} /> : <Exams {...examsProps} />}
      {examInfoModal && <ExamInfoModal {...examInfoProps}/>}
      {moreExamModal && <MoreExamModal {...moreExamProps}/>}
    </div>

  )
}
export default connect(({start, loading, app}) => ({start, loading, app}))(Start)

