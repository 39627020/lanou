import React from 'react'
import PropTypes from 'prop-types'
import {Table, Form} from 'antd'

import style from './Paper.less'

const paper = () => {
  return (
    <div className={style.paper_container}>

      <Table/>

    </div>)
}
paper.prototype = {

  onEditItem: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default Form.create()(paper)
