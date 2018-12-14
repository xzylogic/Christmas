import React from 'react';
import Router from 'umi/router';
import { Table, Divider, Popconfirm } from 'antd';

import classes from '../Accounts.less';

class AccountList extends React.PureComponent {
  handleState = (e, record) => {
    e.preventDefault();
    const { onSelectedChange } = this.props;
    onSelectedChange(record, 'state');
  };

  handleEditor = (e, record) => {
    e.preventDefault();
    Router.push(`/system/accounts/${record.userId}`);
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

  handlePageChange = page => {
    const { onPageChange } = this.props;
    onPageChange(page - 1);
  };

  render() {
    const { accounts, currentPage, totalElements } = this.props;
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
        dataIndex: 'realName',
        key: 'realName',
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
        render: role => (role && role.roleName) || '',
      },
      {
        title: '是否启用',
        dataIndex: 'enabled',
        key: 'enabled',
        render: text => (text === true ? '启用' : '禁用'),
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        dataIndex: 'enabled',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm
              placement="topRight"
              title={`是否要${record.enabled === true ? '禁用' : '启用'}账号：${record.username}？`}
              onConfirm={e => this.handleState(e, record)}
              onCancel={e => e.preventDefault()}
              okText="是"
              cancelText="否"
            >
              <a>{text === true ? '禁用' : '启用'}</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a onClick={e => this.handleEditor(e, record)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title={`是否要重置账号${record.username}的密码为：123456？`}
              onConfirm={e => this.handleResetPwd(e, record)}
              onCancel={e => e.preventDefault()}
              okText="是"
              cancelText="否"
            >
              <a>重置密码</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title={`是否要删除账号${record.username}？`}
              onConfirm={e => this.handleDelete(e, record)}
              onCancel={e => e.preventDefault()}
              okText="是"
              cancelText="否"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    return (
      <div className={classes.AccountListContainer}>
        <Table
          rowKey="userId"
          dataSource={accounts}
          columns={columns}
          pagination={{
            current: currentPage + 1,
            total: totalElements,
            pageSize: 10,
            onChange: this.handlePageChange,
          }}
          bordered
        />
      </div>
    );
  }
}

export default AccountList;
