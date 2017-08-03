import Header from '../home/Nav';
import {connect} from 'dva';
import React from 'react';
import '../home/less/nav.less';
import NProgress from 'nprogress'
import style from './index.less'
import Paper from './Paper'
import Exams from './Exams'

const Start = ({loading, start, app, dispatch}) => {
  //界面上的加载条
  let lastHref
  const href = window.location.href
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }
  const {exams, currentPaper, currentExam, doPaper} = start
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
      console.log(exam)
    },
    showMoreExams: (examSubject) => {
      console.log(examSubject)
    },
  }
  const paperProps = {
    currentPaper,
    currentExam,
    onOk: (exam) => {
      console.log(exam)
    },
    onCancel: () => {

      dispatch(
        {
          type: "start/endExam"
        }
      )
    },
  }

  return (
    <div className={style.start_container}>
      <Header id="nav_1_0" key="nav_1_0" isMode={isNavbar} style={{position: "fixed"}}/>
      {doPaper ? <Paper {...paperProps}/> : <Exams {...examsProps}/>}
    </div>

  )
}
export default connect(({start, loading, app}) => ({start, loading, app}))(Start);

