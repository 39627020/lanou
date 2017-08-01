import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Button, Row, Form, Input} from 'antd';
import {config} from 'utils';
import styles from './index.less';
import {Link} from 'dva/router';

const FormItem = Form.Item;

const Register = ({
                    register,
                    loading,
                    dispatch,
                    form: {
                      getFieldDecorator,
                      validateFieldsAndScroll,
                    },
                  }) => {
  return <div>注册</div>

};

Register.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(({register, loading}) => ({register, loading}))(Form.create()(Register));
