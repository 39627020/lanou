import React from 'react';
import PropTypes from 'prop-types';
import {Form, Select, Button, Row, Col} from 'antd';
import {FilterItem} from 'components';

const Option = Select.Option;

const Filter = ({
                  type,
                  subjects,
                  onAdd,
                  onFilterChange,
                  form: {
                    getFieldsValue,
                    setFieldsValue,
                    getFieldDecorator,
                  },
                }) => {
  const handleAddClick =()=>{onAdd(type)}

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

  const ColProps = {

    style: {
      marginBottom: 16,
    },
  };
  return (
    <Row gutter={24}>
      <Col {...ColProps} sm={{span: 6}} xs={{span: 24}}>
        <FilterItem label="试题类型">
          {getFieldDecorator('subject')(
            <Select size="large" placeholder="请选择类别" style={{width: 120}} onChange={handleSelect}>
              {
                subjects.map(sub =>
                  <Option value={sub.type}>{sub.type}</Option>
                )
              }
            </Select>
          )}
        </FilterItem>
      </Col>
      <Col {...ColProps} sm={{span: 6}} xs={{span: 16}}>
        <div>
          <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
          <Button size="large" onClick={handleReset}>重置</Button>
        </div>
      </Col>
      <Col {...ColProps} sm={{span: 6, offset: 6}} xs={{span: 8}}>
        <div style={{float: "right"}}>
          <Button size="large" type="ghost" onClick={ handleAddClick }>新增试题</Button>
        </div>
      </Col>
    </Row>
  );
};

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  onFilterChange: PropTypes.func,
  subjects: PropTypes.array,
};

export default Form.create()(Filter);
