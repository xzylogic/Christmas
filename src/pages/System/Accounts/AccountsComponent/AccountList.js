import React from 'react';
import Router from 'umi/router';
import { Table, Divider } from 'antd';

import classes from '../Accounts.less';

class AccountList extends React.PureComponent {
  handleState = (e, record) => {
    e.preventDefault();
    const { onSelectedChange } = this.props;
    onSelectedChange(record, 'state');
  };

  handleEditor = (e, record) => {
    e.preventDefault();
    Router.push(`/system/accounts/${record.id}`);
  };

  handleResetPwd = (e, record) => {
    e.preventDefault();
    const { onSelectedChange } = this.props;
    onSelectedChange(record, 'reset');
  };

  handleDelete = (e, record) => {
    e.preventDefault();
    const { onSelectedChange } = this.props;
    onSelectedChange(record, 'delete');
  };

  render() {
    const { accounts } = this.props;
    const columns = [
      {
        title: 'NO.',
        dataIndex: 'no',
        key: 'no',
        render: (text, record, i) => i + 1,
      },
      {
        title: '账号',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '姓名',
        dataIndex: 'realname',
        key: 'realname',
      },
      {
        title: '角色',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '是否启用',
        dataIndex: 'isDelete',
        key: 'isDelete',
        render: text => (text === true ? '启用' : '禁用'),
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        dataIndex: 'isDelete',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={e => this.handleState(e, record)}>{text === true ? '禁用' : '启用'}</a>
            <Divider type="vertical" />
            <a onClick={e => this.handleEditor(e, record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={e => this.handleResetPwd(e, record)}>重置密码</a>
            <Divider type="vertical" />
            <a onClick={e => this.handleDelete(e, record)}>删除</a>
          </span>
        ),
      },
    ];

    return (
      <div className={classes.AccountListContainer}>
        <Table
          rowKey="username"
          dataSource={accounts}
          columns={columns}
          pagination={{ current: 0, total: 100 }}
        />
      </div>
    );
  }
}

export default AccountList;
