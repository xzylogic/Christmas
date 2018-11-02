import React from 'react';
import { Table, Divider } from 'antd';

import classes from './AccountList.less';

// const accountList = (props) => {
//   console.log(props.accounts);
//   return (
//     <div className={classes.AccountListContainer}>
//       AccountList
//     </div>
//   );
// }

class AccountList extends React.PureComponent {
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
        render: text => (
          <span>
            <a>{text === true ? '禁用' : '启用'}</a>
            <Divider type="vertical" />
            <a>编辑</a>
            <Divider type="vertical" />
            <a>重置密码</a>
            <Divider type="vertical" />
            <a>删除</a>
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
