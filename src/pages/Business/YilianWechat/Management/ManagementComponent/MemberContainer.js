import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Popconfirm } from 'antd';
import debounce from 'lodash.debounce';

import SearchBar from './SearchBar';
import TableList from './TableList';
import MemberEditor from './MemberEditor';
import WechatCode from './WechatCode';

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
  onDownloadMemberList: () =>
    dispatch({
      type: 'businessYilianWechatManagement/downloadMemberList',
    }),
  // 根据小组查询医院名
  onFetchHosGroup: page =>
    dispatch({
      type: 'businessYilianWechatManagement/fetchHosGroup',
      payload: { page },
    }),
  // 根据小组查询医院名(编辑小组)
  onFetchHosGroupEditor: page =>
    dispatch({
      type: 'businessYilianWechatManagement/fetchHosGroupEditor',
      payload: { page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchProps
)
class MemberContainer extends Component {
  state = {
    showEditor: false,
    showAdd: false,
    selectedData: null,
    showCode: false,
    url: '',
  };

  componentDidMount() {
    const { memberList, onFetchMemberList, onGetMemberMessage } = this.props;
    if (!memberList) {
      onFetchMemberList(0);
    }
    onGetMemberMessage(0);
  }

  handleEditor = async (e, record) => {
    e.preventDefault();
    const { onUpdataSearchParam, onFetchHosGroupEditor } = this.props;
    this.setState({
      showEditor: true,
      showAdd: false,
      selectedData: record,
    });

    await onUpdataSearchParam('recordGroupName', record.groupId);
    await onFetchHosGroupEditor(0);
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
        // width: 90,
        // fixed: 'left',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        // width: 70,
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        // width: 115,
      },
      {
        title: '工号',
        dataIndex: 'jobNumber',
        key: 'jobNumber',
        // width: 70,
      },
      {
        title: '所在组',
        dataIndex: 'groupName',
        key: 'groupName',
        // width: 60,
      },
      {
        title: '推广地点',
        dataIndex: 'site',
        key: 'site',
      },
      {
        title: '生效时间',
        dataIndex: 'effectiveDate',
        key: 'effectiveDate',
        // width: 115,
      },
      {
        title: '推广码',
        dataIndex: 'promoCode',
        key: 'promoCode',
        render: (text, record) => (
          <span>
            {record.promoCode.indexOf('医联微信') > -1 ? (
              <span>
                <a onClick={e => this.handleShowCode(e, record)}>医联微信</a>
                <span>{record.promoCode.replace('医联微信', '')}</span>
              </span>
            ) : (
              <span>{record.promoCode}</span>
            )}
          </span>
        ),
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        // width: 90,
        render: (_, record) => (
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

  handleParamChange = async (dataKey, value) => {
    const {
      onUpdataSearchParam,
      onSearchMemberList,
      onFetchHosGroup,
      onFetchHosGroupEditor,
    } = this.props;

    if (dataKey === 'memberName') {
      await onUpdataSearchParam('memberName', value);
      await onSearchMemberList(0);
    }

    await onUpdataSearchParam(dataKey, value);
    await onFetchHosGroup(0);
    await onFetchHosGroupEditor(0);
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onSearchMemberList } = this.props;
    onSearchMemberList(0);
  };

  handleRefresh = e => {
    e.preventDefault();
    const { onFetchMemberList } = this.props;
    onFetchMemberList(0);
  };

  handleNew = e => {
    e.preventDefault();
    const { onFetchHosGroup, onFetchHosGroupEditor } = this.props;
    this.setState({
      showEditor: true,
      showAdd: true,
      selectedData: null,
    });
    onFetchHosGroup(0);
    onFetchHosGroupEditor(0);
  };

  handleExport = e => {
    e.preventDefault();
    const { onDownloadMemberList } = this.props;
    onDownloadMemberList().then(data => {
      if (data) {
        const a = document.createElement('a');
        a.setAttribute('href', data);
        // a.setAttribute('target', '_blank');
        a.click();
      }
    });
  };

  handleShowCode(e, record) {
    e.preventDefault();
    this.setState({
      showCode: true,
      url: record.url,
    });
  }

  render() {
    const { memberName, memberList, currentPage, totalElements } = this.props;
    const { showEditor, showAdd, selectedData, showCode, url } = this.state;
    return (
      <div>
        <SearchBar
          inputValue={memberName}
          inputPlaceholder="请输入姓名"
          dataKey="memberName"
          onInputChange={this.handleParamChange}
          onSearchClick={this.handleSearch}
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
          // scroll={{ x: 1150 }}
        />
        <MemberEditor
          visible={showEditor}
          showAdd={showAdd}
          initialValue={selectedData}
          onClose={() => this.setState({ showEditor: false })}
          onParamChange={this.handleParamChange}
        />
        <WechatCode
          showCode={showCode}
          imgUrl={url}
          onClose={() => this.setState({ showCode: false })}
        />
      </div>
    );
  }
}

export default MemberContainer;
