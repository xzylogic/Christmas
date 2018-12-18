import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import AppointmentsBar from './AppointmentsBar';
import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  appointmentList: state.businessYilianWechatQuery.list.appointment,
  currentPage: state.businessYilianWechatQuery.currentPage.appointment,
  totalElements: state.businessYilianWechatQuery.totalElements.appointment,
  searchParam: state.businessYilianWechatQuery.searchParam.appointment,
  loading: state.loading.effects['businessYilianWechatQuery/fetchAppointmentPerformance'],
});

const mapDispatchToProps = dispatch => ({
  onFetchAppointmentList: page =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchAppointmentPerformance',
      payload: { page },
    }),
  onFetchAppointmentListDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatQuery/fetchAppointmentPerformance',
        payload: { page },
      }),
    500
  ),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatQuery/updateSearchParam',
      payload: { origin: 'appointment', key, value },
    }),
  onDownloadAppointmentList: page =>
    dispatch({
      type: 'businessYilianWechatQuery/downloadAppointmentList',
      payload: { page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppointmentsContainer extends Component {
  componentDidMount() {
    const { onFetchAppointmentList } = this.props;
    onFetchAppointmentList(0);
  }

  handleParamsChanged = async (value, dataKey) => {
    const { onSearchParamChange, onFetchAppointmentListDebounce } = this.props;
    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchAppointmentListDebounce(0);
  };

  setTableColumns = () => {
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

    const columns = [
      {
        title: '预约日期',
        dataIndex: 'createTime',
        key: 'schedule_date',
      },
      {
        title: '就诊日期',
        dataIndex: 'scheduleDate',
        key: 'scheduleDate',
      },
      {
        title: '就诊时段',
        dataIndex: 'scheduleTime',
        key: 'scheduleTime',
      },
      {
        title: '预约科室',
        dataIndex: 'deptName',
        key: 'deptName',
      },
      {
        title: '预约医院',
        dataIndex: 'hosOrgName',
        key: 'hosOrgName',
      },
      {
        title: '预约医生',
        dataIndex: 'doctName',
        key: 'doctName',
      },
      {
        title: '预约来源',
        dataIndex: 'regChannel',
        key: 'regChannel',
      },
      {
        title: '患者姓名',
        dataIndex: 'patientName',
        key: 'patientName',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '患者卡号',
        dataIndex: 'mediCardId',
        key: 'mediCardId',
      },
      {
        title: '卡类型',
        dataIndex: 'mediCardIdType',
        key: 'mediCardIdType',
      },
      {
        title: '手机',
        dataIndex: 'patientPhone',
        key: 'patientPhone',
      },
      {
        title: '身份证号',
        dataIndex: 'patientCardId',
        key: 'patientCardId',
      },
      {
        title: '订单号',
        dataIndex: 'orderId',
        key: 'orderId',
      },
      {
        title: '预约编号',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
      },
      {
        title: '预约状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: record => renderOrderStatus(record),
      },
      {
        title: '取消原因',
        dataIndex: 'cancelReason',
        key: 'cancelReason',
      },
    ];
    return columns;
  };

  handlePageChange = page => {
    const { onFetchAppointmentList } = this.props;
    onFetchAppointmentList(page - 1);
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchAppointmentList } = this.props;
    onFetchAppointmentList(0);
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchAppointmentList } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onSearchParamChange('orderStatus', '');
    await onSearchParamChange('regChannel', '');
    await onSearchParamChange('patientName', '');
    await onSearchParamChange('patientPhone', '');
    await onSearchParamChange('mediCardId', '');
    await onSearchParamChange('patientCardId', '');
    await onSearchParamChange('hosDocCode', '');
    await onSearchParamChange('isExport', false);
    await onFetchAppointmentList(0);
  };

  handleExport = async e => {
    e.preventDefault();
    const { onDownloadAppointmentList, onSearchParamChange, currentPage } = this.props;
    onSearchParamChange('isExport', true);
    onDownloadAppointmentList(currentPage).then(data => {
      if (data) {
        const a = document.createElement('a');
        a.setAttribute('href', data);
        a.click();
      }
    });
    onSearchParamChange('isExport', false);
  };

  render() {
    const { searchParam, appointmentList, currentPage, totalElements } = this.props;

    return (
      <React.Fragment>
        <AppointmentsBar
          params={searchParam}
          onSearch={this.handleSearch}
          onReset={this.handleReset}
          onExport={this.handleExport}
          onParamsChange={this.handleParamsChanged}
        />
        <TableList
          rowKey={(_, index) => index}
          list={appointmentList}
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
