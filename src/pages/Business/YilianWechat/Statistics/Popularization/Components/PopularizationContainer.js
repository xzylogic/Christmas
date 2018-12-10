import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import PopularizationBar from './PopularizationBar';
import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  promoteAttentionList: state.businessYilianWechatStatisticDatas.list.promoteAttention,
  currentPage: state.businessYilianWechatStatisticDatas.currentPage.promoteAttention,
  totalElements: state.businessYilianWechatStatisticDatas.totalElements.promoteAttention,
  searchParam: state.businessYilianWechatStatisticDatas.searchParam.promoteAttention,
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
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppointmentsContainer extends Component {
  // state = {
  //   // way: 'week',
  //   // showDetail: false,
  // };

  componentDidMount() {
    const { onFetchWeChatAttentionAmount } = this.props;
    // const { way } = this.state;
    // onFetchWeChatAttentionAmount(way, 0);
    onFetchWeChatAttentionAmount(0);
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
    // const renderOrderStatus = record => {
    //   let content = '';
    //   if (record === '1') {
    //     content = <span>无效</span>;
    //   }
    //   if (record === '2') {
    //     content = <span>预约</span>;
    //   }
    //   if (record === '3') {
    //     content = <span>撤销</span>;
    //   }
    //   return content;
    // };

    const columns = [
      {
        title: '日期/周期/月份/年份',
        dataIndex: 'weeks',
        key: 'weeks',
      },
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
        render: (text, record) => (
          <span>
            <a onClick={e => this.handleShowDetail(e, record)}>查看</a>
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

  handleShowDetail = e => {
    e.preventDefault();
    // this.setState({
    //   showDetail: true,
    // });
  };

  handleChangeWay = value => {
    // this.setState({
    //   way:value,
    // })
    console.log(value);
  };

  render() {
    const { searchParam, promoteAttentionList, currentPage, totalElements } = this.props;
    // const { way } = this.state;
    return (
      <React.Fragment>
        <PopularizationBar
          // way={way}
          params={searchParam}
          // onReset={this.handleReset}
          onExport={this.handleExport}
          // onChangeWay={this.handleChangeWay}
          // onParamsChange={this.handleParamsChanged}
        />
        <TableList
          rowKey="aaa"
          list={promoteAttentionList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default AppointmentsContainer;
