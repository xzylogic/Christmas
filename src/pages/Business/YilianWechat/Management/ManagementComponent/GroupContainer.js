import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Popconfirm } from 'antd';
import moment from 'moment';
import debounce from 'lodash.debounce';

import SearchBar from './SearchBar';
import TableList from './TableList';
import GroupEditor from './GroupEditor';
import GroupHosEditor from './GroupHosEditor';

const mapStateToProps = state => ({
  groupName: state.businessYilianWechatManagement.searchParam.groupName,
  groupList: state.businessYilianWechatManagement.list.group,
  currentPage: state.businessYilianWechatManagement.currentPage.group,
  totalElements: state.businessYilianWechatManagement.totalElements.group,
  loading: state.loading.effects['businessYilianWechatManagement/fetchGroupList'],
  allGroupName: state.businessYilianWechatManagement.list.allGroupName,
  allHosName: state.businessYilianWechatManagement.list.allHosName,
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
  onUpdataSearchParam: (key, value) =>
    dispatch({
      type: 'businessYilianWechatManagement/updateSearchParam',
      payload: { key, value },
    }),
  onDeleteGroup: id =>
    dispatch({
      type: 'businessYilianWechatManagement/deleteGroup',
      payload: { id },
    }),
  onFetchAllGroupName: () =>
    dispatch({
      type: 'businessYilianWechatManagement/fetchAllGroupName',
    }),
  onFetchAllHosName: () =>
    dispatch({
      type: 'businessYilianWechatManagement/fetchAllHosName',
    }),
  onDownloadGroupList: page =>
    dispatch({
      type: 'businessYilianWechatManagement/downloadGroupList',
      payload: { page },
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
    editorBarShow: true,
    showEditorGroupHos: false,
  };

  componentDidMount() {
    const { groupList, onFetchGroupList, onFetchAllGroupName, onFetchAllHosName } = this.props;
    if (!groupList) {
      onFetchGroupList(0);
    }
    onFetchAllGroupName();
    onFetchAllHosName();
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
    const { onUpdataSearchParam, onSearchGroupList } = this.props;
    await onUpdataSearchParam('groupName', e.target.value);
    await onSearchGroupList(0);
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onSearchGroupList } = this.props;
    onSearchGroupList(0);
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
    const { onDownloadGroupList, onUpdataSearchParam, currentPage } = this.props;

    onUpdataSearchParam('groupDownload', true);
    onDownloadGroupList(currentPage).then(data => {
      if (data) {
        const a = document.createElement('a');
        a.setAttribute('href', data);
        a.setAttribute('target', '_blank');
        a.click();
      }
    });
    onUpdataSearchParam('groupDownload', false);
  };

  handlEditorGroupHos = e => {
    e.preventDefault();
    this.setState({
      showEditorGroupHos: true,
    });
  };

  render() {
    const {
      groupName,
      groupList,
      currentPage,
      totalElements,
      allGroupName,
      allHosName,
    } = this.props;
    const { showEditor, selectedData, editorBarShow, showEditorGroupHos } = this.state;
    return (
      <div>
        <SearchBar
          inputValue={groupName}
          inputPlaceholder="输入小组名称进行检索"
          onInputChange={this.handleParamChange}
          onSearchClick={this.handleSearch}
          onRefreshClick={this.handleRefresh}
          onNewClick={this.handleNew}
          onExportClick={this.handleExport}
          onEditorGroupHosClick={this.handlEditorGroupHos}
          editorBarShow={editorBarShow}
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
        <GroupHosEditor
          allGroupName={allGroupName}
          allHosName={allHosName}
          visible={showEditorGroupHos}
          onClose={() => this.setState({ showEditorGroupHos: false })}
        />
      </div>
    );
  }
}

export default GroupContainer;
