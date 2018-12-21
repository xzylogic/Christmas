import React, { Component } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import { Form, Input, Button, Select } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import classes from '../Accounts.less';

const mapStateToProps = state => ({
  selectedAccount: state.account.selectedAccount,
  roles: state.account.roles,
  loading: state.loading.effects['account/saveAccount'],
});

const mapDispatchToProps = dispatch => ({
  onFetchAccountDetail: userId =>
    dispatch({
      type: 'account/fetchAccountDetail',
      payload: { userId },
    }),
  onFetchAllRoles: () =>
    dispatch({
      type: 'account/fetchAllRoles',
    }),
  onSaveAccount: data =>
    dispatch({
      type: 'account/saveAccount',
      payload: { data },
    }),
  onUpdateSelectedAccount: data =>
    dispatch({
      type: 'account/updateSelectedAccount',
      payload: data,
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class AccountDetail extends Component {
  state = {
    confirmDirty: false,
  };

  componentDidMount() {
    const {
      roles,
      onFetchAllRoles,
      match: {
        params: { id },
      },
      onFetchAccountDetail,
      onUpdateSelectedAccount,
    } = this.props;
    if (!roles) {
      onFetchAllRoles();
    }
    if (id !== '0') {
      onFetchAccountDetail(id);
    } else {
      onUpdateSelectedAccount(null);
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两个密码不一致！');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form,
      match: {
        params: { id },
      },
      onSaveAccount,
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const postData = { ...values };
        delete postData.confirm;
        if (id !== '0') {
          postData.userId = id;
        }
        onSaveAccount(postData);
      }
    });
  };

  goBack = () => {
    const { onUpdateSelectedAccount } = this.props;
    onUpdateSelectedAccount(null);
    Router.push(`/system/accounts`);
  };

  render() {
    const {
      form: { getFieldDecorator },
      selectedAccount,
      roles,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper>
        <div className={classes.Accounts}>
          <Form className={classes.AccountFormContainer} onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="姓名">
              {getFieldDecorator('realName', {
                initialValue: selectedAccount && selectedAccount.realName,
                rules: [{ required: true, message: '请填写真实姓名' }],
              })(<Input placeholder="请填写真实姓名" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="账号">
              {getFieldDecorator('username', {
                initialValue: selectedAccount && selectedAccount.username,
                rules: [{ required: true, message: '请填写用户账号' }],
              })(<Input placeholder="请填写用户账号" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="密码">
              {getFieldDecorator('password', {
                initialValue: selectedAccount && selectedAccount.password,
                rules: [
                  {
                    required: true,
                    message: '请填写密码',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input type="password" placeholder="请填写密码" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="确认密码">
              {getFieldDecorator('confirm', {
                initialValue: selectedAccount && selectedAccount.password,
                rules: [
                  {
                    required: true,
                    message: '请确认密码',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input type="password" placeholder="请确认密码" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="角色">
              {getFieldDecorator('roleId', {
                initialValue:
                  (selectedAccount && selectedAccount.role && selectedAccount.role.roleId) ||
                  ((roles && roles[0] && roles[0].roleId) || ''),
                rules: [{ required: true, message: '请选择角色' }],
              })(
                <Select>
                  {roles &&
                    roles.map(role => (
                      <Select.Option key={role.roleId} value={role.roleId}>
                        {role.roleName}
                      </Select.Option>
                    ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.goBack}>
                返回
              </Button>
            </Form.Item>
          </Form>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default AccountDetail;
