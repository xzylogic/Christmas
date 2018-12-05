import React from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { Table, Divider, Popconfirm } from 'antd';

import classes from '../Roles.less';

const mapStateToProps = state => ({
  loadingEnable: state.loading.effects['role/fetchRoleList'],
  loadingDelete: state.loading.effects['role/fetchRoleList'],
});

const mapDispatchToProps = dispatch => ({
  onFetchRoleList: page =>
    dispatch({
      type: 'role/fetchRoleList',
      payload: { page },
    }),
  onUpdateSearchParam: (key, name) =>
    dispatch({
      type: 'role/updateSearchParam',
      payload: { key, name },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class RoleList extends React.PureComponent {
  handleState = (e, record) => {
    e.preventDefault();
    const { onSelectedChange } = this.props;
    onSelectedChange(record, 'state');
  };

  handleEditor = (e, record) => {
    e.preventDefault();
    Router.push(`/system/roles/${record.roleId}`);
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
    const { roles, currentPage, totalElements } = this.props;
    const columns = [
      {
        title: 'NO.',
        dataIndex: 'no',
        key: 'no',
        render: (text, record, i) => i + 1,
      },
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '是否启用',
        dataIndex: 'deleted',
        key: 'deleted',
        render: text => (text === false ? '启用' : '禁用'),
      },
      {
        title: '更新时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        dataIndex: 'deleted',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm
              placement="topRight"
              title={`是否要${record.deleted === false ? '禁用' : '启用'}账号${record.roleName}？`}
              onConfirm={e => this.handleState(e, record)}
              onCancel={e => e.preventDefault()}
              okText="是"
              cancelText="否"
            >
              <a>{text === false ? '禁用' : '启用'}</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a onClick={e => this.handleEditor(e, record)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title={`是否要删除账号${record.roleName}？`}
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
      <div className={classes.RoleListContainer}>
        <Table
          rowKey="roleId"
          dataSource={roles}
          columns={columns}
          pagination={{
            current: currentPage + 1,
            total: totalElements,
            pageSize: 10,
            onChange: this.handlePageChange,
          }}
        />
      </div>
    );
  }
}

export default RoleList;
