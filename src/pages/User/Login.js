import React, { Component } from 'react';
import { connect } from 'dva';
import { Checkbox, Alert } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <div style={{ marginTop: '50px' }}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('用户名或密码错误')}
            <UserName name="userName" />
            <Password
              name="password"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </div>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
