import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Radio, Row, Col, Spin } from 'antd';
import moment from 'moment';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchBar from '../../ZStatisticsComponent/QuerySearchBar';
import StatisticsChart from '../../ZStatisticsComponent/StatisticsPieChart';
import LineChart from '../../ZStatisticsComponent/StatisticsLineChart';
import { STATISTICS_TYPE, STATISTICS_ORIGIN } from '@/models/statistics/statistics';
import { sortNumber, sortDate } from '../../ZStatisticsComponent/common';

import classes from '../../Statistics.less';

const mapStateToProps = state => ({
  searchParam:
    state.statistics.searchParams[STATISTICS_TYPE.AMOUNT_OF_CHANNELS_APPOINTMENTS][
      STATISTICS_ORIGIN.YILIAN
    ],
  list:
    state.statistics.list[STATISTICS_TYPE.AMOUNT_OF_CHANNELS_APPOINTMENTS][
      STATISTICS_ORIGIN.YILIAN
    ],
  hospitals:
    state.statistics.hospitals[STATISTICS_TYPE.AMOUNT_OF_CHANNELS_APPOINTMENTS][
      STATISTICS_ORIGIN.YILIAN
    ],
  loading: state.loading.effects['statistics/fetchYilianStatistics'],
});

const mapDispatchToProps = dispatch => ({
  onUpdateSearchParams: (key, value) =>
    dispatch({
      type: 'statistics/updateSearchParams',
      payload: {
        type: STATISTICS_TYPE.AMOUNT_OF_CHANNELS_APPOINTMENTS,
        origin: STATISTICS_ORIGIN.YILIAN,
        key,
        value,
      },
    }),
  onFetchYilianStatistics: () =>
    dispatch({
      type: 'statistics/fetchYilianStatistics',
      payload: {
        type: STATISTICS_TYPE.AMOUNT_OF_CHANNELS_APPOINTMENTS,
        origin: STATISTICS_ORIGIN.YILIAN,
      },
    }),
  onExportYilianStatistics: () =>
    dispatch({
      type: 'statistics/exportYilianStatistics',
      payload: {
        type: STATISTICS_TYPE.AMOUNT_OF_CHANNELS_APPOINTMENTS,
        origin: STATISTICS_ORIGIN.YILIAN,
      },
    }),
  onFetchSearchHospitals: () =>
    dispatch({
      type: 'statistics/fetchSearchHospitals',
      payload: {
        type: STATISTICS_TYPE.AMOUNT_OF_CHANNELS_APPOINTMENTS,
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
    yKeyOne: null,
    yTitleOne: '',
    yKeyTwo: null,
    yTitleTwo: '',
  };

  componentDidMount() {
    const { list, onFetchYilianStatistics, onFetchSearchHospitals } = this.props;
    this.setState({ yKeyOne: '', yTitleOne: '', yKeyTwo: '', yTitleTwo: '' });
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

    this.setState({ yKeyOne: '', yTitleOne: '', yKeyTwo: '', yTitleTwo: '' });
    await onFetchYilianStatistics();
  };

  setTableColums = countType => {
    let dateTitle = '';
    let totalTitle = '';
    if (countType === 'day') {
      dateTitle = '日期';
      totalTitle = '日预约量';
    }
    if (countType === 'month') {
      dateTitle = '月份';
      totalTitle = '月预约量';
    }
    if (countType === 'year') {
      dateTitle = '年份';
      totalTitle = '年预约量';
    }
    const columns = [
      {
        title: dateTitle,
        dataIndex: 'countDate',
        key: 'countDate',
        width: 150,
        fixed: 'left',
        sorter: (a, b) => sortDate(a, b, 'countDate', '预约量总计', 'countDate'),
      },
      {
        title: totalTitle,
        dataIndex: 'bookTotal',
        key: 'bookTotal',
        width: 100,
        sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'bookTotal'),
      },
      {
        title: '微医渠道',
        dataIndex: 'weiYiChanelNum',
        key: 'weiYiChanelNum',
        width: 100,
        sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'weiYiChanelNum'),
      },
      {
        title: '微医渠道预约率',
        dataIndex: 'weiYiChannelRate',
        key: 'weiYiChannelRate',
        width: 100,
        sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'weiYiChannelRate'),
      },
      {
        title: '医联自有渠道',
        children: [
          {
            title: '医联预约平台',
            dataIndex: 'ylBookPlatformNum',
            key: 'ylBookPlatformNum',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'ylBookPlatformNum'),
          },
          {
            title: '医联预约平台预约率',
            dataIndex: 'ylBookPlatformRate',
            key: 'ylBookPlatformRate',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'ylBookPlatformRate'),
          },
          {
            title: '家医预约',
            dataIndex: 'homeDoctorBookNum',
            key: 'homeDoctorBookNum',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'homeDoctorBookNum'),
          },
          {
            title: '家医预约预约率',
            dataIndex: 'homeDoctorBookRate',
            key: 'homeDoctorBookRate',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'homeDoctorBookRate'),
          },
          {
            title: '医联APP',
            dataIndex: 'ylAppNum',
            key: 'ylAppNum',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'ylAppNum'),
          },
          {
            title: '医联APP预约率',
            dataIndex: 'ylAppRate',
            key: 'ylAppRate',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'ylAppRate'),
          },
          {
            title: '医联微信',
            dataIndex: 'ylWechatNum',
            key: 'ylWechatNum',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'ylWechatNum'),
          },
          {
            title: '医联微信预约率',
            dataIndex: 'ylWechatRate',
            key: 'ylWechatRate',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'ylWechatRate'),
          },
          {
            title: '电话',
            dataIndex: 'mobileNum',
            key: 'mobileNum',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'mobileNum'),
          },
          {
            title: '电话预约率',
            dataIndex: 'mobileRate',
            key: 'mobileRate',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'mobileRate'),
          },
          {
            title: '普陀社区',
            dataIndex: 'puTuoCommunityNum',
            key: 'puTuoCommunityNum',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'puTuoCommunityNum'),
          },
          {
            title: '普陀社区预约率',
            dataIndex: 'puTuoCommunityRate',
            key: 'puTuoCommunityRate',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'puTuoCommunityRate'),
          },
          {
            title: '上海发布',
            dataIndex: 'shangHaiPublicNum',
            key: 'shangHaiPublicNum',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'shangHaiPublicNum'),
          },
          {
            title: '上海发布预约率',
            dataIndex: 'shangHaiPublicRate',
            key: 'shangHaiPublicRate',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'shangHaiPublicRate'),
          },
          {
            title: '医联门户',
            dataIndex: 'ylGateWayNum',
            key: 'ylGateWayNum',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'ylGateWayNum'),
          },
          {
            title: '医联门户预约率',
            dataIndex: 'ylGateWayRate',
            key: 'ylGateWayRate',
            width: 100,
            sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'ylGateWayRate'),
          },
        ],
      },
      {
        title: '医联自有渠道',
        dataIndex: 'ylOwnerChannelNum',
        key: 'ylOwnerChannelNum',
        width: 100,
        sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'ylOwnerChannelNum'),
      },
      {
        title: '医联自有渠道预约率',
        dataIndex: 'ylOwnerChannelRate',
        key: 'ylOwnerChannelRate',
        width: 100,
        sorter: (a, b) => sortNumber(a, b, 'countDate', '预约量总计', 'ylOwnerChannelRate'),
      },
    ];
    return columns;
  };

  getDataSourceOne = data => {
    const totalCounts = data.filter(obj => obj.countDate === '预约量总计')[0];
    const dataCopy = [];
    if (totalCounts) {
      Object.keys(totalCounts).forEach(key => {
        switch (key) {
          case 'weiYiChannelRate':
            dataCopy.push({
              item: '微医',
              count: totalCounts.weiYiChanelNum,
              percent: parseFloat((totalCounts[key].split('%')[0] / 100).toFixed(4)),
            });
            break;
          case 'ylOwnerChannelRate':
            dataCopy.push({
              item: '医联自有渠道',
              count: totalCounts.ylOwnerChannelNum,
              percent: parseFloat((totalCounts[key].split('%')[0] / 100).toFixed(4)),
            });
            break;
          default:
            break;
        }
      });
    }
    return {
      title: (totalCounts && totalCounts.bookTotal) || '',
      data: dataCopy,
    };
  };

  getDataSourceTwo = data => {
    const totalCounts = data.filter(obj => obj.countDate === '预约量总计')[0];
    const dataCopy = [];
    if (totalCounts) {
      Object.keys(totalCounts).forEach(key => {
        switch (key) {
          case 'ylBookPlatformRate':
            dataCopy.push({
              item: '医联预约平台',
              count: totalCounts.ylBookPlatformNum,
              percent: parseFloat((totalCounts[key].split('%')[0] / 100).toFixed(4)),
            });
            break;
          case 'homeDoctorBookRate':
            dataCopy.push({
              item: '家医预约',
              count: totalCounts.homeDoctorBookNum,
              percent: parseFloat((totalCounts[key].split('%')[0] / 100).toFixed(4)),
            });
            break;
          case 'ylAppRate':
            dataCopy.push({
              item: '医联APP',
              count: totalCounts.ylAppNum,
              percent: parseFloat((totalCounts[key].split('%')[0] / 100).toFixed(4)),
            });
            break;
          case 'ylWechatRate':
            dataCopy.push({
              item: '医联微信',
              count: totalCounts.ylWechatNum,
              percent: parseFloat((totalCounts[key].split('%')[0] / 100).toFixed(4)),
            });
            break;
          case 'mobileRate':
            dataCopy.push({
              item: '电话',
              count: totalCounts.mobileNum,
              percent: parseFloat((totalCounts[key].split('%')[0] / 100).toFixed(4)),
            });
            break;
          case 'puTuoCommunityRate':
            dataCopy.push({
              item: '普陀社区',
              count: totalCounts.puTuoCommunityNum,
              percent: parseFloat((totalCounts[key].split('%')[0] / 100).toFixed(4)),
            });
            break;
          case 'shangHaiPublicRate':
            dataCopy.push({
              item: '上海发布',
              count: totalCounts.shangHaiPublicNum,
              percent: parseFloat((totalCounts[key].split('%')[0] / 100).toFixed(4)),
            });
            break;
          case 'ylGateWayRate':
            dataCopy.push({
              item: '医联门户',
              count: totalCounts.ylGateWayNum,
              percent: parseFloat((totalCounts[key].split('%')[0] / 100).toFixed(4)),
            });
            break;
          default:
            break;
        }
      });
    }
    return {
      title: (totalCounts && totalCounts.ylOwnerChannelNum) || '',
      data: dataCopy,
    };
  };

  handleChartClick = key => {
    switch (key) {
      case '微医':
        this.setState({ yKeyOne: 'weiYiChanelNum', yTitleOne: '微医预约量趋势图' });
        break;
      case '医联预约平台':
        this.setState({ yKeyTwo: 'ylBookPlatformNum', yTitleTwo: '医联预约平台预约量趋势图' });
        break;
      case '家医预约':
        this.setState({ yKeyTwo: 'homeDoctorBookNum', yTitleTwo: '家医预约预约量趋势图' });
        break;
      case '医联APP':
        this.setState({ yKeyTwo: 'ylAppNum', yTitleTwo: '医联APP预约量趋势图' });
        break;
      case '医联微信':
        this.setState({ yKeyTwo: 'ylWechatNum', yTitleTwo: '医联微信预约量趋势图' });
        break;
      case '电话':
        this.setState({ yKeyTwo: 'mobileNum', yTitleTwo: '电话预约量趋势图' });
        break;
      case '普陀社区':
        this.setState({ yKeyTwo: 'puTuoCommunityNum', yTitleTwo: '普陀社区预约量趋势图' });
        break;
      case '上海发布':
        this.setState({ yKeyTwo: 'shangHaiPublicNum', yTitleTwo: '上海发布预约量趋势图' });
        break;
      case '医联门户':
        this.setState({ yKeyTwo: 'ylGateWayNum', yTitleTwo: '医联门户预约量趋势图' });
        break;
      case '医联自有渠道':
        this.setState({ yKeyOne: 'ylOwnerChannelNum', yTitleOne: '医联自有渠道预约量趋势图' });
        break;
      default:
        break;
    }
  };

  handleSearch = () => {
    const { onFetchYilianStatistics } = this.props;
    this.setState({ yKeyOne: '', yTitleOne: '', yKeyTwo: '', yTitleTwo: '' });
    onFetchYilianStatistics();
  };

  handleReset = async () => {
    const { onUpdateSearchParams, onFetchYilianStatistics } = this.props;
    this.setState({ yKeyOne: '', yTitleOne: '', yKeyTwo: '', yTitleTwo: '' });
    await onUpdateSearchParams('countType', 'day');
    await onUpdateSearchParams('startTime', moment(new Date().valueOf() - 2678400000));
    await onUpdateSearchParams('endTime', moment(new Date().valueOf() - 86400000));
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

  render() {
    const { show, yKeyOne, yTitleOne, yKeyTwo, yTitleTwo } = this.state;
    const { searchParam, list, hospitals, loading } = this.props;
    const chartData = (list && list.filter(obj => obj.countDate !== '预约量总计')) || [];
    const chartOneData = this.getDataSourceOne(list || []);
    const chartTwoData = this.getDataSourceTwo(list || []);
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
              <Row className={classes.Content} style={{ minHeight: '560px' }}>
                <Col span="12">
                  <StatisticsChart
                    data={chartOneData.data}
                    title={`渠道预约总量: ${chartOneData.title}`}
                    label="预约"
                    onChartClick={this.handleChartClick}
                  />
                </Col>
                <Col span="12">
                  {yKeyOne ? (
                    <LineChart
                      data={chartData}
                      title={yTitleOne}
                      xKey="countDate"
                      yKey={yKeyOne}
                      yAlias="预约量"
                    />
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
              <Row className={classes.Content} style={{ minHeight: '560px' }}>
                <Col span="12">
                  <StatisticsChart
                    data={chartTwoData.data}
                    title={`医联自有渠道预约总量: ${chartTwoData.title}`}
                    label="预约"
                    onChartClick={this.handleChartClick}
                  />
                </Col>
                <Col span="12">
                  {yKeyTwo ? (
                    <LineChart
                      data={chartData}
                      title={yTitleTwo}
                      xKey="countDate"
                      yKey={yKeyTwo}
                      yAlias="预约量"
                    />
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            </Spin>
          ) : (
            <Spin spinning={loading}>
              <Table
                rowKey="countDate"
                columns={this.setTableColums(searchParam.countType)}
                dataSource={list}
                className={classes.Content}
                pagination={false}
                scroll={{ x: 2250, y: 450 }}
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
