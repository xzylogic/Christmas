import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import AppointmentsBar from './AppointmentsBar';
// import PopularizationDetail from './PopularizationDetail';
import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  appointmentAttentionList: state.businessYilianWechatStatisticDatas.list.appointmentAttention,
  currentPage: state.businessYilianWechatStatisticDatas.currentPage.appointmentAttention,
  totalElements: state.businessYilianWechatStatisticDatas.totalElements.appointmentAttention,
  searchParam: state.businessYilianWechatStatisticDatas.searchParam.appointmentAttention,
  allHosName: state.businessYilianWechatStatisticDatas.list.allHosName,
  loading: state.loading.effects['businessYilianWechatStatisticDatas/fetchAppointmentsData'],
});

const mapDispatchToProps = dispatch => ({
  onFetchAppointmentsData: page =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchAppointmentsData',
      payload: { page },
    }),
  onFetchAppointmentsDataDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatStatisticDatas/fetchAppointmentsData',
        payload: { page },
      }),
    500
  ),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/updateSearchParam',
      payload: { origin: 'appointmentAttention', key, value },
    }),
  onFetchAllHosName: () =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchAllHosName',
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
    // showDetail: false,
  };

  componentDidMount() {
    const { onFetchAppointmentsData, onFetchAllHosName } = this.props;
    // const { way } = this.state;
    // onFetchAppointmentsData(way, 0);
    onFetchAppointmentsData(0);
    onFetchAllHosName();
  }

  // componentDidUpdate(prevProps) {
  //   // const { onFetchAppointmentsData, name } = this.props;
  //   // const { way } = this.state;
  //   // if (name && prevProps.name !== name) {
  //   //   onFetchLocationPerformanceDetail(way, name, 0);
  //   // }

  //   const { onFetchAppointmentsData } = this.props;
  //   const { way } = this.state;
  //   // if (name && prevProps.name !== name) {
  //     onFetchAppointmentsData(way, 0);
  //   // }
  // };

  handleParamsChanged = async (value, dataKey) => {
    // console.log(value);
    const { onSearchParamChange, onFetchAppointmentsDataDebounce } = this.props;
    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchAppointmentsDataDebounce(0);
  };

  setTableColumns = () => {
    const columns = [
      {
        title: '日期/周期/月份/年份',
        dataIndex: 'weeks' || 'date' || 'months' || 'years',
        key: 'weeks' || 'date' || 'months' || 'years',
      },
      // {
      //   title: '医院类型',
      //   dataIndex: 'order_status',
      //   key: 'order_status',
      //   render: record => renderOrderStatus(record),
      // },
      {
        title: '医院名称',
        dataIndex: 'hosName',
        key: 'hosName',
      },
      {
        title: '门诊类型',
        dataIndex: 'promoCode',
        key: 'promoCode',
      },
      {
        title: '订单状态',
        dataIndex: 'regCount',
        key: 'regCount',
      },
      {
        title: '预约渠道',
        dataIndex: 'realCount',
        key: 'realCount',
      },
      {
        title: '预约量',
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
    ];
    return columns;
  };

  handlePageChange = page => {
    const { onFetchAppointmentsData } = this.props;
    // const { way } = this.state;
    // console.log(page);
    // onFetchAppointmentsData(way, page - 1);
    onFetchAppointmentsData(page - 1);
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchAppointmentsData } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    // await onSearchParamChange('name', '');
    await onFetchAppointmentsData(0);
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
  };

  handleDetail = (e, record) => {
    e.preventDefault();
    console.log(record);
    // this.setState({
    //   showDetail: true,
    //   selectedName: record.hosName,
    // });
  };

  handleDetailClose = e => {
    e.preventDefault();
    // this.setState({
    //   showDetail: false,
    // });
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
      appointmentAttentionList,
      currentPage,
      totalElements,
      allHosName,
    } = this.props;
    // const { showDetail, selectedName } = this.state;
    const { selectedName } = this.state;
    // console.log(searchParam.orderStatus==='0')
    // const { way } = this.state;
    return (
      <React.Fragment>
        <AppointmentsBar
          // way={way}
          allHosName={allHosName}
          params={searchParam}
          onReset={this.handleReset}
          onExport={this.handleExport}
          onChangeWay={this.handleChangeWay}
          onParamsChange={this.handleParamsChanged}
        />
        <TableList
          rowKey="aaa"
          list={appointmentAttentionList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
          name={selectedName}
        />
        {/* <PopularizationDetail
          name={selectedName}
          visible={showDetail}
          onClose={this.handleDetailClose}
        /> */}
      </React.Fragment>
    );
  }
}

export default AppointmentsContainer;
