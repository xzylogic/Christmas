import React, { Component } from 'react';
import { connect } from 'dva';
import debounce from 'lodash.debounce';
import { Radio } from 'antd';
import moment from 'moment';

import SearchBar from './Type2SearchBar';
import ReportChart from './Type2Chart';
import ReportList from './Type2List';
import { POPULARIZATION_REPORT_TYPE } from '@/models/business/yilian-wechat/statistics/statistics';

import classes from '../PopularizationReport.less';

const mapStateToProps = state => ({
  searchParam:
    state.businessYilianWechatStatistics.searchParams.popularization[
      POPULARIZATION_REPORT_TYPE.TYPE2
    ],
  searchGroupList: state.businessYilianWechatStatistics.searchGroupList,
  reportList:
    state.businessYilianWechatStatistics.list.popularization[POPULARIZATION_REPORT_TYPE.TYPE2],
  currentPage:
    state.businessYilianWechatStatistics.currentPage.popularization[
      POPULARIZATION_REPORT_TYPE.TYPE2
    ],
  totalElements:
    state.businessYilianWechatStatistics.totalElements.popularization[
      POPULARIZATION_REPORT_TYPE.TYPE2
    ],
  reportChart:
    state.businessYilianWechatStatistics.chart.popularization[POPULARIZATION_REPORT_TYPE.TYPE2],
  reportDownload:
    state.businessYilianWechatStatistics.download.popularization[POPULARIZATION_REPORT_TYPE.TYPE2],
});

const mapDispatchToProps = dispatch => ({
  onFetchPopularizationReport: page =>
    dispatch({
      type: 'businessYilianWechatStatistics/fetchPopularizationReportType2',
      payload: { page },
    }),
  onFetchPopularizationReportDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatStatistics/fetchPopularizationReportType2',
        payload: { page },
      }),
    500
  ),
  onFetchPopularizationChart: () =>
    dispatch({
      type: 'businessYilianWechatStatistics/fetchPopularizationChartType2',
    }),
  onFetchPopularizationChartDebounce: debounce(
    () =>
      dispatch({
        type: 'businessYilianWechatStatistics/fetchPopularizationChartType2',
      }),
    500
  ),
  onUpdateSearchParams: (key, value) =>
    dispatch({
      type: 'businessYilianWechatStatistics/updateSearchParams',
      payload: {
        pageKey: 'popularization',
        typeKey: POPULARIZATION_REPORT_TYPE.TYPE2,
        key,
        value,
      },
    }),
  onDownloadPopularizationReport: page =>
    dispatch({
      type: 'businessYilianWechatStatistics/downloadPopularizationReportType2',
      payload: { page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Type2Container extends Component {
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
    await onFetchPopularizationReportDebounce(0);
    await onFetchPopularizationChartDebounce();
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
    await onUpdateSearchParams('isExport', false);
    await onFetchPopularizationReport(0);
    await onFetchPopularizationChart();
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
    const { onDownloadPopularizationReport, onUpdateSearchParams, reportDownload } = this.props;
    onUpdateSearchParams('isExport', true);
    onDownloadPopularizationReport();
    onUpdateSearchParams('isExport', false);

    console.log(reportDownload);
    // const a = document.createElement('a');
    //   a.setAttribute('download', '推广数据报表2.xls');
    //   a.setAttribute('href', {download});
    //   a.click();
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
            <ReportChart data={reportChart} />
          ) : (
            <ReportList
              data={reportList}
              currentPage={currentPage}
              totalElements={totalElements}
              onPageChange={this.handlePageChanged}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Type2Container;
