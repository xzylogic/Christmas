import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import QuerySearchBar from '../../QueryComponent/QuerySearchBar';
import TableList from '@/components/PageComponents/Table/TableList';
import MemberDetail from './MemberDetail';
import MemberSetMounthAmount from './MemberSetMounthAmount';

const mapStateToProps = state => ({
  memberList: state.businessYilianWechatQuery.list.member,
  currentPage: state.businessYilianWechatQuery.currentPage.member,
  totalElements: state.businessYilianWechatQuery.totalElements.member,
  searchParam: state.businessYilianWechatQuery.searchParam.member,
  loading:
    state.loading.effects[
      ('businessYilianWechatQuery/fetchMemberPerformance',
      'businessYilianWechatQuery/getQueryMessage')
    ],
});

const mapDispatchToProps = dispatch => ({
  onFetchMemberList: page =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchMemberPerformance',
      payload: { page },
    }),
  onFetchMemberListDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatQuery/fetchMemberPerformance',
        payload: { page },
      }),
    500
  ),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatQuery/updateSearchParam',
      payload: { origin: 'member', key, value },
    }),
  onFetchMemberMonth: value =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchMemberMonth',
      payload: { value },
    }),
  onGetQueryMessage: value =>
    dispatch({
      type: 'businessYilianWechatQuery/getQueryMessage',
      payload: { value },
    }),
  onDownloadMemberList: page =>
    dispatch({
      type: 'businessYilianWechatQuery/downloadMemberPerformance',
      payload: { page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class MemberContainer extends Component {
  state = {
    showDetail: false,
    selectedName: '',
    amountSetShow: true,
    visible: false,
  };

  componentDidMount() {
    const { onFetchMemberList, onGetQueryMessage } = this.props;
    onFetchMemberList(0);
    onGetQueryMessage(0);
  }

  handleParamsChanged = async (value, dataKey) => {
    const { onSearchParamChange, onFetchMemberListDebounce } = this.props;
    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchMemberListDebounce(0);
  };

  handleDetail = (e, record) => {
    e.preventDefault();
    this.setState({
      showDetail: true,
      selectedName: record.hosName,
    });
    const { onFetchMemberMonth } = this.props;
    onFetchMemberMonth(record.hosName);
  };

  setTableColumns = () => {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'hosName',
        key: 'hosName',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '工号',
        dataIndex: 'jobNumber',
        key: 'jobNumber',
      },
      {
        title: '所在组',
        dataIndex: 'groupName',
        key: 'group',
      },
      {
        title: '推广地点',
        dataIndex: 'site',
        key: 'site',
      },
      {
        title: '渠道',
        dataIndex: 'promoCode',
        key: 'promoCode',
        render: () => '微信',
      },
      {
        title: '关注量',
        dataIndex: 'fansCount',
        key: 'fansCount',
      },
      {
        title: '注册量',
        dataIndex: 'regCount',
        key: 'regCount',
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        render: (_, record) => (
          <span>
            <a onClick={e => this.handleDetail(e, record)}>查看详情</a>
          </span>
        ),
      },
    ];
    return columns;
  };

  handlePageChange = page => {
    const { onFetchMemberList } = this.props;
    onFetchMemberList(page - 1);
  };

  handleAmountSet = e => {
    e.preventDefault();
    this.setState({ visible: true });
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchMemberList } = this.props;
    onFetchMemberList(0);
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchMemberList } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onSearchParamChange('name', '');
    await onFetchMemberList(0);
  };

  handleExport = e => {
    e.preventDefault();

    const { onDownloadMemberList, onSearchParamChange, currentPage } = this.props;

    onSearchParamChange('isExport', true);
    onDownloadMemberList(currentPage).then(data => {
      if (data) {
        const a = document.createElement('a');
        a.setAttribute('href', data);
        a.setAttribute('target', '_blank');
        a.click();
      }
    });
    onSearchParamChange('isExport', false);
  };

  handleDetailClose = e => {
    e.preventDefault();
    this.setState({
      showDetail: false,
    });
  };

  render() {
    const { searchParam, memberList, currentPage, totalElements } = this.props;
    // const { showDetail, selectedName, amountSetShow, visible } = this.state;
    const { amountSetShow, visible, selectedName, showDetail } = this.state;
    return (
      <React.Fragment>
        <QuerySearchBar
          params={searchParam}
          onAmountSet={this.handleAmountSet}
          onSearch={this.handleSearch}
          onReset={this.handleReset}
          onExport={this.handleExport}
          onParamsChange={this.handleParamsChanged}
          inputPlaceholder="请输入姓名"
          amountSetShow={amountSetShow}
        />
        <TableList
          rowKey="hosName"
          list={memberList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
        <MemberDetail name={selectedName} visible={showDetail} onClose={this.handleDetailClose} />
        <MemberSetMounthAmount
          visible={visible}
          onClose={() => this.setState({ visible: false })}
        />
      </React.Fragment>
    );
  }
}

export default MemberContainer;
