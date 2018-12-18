import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import AppointmentsBar from './AppointmentsBar';
import TableList from '@/components/PageComponents/Table/TableList';
import AppointmentsDetail from './AppointmentsDetail';

const mapStateToProps = state => ({
  appointmentAttentionList: state.businessYilianWechatStatisticDatas.list.appointmentAttention,
  download: state.businessYilianWechatStatisticDatas.list.appointmentDownload,
  currentPage: state.businessYilianWechatStatisticDatas.currentPage.appointmentAttention,
  totalElements: state.businessYilianWechatStatisticDatas.totalElements.appointmentAttention,
  searchParam: state.businessYilianWechatStatisticDatas.searchParam.appointmentAttention,
  allHosName: state.businessYilianWechatStatisticDatas.list.allHosName,
  typeHosName: state.businessYilianWechatStatisticDatas.list.typeHosName,
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
  onFetchHosType: page =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchHosType',
      payload: { page },
    }),
  onFetchHosTypeDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatStatisticDatas/fetchHosType',
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
  onDownloadAppointmentsData: page =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/downloadAppointmentsData',
      payload: { page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppointmentsContainer extends Component {
  state = {
    //   // way: 'week',
    selectedName: '',
    showDetail: false,
  };

  componentDidMount() {
    const { onFetchAppointmentsData, onFetchAllHosName, onFetchHosType } = this.props;
    onFetchAppointmentsData(0);
    onFetchAllHosName();
    onFetchHosType(0);
  }

  handleParamsChanged = async (value, dataKey) => {
    const {
      onSearchParamChange,
      onFetchAppointmentsDataDebounce,
      onFetchHosTypeDebounce,
    } = this.props;
    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchAppointmentsDataDebounce(0);
    await onFetchHosTypeDebounce(0);
  };

  setTableColumns = () => {
    const renderVisitLevelCode = record => {
      let content = '';
      if (record === '1') {
        content = <span>专家</span>;
      }
      if (record === '2') {
        content = <span>专病</span>;
      }
      if (record === '3') {
        content = <span>普通</span>;
      }
      return content;
    };

    const renderOrderStatus = record => {
      let content = '';
      if (record === '1') {
        content = <span>已预约</span>;
      }
      if (record === '3') {
        content = <span>已取消</span>;
      }
      return content;
    };

    const renderRegChannel = record => {
      let content = '';
      if (record === 'wechat') {
        content = <span>医联微信</span>;
      }
      if (record === 'app') {
        content = <span>医联App</span>;
      }
      return content;
    };

    const columns = [
      {
        title: '日期/周期/月份/年份',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '医院类型',
        dataIndex: 'cityName',
        key: 'cityName',
      },
      {
        title: '医院名称',
        dataIndex: 'hosName',
        key: 'hosName',
      },
      {
        title: '门诊类型',
        dataIndex: 'visitLevelCode',
        key: 'visitLevelCode',
        render: record => renderVisitLevelCode(record),
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: record => renderOrderStatus(record),
      },
      {
        title: '预约渠道',
        dataIndex: 'regChannel',
        key: 'regChannel',
        render: record => renderRegChannel(record),
      },
      {
        title: '预约量',
        dataIndex: 'reservationCount',
        key: 'reservationCount',
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
    onFetchAppointmentsData(page - 1);
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchAppointmentsData, onFetchHosType } = this.props;
    onFetchAppointmentsData(0);
    onFetchHosType(0);
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchAppointmentsData } = this.props;
    onFetchAppointmentsData(0);
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchAppointmentsData } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onSearchParamChange('countType', 'week');
    await onSearchParamChange('cityName', '');
    await onSearchParamChange('hosOrgCode', null);
    await onSearchParamChange('visitLevelCode', null);
    await onSearchParamChange('orderStatus', null);
    await onSearchParamChange('regChannel', null);
    await onSearchParamChange('type', 'day');
    await onSearchParamChange('isExport', false);
    await onFetchAppointmentsData(0);
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
    const { onDownloadAppointmentsData, onSearchParamChange, download } = this.props;
    onSearchParamChange('isExport', true);
    onDownloadAppointmentsData();
    onSearchParamChange('isExport', false);

    console.log(download);

    // const a = document.createElement('a');
    // a.setAttribute('download', '预约数据统计.xls');
    // a.setAttribute('href', { download });
    // a.click();
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

  render() {
    const {
      searchParam,
      appointmentAttentionList,
      currentPage,
      totalElements,
      allHosName,
      typeHosName,
    } = this.props;

    const { selectedName, showDetail } = this.state;

    return (
      <React.Fragment>
        <AppointmentsBar
          // way={way}
          allHosName={allHosName}
          typeHosName={typeHosName}
          params={searchParam}
          onSearch={this.handleSearch}
          onReset={this.handleReset}
          onExport={this.handleExport}
          // onChangeWay={this.handleChangeWay}
          onParamsChange={this.handleParamsChanged}
        />
        <TableList
          rowKey={(_, index) => index}
          list={appointmentAttentionList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
          name={selectedName}
        />
        <AppointmentsDetail
          name={selectedName}
          visible={showDetail}
          onClose={this.handleDetailClose}
        />
      </React.Fragment>
    );
  }
}

export default AppointmentsContainer;
