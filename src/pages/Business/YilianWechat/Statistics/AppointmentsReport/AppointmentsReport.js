import React, { Component } from 'react';
import { connect } from 'dva';
import debounce from 'lodash.debounce';
import { Radio } from 'antd';
import moment from 'moment';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AppointmentsReportBar from './Components/AppointmentsReportBar';
import AppointmentsReportChart from './Components/AppointmentsReportChart';
import AppointmentsReportList from './Components/AppointmentsReportList';

import classes from './AppointmentsReport.less';

const mapStateToProps = state => ({
  appointmentReportList: state.businessYilianWechatStatisticDatas.list.appointmentReport,
  appointmentReportChart: state.businessYilianWechatStatisticDatas.chart.appointmentReport,
  currentPage: state.businessYilianWechatStatisticDatas.currentPage.appointmentReport,
  totalElements: state.businessYilianWechatStatisticDatas.totalElements.appointmentReport,
  searchParam: state.businessYilianWechatStatisticDatas.searchParam.appointmentReport,
  allGroupName: state.businessYilianWechatStatisticDatas.list.allGroupName,
});

const mapDispatchToProps = dispatch => ({
  onFetchAppointmentReport: page =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchAppointmentReport',
      payload: { page },
    }),
  onFetchAppointmentReportDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatStatisticDatas/fetchAppointmentReport',
        payload: { page },
      }),
    500
  ),
  onFetchAppointmentChart: () =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchAppointmentChart',
    }),
  onFetchAppointmentChartDebounce: debounce(
    () =>
      dispatch({
        type: 'businessYilianWechatStatisticDatas/fetchAppointmentChart',
      }),
    500
  ),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/updateSearchParam',
      payload: { origin: 'appointmentReport', key, value },
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
class AppointmentsReport extends Component {
  state = {
    show: 'chart',
  };

  componentDidMount() {
    const { show } = this.state;
    const {
      appointmentReportList,
      appointmentReportChart,
      onFetchAppointmentReport,
      onFetchAppointmentChart,
      onFetchAllGroupName,
    } = this.props;
    if (show === 'list' && !appointmentReportList) {
      onFetchAppointmentReport(0);
    } else if (show === 'chart' && !appointmentReportChart) {
      onFetchAppointmentChart();
    }
    onFetchAllGroupName();
  }

  componentDidUpdate() {
    const { show } = this.state;
    const {
      appointmentReportList,
      appointmentReportChart,
      onFetchAppointmentReport,
      onFetchAppointmentChart,
    } = this.props;

    if (show === 'list' && !appointmentReportList) {
      onFetchAppointmentReport(0);
    } else if (show === 'chart' && !appointmentReportChart) {
      onFetchAppointmentChart();
    }
  }

  handleParamsChanged = async (value, dataKey) => {
    const {
      onSearchParamChange,
      onFetchAppointmentReportDebounce,
      onFetchAppointmentChartDebounce,
    } = this.props;
    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchAppointmentReportDebounce(0);
    await onFetchAppointmentChartDebounce();
  };

  handlePageChanged = page => {
    const { onFetchAppointmentReport } = this.props;
    onFetchAppointmentReport(page - 1);
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchAppointmentReport, onFetchAppointmentChart } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onFetchAppointmentReport(0);
    await onFetchAppointmentChart();
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchAppointmentReport, onFetchAppointmentChart } = this.props;
    onFetchAppointmentReport(0);
    onFetchAppointmentChart(0);
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ show: e.target.value });
    const { onSearchParamChange } = this.props;
    onSearchParamChange('show', e.target.value);
  };

  render() {
    const { show } = this.state;
    const {
      appointmentReportList,
      appointmentReportChart,
      currentPage,
      totalElements,
      searchParam,
      allGroupName,
    } = this.props;

    return (
      <PageHeaderWrapper>
        <div className={classes.Container}>
          <AppointmentsReportBar
            params={searchParam}
            allGroupName={allGroupName}
            onSearch={this.handleSearch}
            onExport={this.handleExport}
            onReset={this.handleReset}
            onParamsChange={this.handleParamsChanged}
          />
          <div className={classes.Map}>
            <Radio.Group
              className={classes.Gap}
              onChange={this.handleChange}
              value={searchParam.show}
            >
              <Radio.Button value="chart">图形</Radio.Button>
              <Radio.Button value="list">列表</Radio.Button>
            </Radio.Group>
          </div>
          <div className={classes.Content}>
            {show === 'chart' ? (
              <AppointmentsReportChart data={appointmentReportChart} />
            ) : (
              <AppointmentsReportList
                data={appointmentReportList}
                currentPage={currentPage}
                totalElements={totalElements}
                onPageChange={this.handlePageChanged}
              />
            )}
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default AppointmentsReport;
