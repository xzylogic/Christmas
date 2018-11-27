import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Popconfirm } from 'antd';
import moment from 'moment';
import debounce from 'lodash.debounce';

import SearchBar from './SearchBar';
import TableList from './TableList';
import GroupEditor from './GroupEditor';

const mapStateToProps = state => ({
  groupName: state.businessYilianWechatManagement.searchParam.groupName,
  groupList: state.businessYilianWechatManagement.list.group,
  currentPage: state.businessYilianWechatManagement.currentPage.group,
  totalElements: state.businessYilianWechatManagement.totalElements.group,
  loading: state.loading.effects['businessYilianWechatManagement/fetchGroupList'],
});

const mapDispatchToProps = dispatch => ({
  onFetchGroupList: page =>
    dispatch({
      type: 'businessYilianWechatManagement/fetchGroupList',
      payload: { page },
    }),
  onSearchGroupList: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatManagement/fetchGroupList',
        payload: { page },
      }),
    500
  ),
  onUpdateSearchParam: (key, value) =>
    dispatch({
      type: 'businessYilianWechatManagement/updateSearchParam',
      payload: { key, value },
    }),
  onDeleteGroup: id =>
    dispatch({
      type: 'businessYilianWechatManagement/deleteGroup',
      payload: { id },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class GroupContainer extends Component {
  state = {
    showEditor: false,
    selectedData: null,
  };

  componentDidMount() {
    const { groupList, onFetchGroupList } = this.props;
    if (!groupList) {
      onFetchGroupList(0);
    }
  }

  handleEditor = (e, record) => {
    e.preventDefault();
    this.setState({
      showEditor: true,
      selectedData: record,
    });
  };

  handleDelete = (e, record) => {
    e.preventDefault();
    const { onDeleteGroup } = this.props;
    onDeleteGroup(record.id);
  };

  handlePageChange = page => {
    const { onFetchGroupList } = this.props;
    onFetchGroupList(page - 1);
  };

  setTableColumns = () => {
    const columns = [
      {
        title: '组名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '组编号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '负责人',
        dataIndex: 'leader',
        key: 'leader',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '状态',
        dataIndex: 'valid',
        key: 'valid',
        render: text => (text !== undefined && (text ? '有效' : '无效')) || '',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={e => this.handleEditor(e, record)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title={`确定要删除【${record.name}】这条记录吗？`}
              onConfirm={e => this.handleDelete(e, record)}
              onCancel={e => e.preventDefault()}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    return columns;
  };

  handleParamChange = async e => {
    e.preventDefault();
    const { onUpdateSearchParam, onSearchGroupList } = this.props;
    await onUpdateSearchParam('groupName', e.target.value);
    await onSearchGroupList(0);
  };

  handleRefresh = e => {
    e.preventDefault();
    const { onFetchGroupList } = this.props;
    onFetchGroupList(0);
  };

  handleNew = e => {
    e.preventDefault();
    this.setState({
      showEditor: true,
      selectedData: null,
    });
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
  };

  render() {
    const { groupName, groupList, currentPage, totalElements } = this.props;
    const { showEditor, selectedData } = this.state;
    return (
      <div>
        <SearchBar
          inputValue={groupName}
          inputPlaceholder="输入小组名称进行检索"
          onInputChange={this.handleParamChange}
          onRefreshClick={this.handleRefresh}
          onNewClick={this.handleNew}
          onExportClick={this.handleExport}
        />
        <Divider />
        <TableList
          rowKey="id"
          list={groupList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
        <GroupEditor
          visible={showEditor}
          initialValue={selectedData}
          onClose={() => this.setState({ showEditor: false })}
        />
      </div>
    );
  }
}

export default GroupContainer;
