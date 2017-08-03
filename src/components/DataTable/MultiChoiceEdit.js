import React from 'react'
import { Row, Col, Button, Popconfirm } from 'antd'
import PropTypes from 'prop-types'

const MultiChoiceEdit = ({ selectedRowKeys, handleCancelMultiChoice, handleDeleteItems }) => {
  return (
    <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
      <Col>
        <Button type="primary" size="default" style={{ float: 'left' }} onClick={handleCancelMultiChoice}>取消多选</Button>
        已选择 <strong>{selectedRowKeys.length}</strong> 个项目
        <Popconfirm title={'你确定要删除这些用户吗？删除后不可恢复！'} placement="left" onConfirm={handleDeleteItems}>
          <Button type="danger" size="default" style={{ marginLeft: 8 }}>批量删除</Button>
        </Popconfirm>
      </Col>
    </Row>
  )
}
MultiChoiceEdit.propTypes = {
  handleCancelMultiChoice: PropTypes.func,
  handleDeleteItems: PropTypes.func,
  selectedRowKeys: PropTypes.object,
}
export default MultiChoiceEdit
