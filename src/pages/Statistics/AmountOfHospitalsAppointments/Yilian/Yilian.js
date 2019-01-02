import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Radio, Spin } from 'antd';
import moment from 'moment';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchBar from '../../ZStatisticsComponent/QuerySearchBar';
import StatisticsChart from '../../ZStatisticsComponent/StatisticsColumnChart';
import LineChart from '../../ZStatisticsComponent/StatisticsLineChart';
import { STATISTICS_TYPE, STATISTICS_ORIGIN } from '@/models/statistics/statistics';

import classes from '../../Statistics.less';

const mapStateToProps = state => ({
  searchParam:
    state.statistics.searchParams[STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_APPOINTMENTS][
      STATISTICS_ORIGIN.YILIAN
    ],
  list:
    state.statistics.list[STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_APPOINTMENTS][
      STATISTICS_ORIGIN.YILIAN
    ],
  hospitals:
    state.statistics.hospitals[STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_APPOINTMENTS][
      STATISTICS_ORIGIN.YILIAN
    ],
  loading: state.loading.effects['statistics/fetchYilianStatistics'],
  loadingDetail: state.loading.effects['statistics/fetchHospitalBookDetail'],
});

const mapDispatchToProps = dispatch => ({
  onUpdateSearchParams: (key, value) =>
    dispatch({
      type: 'statistics/updateSearchParams',
      payload: {
        type: STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_APPOINTMENTS,
        origin: STATISTICS_ORIGIN.YILIAN,
        key,
        value,
      },
    }),
  onFetchYilianStatistics: () =>
    dispatch({
      type: 'statistics/fetchYilianStatistics',
      payload: {
        type: STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_APPOINTMENTS,
        origin: STATISTICS_ORIGIN.YILIAN,
      },
    }),
  onFetchHospitalDetail: orgId =>
    dispatch({
      type: 'statistics/fetchHospitalBookDetail',
      payload: {
        orgId,
        type: STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_APPOINTMENTS,
        origin: STATISTICS_ORIGIN.YILIAN,
      },
    }),
  onFetchSearchHospitals: () =>
    dispatch({
      type: 'statistics/fetchSearchHospitals',
      payload: {
        type: STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_APPOINTMENTS,
        origin: STATISTICS_ORIGIN.YILIAN,
      },
    }),
  onExportYilianStatistics: () =>
    dispatch({
      type: 'statistics/exportYilianStatistics',
      payload: {
        type: STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_APPOINTMENTS,
        origin: STATISTICS_ORIGIN.YILIAN,
      },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Index extends Component {
  state = {
    show: 'chart',
    detailChart: null,
    chartTitle: '',
  };

  componentDidMount() {
    const { list, onFetchYilianStatistics, onFetchSearchHospitals } = this.props;
    this.setState({ detailChart: null });
    if (!list) {
      onFetchYilianStatistics(0);
    }
    onFetchSearchHospitals();
  }

  handleParamsChange = async (value, dataKey) => {
    const { onUpdateSearchParams, onFetchYilianStatistics, onFetchSearchHospitals } = this.props;

    if (dataKey === 'cityCode') {
      await onUpdateSearchParams(dataKey, value);
      await onFetchSearchHospitals();
    } else {
      await onUpdateSearchParams(dataKey, value);
    }
    this.setState({ detailChart: null });
    await onFetchYilianStatistics();
  };

  setTableColums = () => {
    const columns = [
      {
        title: '医院名称',
        dataIndex: 'orgName',
        key: 'orgName',
        sorter: (a, b) => a.orgName.toString().localeCompare(b.orgName.toString()),
      },
      {
        title: '预约总量',
        dataIndex: 'orderNum',
        key: 'orderNum',
        sorter: (a, b) => Number(a.orderNum) - Number(b.orderNum),
      },
      {
        title: '门诊类型',
        children: [
          {
            title: '专家预约量',
            dataIndex: 'specialistOrderNum',
            key: 'specialistOrderNum',
            sorter: (a, b) => Number(a.specialistOrderNum) - Number(b.specialistOrderNum),
          },
          {
            title: '专病预约量',
            dataIndex: 'diseaseOrderNum',
            key: 'diseaseOrderNum',
            sorter: (a, b) => Number(a.diseaseOrderNum) - Number(b.diseaseOrderNum),
          },
          {
            title: '普通预约量',
            dataIndex: 'commonOrderNum',
            key: 'commonOrderNum',
            sorter: (a, b) => Number(a.commonOrderNum) - Number(b.commonOrderNum),
          },
          {
            title: '特需预约量',
            dataIndex: 'specialOrderNum',
            key: 'specialOrderNum',
            sorter: (a, b) => Number(a.specialOrderNum) - Number(b.specialOrderNum),
          },
        ],
      },
      {
        title: '职称类别',
        children: [
          {
            title: '主任医师',
            dataIndex: 'highOrderNum',
            key: 'highOrderNum',
            sorter: (a, b) => Number(a.highOrderNum) - Number(b.highOrderNum),
          },
          {
            title: '副主任医师',
            dataIndex: 'subOrderNum',
            key: 'subOrderNum',
            sorter: (a, b) => Number(a.subOrderNum) - Number(b.orderNum),
          },
        ],
      },
    ];
    return columns;
  };

  handleSearch = () => {
    const { onFetchYilianStatistics } = this.props;
    this.setState({ detailChart: null });
    onFetchYilianStatistics();
  };

  handleReset = async () => {
    const { onUpdateSearchParams, onFetchYilianStatistics } = this.props;
    this.setState({ detailChart: null });
    await onUpdateSearchParams('countType', 'day');
    await onUpdateSearchParams('startDate', moment(new Date().valueOf() - 2678400000));
    await onUpdateSearchParams('endDate', moment(new Date().valueOf() - 86400000));
    await onUpdateSearchParams('cityCode', '');
    await onUpdateSearchParams('orgId', '');
    await onUpdateSearchParams('isExclusive', '');
    await onFetchYilianStatistics();
  };

  handelExport = () => {
    const { onExportYilianStatistics } = this.props;
    onExportYilianStatistics().then(data => {
      if (data) {
        const a = document.createElement('a');
        a.setAttribute('href', data);
        a.click();
      }
    });
  };

  handleChartClick = (orgId, orgName) => {
    const { onFetchHospitalDetail } = this.props;
    if (orgId) {
      onFetchHospitalDetail(orgId).then(res => {
        if (res && res.code === 200 && res.data) {
          this.setState({ detailChart: res.data, chartTitle: orgName });
        }
      });
    }
  };

  render() {
    const { show, detailChart, chartTitle } = this.state;
    const { searchParam, list, hospitals, loading, loadingDetail } = this.props;
    const chartData = (list && list.filter(obj => obj.orgName !== '预约量总计')) || [];
    // const chartData = list || [];
    return (
      <PageHeaderWrapper>
        <div className={classes.Container}>
          <SearchBar
            params={searchParam}
            onParamsChange={this.handleParamsChange}
            hospitals={hospitals}
            onSearch={this.handleSearch}
            onReset={this.handleReset}
            onExport={this.handelExport}
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
          {show === 'chart' ? (
            <Spin spinning={loading}>
              <div className={classes.Content} style={{ minHeight: '560px' }}>
                <StatisticsChart
                  data={chartData}
                  title="医院预约量统计"
                  xKey="orgName"
                  yKey="orderNum"
                  yAlias="预约量"
                  onChartClick={this.handleChartClick}
                />
              </div>
              {detailChart || loadingDetail ? (
                <Spin spinning={loadingDetail}>
                  <LineChart
                    data={detailChart || []}
                    title={`${chartTitle}预约量`}
                    xKey="countDate"
                    yKey="bookTotal"
                    yAlias="预约量"
                  />
                </Spin>
              ) : (
                ''
              )}
            </Spin>
          ) : (
            <Spin spinning={loading}>
              <Table
                rowKey="orgName"
                columns={this.setTableColums()}
                dataSource={list}
                className={classes.Content}
                pagination={false}
                bordered
              />
            </Spin>
          )}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Index;
