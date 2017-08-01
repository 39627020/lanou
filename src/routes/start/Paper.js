import React from 'react'
import PropTypes from 'prop-types'
import {Table,Form} from 'antd'

import style from './Paper.less'

const paper = () => {
  return (
    <div className={style.main_container}>
      <div className={style.paper_container1}>
        <div className={style.paper_container0}>
          <Table/>
        </div>
      </div>
    </div>)
}
paper.prototype = {

  onEditItem: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default Form.create()(paper)
