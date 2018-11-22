import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import classes from '../Accounts.less';

@connect(({ account }) => ({
  accountList: account.accountList,
  searchParam: account.searchParam,
}))
@Form.create()
class AccountDetail extends Component {
  state = {
    confirmDirty: false,
  };

  componentDidMount() {
    console.log(this.props);
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
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      history: { goBack },
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
                rules: [{ required: true, message: '请填写真实姓名' }],
              })(<Input placeholder="请填写真实姓名" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="账号">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请填写用户账号' }],
              })(<Input placeholder="请填写用户账号" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="密码">
              {getFieldDecorator('password', {
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
              {getFieldDecorator('role', {
                rules: [{ required: true, message: '请选择角色' }],
              })(
                <Select>
                  <Select.Option value="1">角色1</Select.Option>
                  <Select.Option value="2">角色2</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={goBack}>
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
