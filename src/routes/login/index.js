import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Button, Row, Form, Input} from 'antd';
import {config} from 'utils';
import styles from './index.less';
import {Link} from 'dva/router';

const FormItem = Form.Item;

const Login = ({
                 login,
                 dispatch,
                 form: {
                   getFieldDecorator,
                   validateFieldsAndScroll,
                 },
               }) => {
  const {loginLoading} = login;

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      dispatch({type: 'login/login', payload: values});
    });
  }

  return (
    <div className={styles.form}>
      <Link to={"/home"}>
        <div className={styles.logo}>
          <img alt={'logo'} src={config.logo}/>
          <span>{config.name}</span>
        </div>
      </Link>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="用户姓名"/>)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="用户密码"/>)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
            登录
          </Button>
          <p>
            <span> <Link to="/register">注册账号</Link></span>

            <span> <Link to="/home">找回密码</Link></span>
          </p>
        </Row>

      </form>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(({login}) => ({login}))(Form.create()(Login));
