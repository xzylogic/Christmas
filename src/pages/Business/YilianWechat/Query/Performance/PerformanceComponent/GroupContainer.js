import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import QuerySearchBar from '../../QueryComponent/QuerySearchBar';
import TableList from '@/components/PageComponents/Table/TableList';
import GroupDetail from './GroupDetail';
import GroupSetMounthAmount from './GroupSetMounthAmount';

const mapStateToProps = state => ({
  groupList: state.businessYilianWechatQuery.list.group,
  currentPage: state.businessYilianWechatQuery.currentPage.group,
  totalElements: state.businessYilianWechatQuery.totalElements.group,
  searchParam: state.businessYilianWechatQuery.searchParam.group,
  loading:
    state.loading.effects[
      ('businessYilianWechatQuery/fetchGroupPerformance',
      'businessYilianWechatQuery/getQueryMessage')
    ],
});

const mapDispatchToProps = dispatch => ({
  onFetchGroupList: page =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchGroupPerformance',
      payload: { page },
    }),
  onFetchGroupListDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatQuery/fetchGroupPerformance',
        payload: { page },
      }),
    500
  ),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatQuery/updateSearchParam',
      payload: { origin: 'group', key, value },
    }),
  onFetchGroupMonth: value =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchGroupMonth',
      payload: { value },
    }),
  onGetQueryMessage: value =>
    dispatch({
      type: 'businessYilianWechatQuery/getQueryMessage',
      payload: { value },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class GroupContainer extends Component {
  state = {
    showDetail: false,
    selectedName: '',
    amountSetShow: true,
    visible: false,
  };

  componentDidMount() {
    const { onGetQueryMessage } = this.props;
    onGetQueryMessage(0);
  }

  handleParamsChanged = async (value, dataKey) => {
    const { onSearchParamChange, onFetchGroupListDebounce } = this.props;
    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchGroupListDebounce(0);
  };

  handleDetail = (e, record) => {
    e.preventDefault();
    this.setState({
      showDetail: true,
      selectedName: record.name,
    });
    const { onFetchGroupMonth } = this.props;
    onFetchGroupMonth(record.name);
  };

  setTableColumns = () => {
    const columns = [
      {
        title: '组名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '人数',
        dataIndex: 'counts',
        key: 'counts',
      },
      {
        title: '渠道',
        dataIndex: 'origin',
        key: 'origin',
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
    const { onFetchGroupList } = this.props;
    onFetchGroupList(page - 1);
  };

  handleAmountSet = e => {
    e.preventDefault();
    this.setState({ visible: true });
    // console.log('amountset');
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchGroupList } = this.props;
    onFetchGroupList(0);
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchGroupList } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onSearchParamChange('name', '');
    await onFetchGroupList(0);
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
  };

  handleDetailClose = e => {
    e.preventDefault();
    this.setState({
      showDetail: false,
    });
  };

  render() {
    const { searchParam, groupList, currentPage, totalElements } = this.props;
    const { showDetail, selectedName, amountSetShow, visible } = this.state;
    return (
      <React.Fragment>
        <QuerySearchBar
          params={searchParam}
          onAmountSet={this.handleAmountSet}
          onSearch={this.handleSearch}
          onReset={this.handleReset}
          onExport={this.handleExport}
          onParamsChange={this.handleParamsChanged}
          inputPlaceholder="请输入项目"
          amountSetShow={amountSetShow}
        />
        <TableList
          rowKey="name"
          list={groupList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
        <GroupDetail name={selectedName} visible={showDetail} onClose={this.handleDetailClose} />
        <GroupSetMounthAmount visible={visible} onClose={() => this.setState({ visible: false })} />
      </React.Fragment>
    );
  }
}

export default GroupContainer;
