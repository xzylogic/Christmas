import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Popconfirm } from 'antd';
import debounce from 'lodash.debounce';

import SearchBar from './SearchBar';
import TableList from './TableList';
import MemberEditor from './MemberEditor';

const mapStateToProps = state => ({
  memberName: state.businessYilianWechatManagement.searchParam.memberName,
  memberList: state.businessYilianWechatManagement.list.member,
  currentPage: state.businessYilianWechatManagement.currentPage.member,
  totalElements: state.businessYilianWechatManagement.totalElements.member,
  loading:
    state.loading.effects[
      ('businessYilianWechatManagement/fetchMemberList',
      'businessYilianWechatManagement/getMemberMessage')
    ],
});

const mapDispatchProps = dispatch => ({
  onFetchMemberList: page =>
    dispatch({
      type: 'businessYilianWechatManagement/fetchMemberList',
      payload: { page },
    }),
  onSearchMemberList: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatManagement/fetchMemberList',
        payload: { page },
      }),
    500
  ),
  onUpdataSearchParam: (key, value) =>
    dispatch({
      type: 'businessYilianWechatManagement/updateSearchParam',
      payload: { key, value },
    }),
  onDeleteMember: id =>
    dispatch({
      type: 'businessYilianWechatManagement/deleteMember',
      payload: { id },
    }),

  onGetMemberMessage: value =>
    dispatch({
      type: 'businessYilianWechatManagement/getMemberMessage',
      payload: { value },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchProps
)
class MemberContainer extends Component {
  state = {
    param: '',
    showEditor: false,
    showAdd: false,
    selectedData: null,
    promoCodeArr: [],
  };

  componentDidMount() {
    const { memberList, onFetchMemberList, onGetMemberMessage } = this.props;
    if (!memberList) {
      onFetchMemberList(0);
    }
    onGetMemberMessage(0);
  }

  handleEditor = (e, record) => {
    e.preventDefault();
    this.setState({
      showEditor: true,
      showAdd: false,
      selectedData: record,
    });
  };

  handleShowWechatCode = e => {
    e.preventDefault();
    console.log('wechatCode');
  };

  handleDelete = (e, record) => {
    e.preventDefault();
    const { onDeleteMember } = this.props;
    onDeleteMember(record.id);
  };

  handlePageChange = page => {
    const { onFetchMemberList } = this.props;
    onFetchMemberList(page - 1);
  };

  setTableColumns = () => {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '工号',
        dataIndex: 'jobNumber',
        key: 'jobNumber',
      },
      {
        title: '所在组',
        dataIndex: 'groupName',
        key: 'groupName',
      },
      {
        title: '推广地点',
        dataIndex: 'site',
        key: 'site',
      },
      {
        title: '推广码',
        dataIndex: 'promoCode',
        key: 'promoCode',
        render: (text, record) => <span>{record.promoCode}</span>,
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
    this.setState({
      param: e.target.value,
    });
    const { onUpdataSearchParam, onSearchMemberList } = this.props;
    await onUpdataSearchParam('memberName', e.target.value);
    await onSearchMemberList(0);
  };

  // handleSearch = e => {
  //   e.preventDefault();
  //   console.log('search');
  // };

  handleRefresh = e => {
    e.preventDefault();
    const { onFetchMemberList } = this.props;
    onFetchMemberList(0);
  };

  handleNew = e => {
    e.preventDefault();
    this.setState({
      showEditor: true,
      showAdd: true,
      selectedData: null,
    });
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
  };

  render() {
    const { memberList, currentPage, totalElements } = this.props;
    const { param, showEditor, showAdd, selectedData, promoCodeArr } = this.state;
    return (
      <div>
        <SearchBar
          inputValue={param}
          inputPlaceholder="请输入姓名"
          onInputChange={this.handleParamChange}
          // onSearchClick={this.handleSearch}
          onRefreshClick={this.handleRefresh}
          onNewClick={this.handleNew}
          onExportClick={this.handleExport}
        />
        <Divider />
        <TableList
          rowKey="id"
          list={memberList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
        <MemberEditor
          visible={showEditor}
          showAdd={showAdd}
          initialValue={selectedData}
          promoCodeArr={promoCodeArr}
          onClose={() => this.setState({ showEditor: false })}
        />
      </div>
    );
  }
}

export default MemberContainer;
