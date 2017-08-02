import Header from '../home/Nav';
import {connect} from 'dva';
import React from 'react';
import '../home/less/nav.less';
import NProgress from 'nprogress'
import style from './index.less'
import Paper from './Paper'
import Exams from './Exams'

const Start = ({loading, start, app}) => {
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
  const {exams, currentPaper, isAnswer} = start
  const {isNavbar, subjects} = app
  const examsProps = {
    subjects,
    exams,
    doExam: (exam) => {
      console.log(exam)
    },
    showExamInfo: (exam) => {
      console.log(exam)
    },
    showMoreExams: (examSubject) => {
      console.log(examSubject)
    },


  }

  return (
    <div className={style.start_container}>
      <Header id="nav_1_0" key="nav_1_0" isMode={isNavbar} style={{position: "fixed"}}/>
      {isAnswer ? <Paper/> : <Exams {...examsProps}/>}
    </div>

  )
}
export default connect(({start, loading, app}) => ({start, loading, app}))(Start);

