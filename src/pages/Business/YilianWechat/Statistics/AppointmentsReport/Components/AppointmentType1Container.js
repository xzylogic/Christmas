import React, { Component } from 'react';
import { connect } from 'dva';
import debounce from 'lodash.debounce';
import { Radio } from 'antd';
import moment from 'moment';

import AppointmentType1SearchBar from './AppointmentType1SearchBar';
import AppointmentType1Chart from './AppointmentType1Chart';
import AppointmentType1List from './AppointmentType1List';
import { APPOINTMENTS_REPORT_TYPE } from '@/models/business/yilian-wechat/statistics/statisticsappointment';

import classes from '../AppointmentsReport.less';

const mapStateToProps = state => ({
  searchParams:
    state.businessYilianWechatStatisticsAppointment.searchParams.appointments[
      APPOINTMENTS_REPORT_TYPE.TYPE1
    ],
  searchGroupList: state.businessYilianWechatStatisticsAppointment.searchGroupList,
  reportList:
    state.businessYilianWechatStatisticsAppointment.list.appointments[
      APPOINTMENTS_REPORT_TYPE.TYPE1
    ],
  currentPage:
    state.businessYilianWechatStatisticsAppointment.currentPage.appointments[
      APPOINTMENTS_REPORT_TYPE.TYPE1
    ],
  totalElements:
    state.businessYilianWechatStatisticsAppointment.totalElements.appointments[
      APPOINTMENTS_REPORT_TYPE.TYPE1
    ],
  reportChart:
    state.businessYilianWechatStatisticsAppointment.chart.appointments[
      APPOINTMENTS_REPORT_TYPE.TYPE1
    ],
});

const mapDispatchToProps = dispatch => ({
  onFetchAppointmentReport: page =>
    dispatch({
      type: 'businessYilianWechatStatisticsAppointment/fetchAppointmentReportType1',
      payload: { page },
    }),
  onFetchAppointmentReportDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatStatisticsAppointment/fetchAppointmentReportType1',
        payload: { page },
      }),
    500
  ),
  onFetchAppointmentChart: () =>
    dispatch({
      type: 'businessYilianWechatStatisticsAppointment/fetchAppointmentChartType1',
    }),
  onFetchAppointmentChartDebounce: debounce(
    () =>
      dispatch({
        type: 'businessYilianWechatStatisticsAppointment/fetchAppointmentChartType1',
      }),
    500
  ),
  onUpdateSearchParams: (key, value) =>
    dispatch({
      type: 'businessYilianWechatStatisticsAppointment/updateSearchParams',
      payload: {
        pageKey: 'appointments',
        typeKey: APPOINTMENTS_REPORT_TYPE.TYPE1,
        key,
        value,
      },
    }),
  onFetchSearchGroupList: () =>
    dispatch({
      type: 'businessYilianWechatStatisticsAppointment/fetchSearchGroupList',
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppointmentType1Container extends Component {
  state = {
    show: 'chart',
  };

  componentDidMount() {
    const { show } = this.state;
    const {
      reportList,
      reportChart,
      onFetchAppointmentReport,
      onFetchAppointmentChart,
      onFetchSearchGroupList,
    } = this.props;
    if (show === 'list' && !reportList) {
      onFetchAppointmentReport(0);
    } else if (show === 'chart' && !reportChart) {
      onFetchAppointmentChart();
    }
    onFetchSearchGroupList();
  }

  componentDidUpdate() {
    const { show } = this.state;
    const {
      reportList,
      reportChart,
      onFetchAppointmentReport,
      onFetchAppointmentChart,
    } = this.props;
    if (show === 'list' && !reportList) {
      onFetchAppointmentReport(0);
    } else if (show === 'chart' && !reportChart) {
      onFetchAppointmentChart();
    }
  }

  handleParamsChange = async (value, dataKey) => {
    console.log(value, dataKey);
    const {
      onUpdateSearchParams,
      onFetchAppointmentReportDebounce,
      onFetchAppointmentChartDebounce,
    } = this.props;
    if (dataKey === 'date') {
      await onUpdateSearchParams('startTime', value[0]);
      await onUpdateSearchParams('endTime', value[1]);
    } else {
      await onUpdateSearchParams(dataKey, value);
    }
    await onFetchAppointmentReportDebounce(0);
    await onFetchAppointmentChartDebounce();
  };

  handlePageChanged = page => {
    const { onFetchAppointmentReport } = this.props;
    onFetchAppointmentReport(page - 1);
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchAppointmentReport, onFetchAppointmentChart } = this.props;
    onFetchAppointmentReport(0);
    onFetchAppointmentChart(0);
  };

  handleReset = async e => {
    const { onUpdateSearchParams, onFetchAppointmentReport, onFetchAppointmentChart } = this.props;
    e.preventDefault();
    await onUpdateSearchParams(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onUpdateSearchParams('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onUpdateSearchParams('countType', 'day');
    await onUpdateSearchParams('groupName', '');
    await onFetchAppointmentReport(0);
    await onFetchAppointmentChart();
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ show: e.target.value });
    const { onUpdateSearchParams } = this.props;
    onUpdateSearchParams('show', e.target.value);
  };

  render() {
    const { show } = this.state;
    const {
      searchParams,
      searchGroupList,
      reportChart,
      reportList,
      currentPage,
      totalElements,
    } = this.props;
    return (
      <React.Fragment>
        <AppointmentType1SearchBar
          params={searchParams}
          searchGroupList={searchGroupList}
          onParamsChange={this.handleParamsChange}
          onSearch={this.handleSearch}
          onReset={this.handleReset}
          onExport={this.handleExport}
        />
        <div className={classes.Map}>
          <Radio.Group
            className={classes.Gap}
            onChange={this.handleChange}
            value={searchParams.show}
          >
            <Radio.Button value="chart">图形</Radio.Button>
            <Radio.Button value="list">列表</Radio.Button>
          </Radio.Group>
        </div>
        <div className={classes.Content}>
          {show === 'chart' ? (
            <AppointmentType1Chart data={reportChart} />
          ) : (
            <AppointmentType1List
              data={reportList}
              currentPage={currentPage}
              totalElements={totalElements}
              onPageChange={this.handlePageChanged}
              countType={searchParams.countType}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default AppointmentType1Container;
