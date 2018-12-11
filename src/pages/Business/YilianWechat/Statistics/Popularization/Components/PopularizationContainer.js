import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import PopularizationBar from './PopularizationBar';
import PopularizationDetail from './PopularizationDetail';
import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  promoteAttentionList: state.businessYilianWechatStatisticDatas.list.promoteAttention,
  currentPage: state.businessYilianWechatStatisticDatas.currentPage.promoteAttention,
  totalElements: state.businessYilianWechatStatisticDatas.totalElements.promoteAttention,
  searchParam: state.businessYilianWechatStatisticDatas.searchParam.promoteAttention,
  allHosName: state.businessYilianWechatStatisticDatas.list.allHosName,
  allGroupName: state.businessYilianWechatStatisticDatas.list.allGroupName,
  loading: state.loading.effects['businessYilianWechatStatisticDatas/fetchPromoteAttentionAmount'],
});

const mapDispatchToProps = dispatch => ({
  onFetchWeChatAttentionAmount: page =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchPromoteAttentionAmount',
      payload: { page },
    }),
  onFetchWeChatAttentionAmountDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatStatisticDatas/fetchPromoteAttentionAmount',
        payload: { page },
      }),
    500
  ),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/updateSearchParam',
      payload: { origin: 'promoteAttention', key, value },
    }),
  onFetchAllHosName: () =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchAllHosName',
    }),
  onFetchAllGroupName: () =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchAllGroupName',
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppointmentsContainer extends Component {
  state = {
    // allHosNameArr: false,
    //   // way: 'week',
    selectedName: '',
    showDetail: false,
  };

  componentDidMount() {
    const { onFetchWeChatAttentionAmount, onFetchAllHosName, onFetchAllGroupName } = this.props;
    // const { way } = this.state;
    // onFetchWeChatAttentionAmount(way, 0);
    onFetchWeChatAttentionAmount(0);
    onFetchAllHosName();
    onFetchAllGroupName();
  }

  // componentDidUpdate(prevProps) {
  //   // const { onFetchWeChatAttentionAmount, name } = this.props;
  //   // const { way } = this.state;
  //   // if (name && prevProps.name !== name) {
  //   //   onFetchLocationPerformanceDetail(way, name, 0);
  //   // }

  //   const { onFetchWeChatAttentionAmount } = this.props;
  //   const { way } = this.state;
  //   // if (name && prevProps.name !== name) {
  //     onFetchWeChatAttentionAmount(way, 0);
  //   // }
  // };

  handleParamsChanged = async (value, dataKey) => {
    // console.log(value);
    const { onSearchParamChange, onFetchWeChatAttentionAmountDebounce } = this.props;
    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchWeChatAttentionAmountDebounce(0);
  };

  setTableColumns = () => {
    const columns = [
      // {
      //   title: '日期/周期/月份/年份',
      //   dataIndex: 'week' || 'date' || 'months' || 'years',
      //   key: 'week' || 'date' || 'months' || 'years',
      // },
      //   {
      //     title: '预约状态',
      //     dataIndex: 'order_status',
      //     key: 'order_status',
      //     render: record => renderOrderStatus(record),
      //   },
      {
        title: '医院名称',
        dataIndex: 'hosName',
        key: 'hosName',
      },
      {
        title: '渠道',
        dataIndex: 'promoCode',
        key: 'promoCode',
      },
      {
        title: '注册量',
        dataIndex: 'regCount',
        key: 'regCount',
      },
      {
        title: '实名量',
        dataIndex: 'realCount',
        key: 'realCount',
      },
      {
        title: '关注量',
        dataIndex: 'fansCount',
        key: 'fansCount',
      },
      {
        title: '明细',
        dataIndex: 'id',
        key: 'action',
        render: (_, record) => (
          <span>
            <a onClick={e => this.handleDetail(e, record)}>查看</a>
          </span>
        ),
      },
      // {
      //   title: '组别',
      //   dataIndex: 'weeks',
      //   key: 'weeks',
      // },
    ];
    return columns;
  };

  handlePageChange = page => {
    const { onFetchWeChatAttentionAmount } = this.props;
    // const { way } = this.state;
    // console.log(page);
    // onFetchWeChatAttentionAmount(way, page - 1);
    onFetchWeChatAttentionAmount(page - 1);
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchWeChatAttentionAmount } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    // await onSearchParamChange('name', '');
    await onFetchWeChatAttentionAmount(0);
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
  };

  handleDetail = (e, record) => {
    e.preventDefault();
    this.setState({
      showDetail: true,
      selectedName: record.hosName,
    });
  };

  handleDetailClose = e => {
    e.preventDefault();
    this.setState({
      showDetail: false,
    });
  };

  handleChangeWay = value => {
    // this.setState({
    //   way:value,
    // })
    console.log(value);
  };

  render() {
    const {
      searchParam,
      promoteAttentionList,
      currentPage,
      totalElements,
      allHosName,
      allGroupName,
    } = this.props;
    const { showDetail, selectedName } = this.state;
    // console.log(allHosNameArr)
    // const { way } = this.state;
    return (
      <React.Fragment>
        <PopularizationBar
          // way={way}
          allHosName={allHosName}
          allGroupName={allGroupName}
          params={searchParam}
          onReset={this.handleReset}
          onExport={this.handleExport}
          onChangeWay={this.handleChangeWay}
          onParamsChange={this.handleParamsChanged}
        />
        <TableList
          rowKey="aaa"
          list={promoteAttentionList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
        <PopularizationDetail
          name={selectedName}
          visible={showDetail}
          onClose={this.handleDetailClose}
        />
      </React.Fragment>
    );
  }
}

export default AppointmentsContainer;
