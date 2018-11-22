import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import classes from '../Roles.less';

@connect(({ role }) => ({
  roleList: role.roleList,
  searchParam: role.searchParam,
}))
@Form.create()
class RoleDetail extends Component {
  componentDidMount() {
    console.log(this.props);
  }

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
        <div className={classes.Roles}>
          <Form className={classes.RoleFormContainer} onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="角色名称">
              {getFieldDecorator('roleName', {
                rules: [{ required: true, message: '请填写角色名称' }],
              })(<Input placeholder="请填写角色名称" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="权限列表">
              {getFieldDecorator('role', {
                rules: [{ required: true, message: '请选择权限列表' }],
              })(<Input placeholder="请选择权限列表" />)}
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

export default RoleDetail;
