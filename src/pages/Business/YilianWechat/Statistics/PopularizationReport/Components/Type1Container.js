import React, { Component } from 'react';
import { connect } from 'dva';
import debounce from 'lodash.debounce';
import { Radio } from 'antd';
import moment from 'moment';

import SearchBar from './Type1SearchBar';
import ReportChart from './Type1Chart';
import ReportList from './Type1List';
import { POPULARIZATION_REPORT_TYPE } from '@/models/business/yilian-wechat/statistics/statistics';

import classes from '../PopularizationReport.less';

const mapStateToProps = state => ({
  searchParam:
    state.businessYilianWechatStatistics.searchParams.popularization[
      POPULARIZATION_REPORT_TYPE.TYPE1
    ],
  searchGroupList: state.businessYilianWechatStatistics.searchGroupList,
  reportList:
    state.businessYilianWechatStatistics.list.popularization[POPULARIZATION_REPORT_TYPE.TYPE1],
  currentPage:
    state.businessYilianWechatStatistics.currentPage.popularization[
      POPULARIZATION_REPORT_TYPE.TYPE1
    ],
  totalElements:
    state.businessYilianWechatStatistics.totalElements.popularization[
      POPULARIZATION_REPORT_TYPE.TYPE1
    ],
  reportChart:
    state.businessYilianWechatStatistics.chart.popularization[POPULARIZATION_REPORT_TYPE.TYPE1],
});

const mapDispatchToProps = dispatch => ({
  onFetchPopularizationReport: page =>
    dispatch({
      type: 'businessYilianWechatStatistics/fetchPopularizationReportType1',
      payload: { page },
    }),
  onFetchPopularizationReportDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatStatistics/fetchPopularizationReportType1',
        payload: { page },
      }),
    500
  ),
  onFetchPopularizationChart: () =>
    dispatch({
      type: 'businessYilianWechatStatistics/fetchPopularizationChartType1',
    }),
  onFetchPopularizationChartDebounce: debounce(
    () =>
      dispatch({
        type: 'businessYilianWechatStatistics/fetchPopularizationChartType1',
      }),
    500
  ),
  onUpdateSearchParams: (key, value) =>
    dispatch({
      type: 'businessYilianWechatStatistics/updateSearchParams',
      payload: {
        pageKey: 'popularization',
        typeKey: POPULARIZATION_REPORT_TYPE.TYPE1,
        key,
        value,
      },
    }),
  onDownloadPopularizationReport: page =>
    dispatch({
      type: 'businessYilianWechatStatistics/downloadPopularizationReportType1',
      payload: { page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Type1Container extends Component {
  state = {
    show: 'chart',
  };

  componentDidMount() {
    const { show } = this.state;
    const {
      reportList,
      reportChart,
      onFetchPopularizationReport,
      onFetchPopularizationChart,
    } = this.props;
    if (show === 'list' && !reportList) {
      onFetchPopularizationReport(0);
    } else if (show === 'chart' && !reportChart) {
      onFetchPopularizationChart();
    }
  }

  componentDidUpdate() {
    const { show } = this.state;
    const {
      reportList,
      reportChart,
      onFetchPopularizationReport,
      onFetchPopularizationChart,
    } = this.props;
    if (show === 'list' && !reportList) {
      onFetchPopularizationReport(0);
    } else if (show === 'chart' && !reportChart) {
      onFetchPopularizationChart();
    }
  }

  handleParamsChange = async (value, dataKey) => {
    const {
      onUpdateSearchParams,
      onFetchPopularizationReportDebounce,
      onFetchPopularizationChartDebounce,
    } = this.props;
    if (dataKey === 'date') {
      await onUpdateSearchParams('startTime', value[0]);
      await onUpdateSearchParams('endTime', value[1]);
    } else {
      await onUpdateSearchParams(dataKey, value);
    }
    if (dataKey !== 'project') {
      await onFetchPopularizationReportDebounce(0);
      await onFetchPopularizationChartDebounce();
    }
  };

  handlePageChanged = page => {
    const { onFetchPopularizationReport } = this.props;
    onFetchPopularizationReport(page - 1);
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchPopularizationReport, onFetchPopularizationChart } = this.props;
    onFetchPopularizationReport(0);
    onFetchPopularizationChart(0);
    // const { onDownloadPopularizationReport, onUpdateSearchParams } = this.props;
    // onUpdateSearchParams('isExport', false);
    // onDownloadPopularizationReport(0);
  };

  handleReset = async e => {
    const {
      onUpdateSearchParams,
      onFetchPopularizationReport,
      onFetchPopularizationChart,
    } = this.props;
    e.preventDefault();
    await onUpdateSearchParams(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onUpdateSearchParams('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onUpdateSearchParams('countType', 'day');
    await onUpdateSearchParams('groupName', '1组');
    await onUpdateSearchParams('project', '');
    await onFetchPopularizationReport(0);
    await onFetchPopularizationChart();
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
    const { onDownloadPopularizationReport, onUpdateSearchParams } = this.props;
    onUpdateSearchParams('isExport', true);
    onDownloadPopularizationReport();
  };

  render() {
    const { show } = this.state;
    const {
      searchParam,
      searchGroupList,
      reportChart,
      reportList,
      currentPage,
      totalElements,
    } = this.props;
    return (
      <React.Fragment>
        <SearchBar
          params={searchParam}
          searchGroupList={searchGroupList}
          onParamsChange={this.handleParamsChange}
          onSearch={this.handleSearch}
          onReset={this.handleReset}
          onExport={this.handleExport}
        />
        <div className={classes.Map}>
          <Radio.Group
            className={classes.Gap}
            onChange={e => this.setState({ show: e.target.value })}
            defaultValue={show}
          >
            <Radio.Button value="chart">图形</Radio.Button>
            <Radio.Button value="list">列表</Radio.Button>
          </Radio.Group>
        </div>
        <div className={classes.Content}>
          {show === 'chart' ? (
            <ReportChart data={reportChart} project={searchParam.project} />
          ) : (
            <ReportList
              data={reportList}
              currentPage={currentPage}
              totalElements={totalElements}
              onPageChange={this.handlePageChanged}
              countType={searchParam.countType}
              project={searchParam.project}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Type1Container;
