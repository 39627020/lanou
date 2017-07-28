import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {FilterItem} from 'components';
import {Form, Button, Row, Col, Input} from 'antd';
import {Select} from 'antd';
const Option = Select.Option;

const Filter = ({
                  subjects,
                  onAdd,
                  onFilterChange,
                  filter,
                  form: {
                    getFieldsValue,
                    setFieldsValue,
                    getFieldDecorator,
                  },
                }) => {
  const handleSubmit = () => {
    let fields = getFieldsValue();
    onFilterChange(fields);
  };
  const handleSelect = (value) => {
    console.log(`selected ${value}`);
    let fields = {subject: value};
    onFilterChange(fields);
  };

  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    setFieldsValue(fields);
    handleSubmit();
  };


  return (
    <Row gutter={24} style={{marginBottom: 16}}>
      <Col sm={{span: 6}} xs={{span: 24}}>
        <Select defaultValue="all" style={{width: 120}} onChange={handleSelect}>
          <Option value='all'>全部</Option>
          {
            subjects.map(sub =>
              <Option value={sub.type}>{sub.type}</Option>
            )
          }
        </Select>

      </Col>
      <Col sm={{span: 6}} xs={{span: 16}}>
        <div>
          <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
          <Button size="large" onClick={handleReset}>重置</Button>
        </div>
      </Col>
      <Col sm={{span: 6, offset: 6}} xs={{span: 8}}>
        <div style={{float: "right"}}>
          <Button size="large" type="ghost" onClick={onAdd}>新增用户</Button>
        </div>
      </Col>
    </Row>
  );
};

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  subjects: PropTypes.array,
};

export default Form.create()(Filter);
