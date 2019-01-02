import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Radio, Row, Col, Spin } from 'antd';
import moment from 'moment';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchBar from '../../ZStatisticsComponent/QuerySearchBar';
import StatisticsChart from '../../ZStatisticsComponent/StatisticsPieChart';
import LineChart from '../../ZStatisticsComponent/StatisticsLineChart';
import { STATISTICS_TYPE, STATISTICS_ORIGIN } from '@/models/statistics/statistics';

import classes from '../../Statistics.less';

const mapStateToProps = state => ({
  searchParam:
    state.statistics.searchParams[STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REGISTRATION][
      STATISTICS_ORIGIN.YILIAN
    ],
  list:
    state.statistics.list[STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REGISTRATION][
      STATISTICS_ORIGIN.YILIAN
    ],
  loading: state.loading.effects['statistics/fetchYilianStatistics'],
  // hospitals:
  //   state.statistics.hospitals[STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REGISTRATION][STATISTICS_ORIGIN.YILIAN],
});

const mapDispatchToProps = dispatch => ({
  onUpdateSearchParams: (key, value) =>
    dispatch({
      type: 'statistics/updateSearchParams',
      payload: {
        type: STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REGISTRATION,
        origin: STATISTICS_ORIGIN.YILIAN,
        key,
        value,
      },
    }),
  onFetchYilianStatistics: () =>
    dispatch({
      type: 'statistics/fetchYilianStatistics',
      payload: {
        type: STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REGISTRATION,
        origin: STATISTICS_ORIGIN.YILIAN,
      },
    }),
  onExportYilianStatistics: () =>
    dispatch({
      type: 'statistics/exportYilianStatistics',
      payload: {
        type: STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REGISTRATION,
        origin: STATISTICS_ORIGIN.YILIAN,
      },
    }),
  // onFetchSearchHospitals: () =>
  //   dispatch({
  //     type: 'statistics/fetchSearchHospitals',
  //     payload: {
  //       type: STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REGISTRATION,
  //       origin: STATISTICS_ORIGIN.YILIAN,
  //     },
  //   }),
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
    const { list, onFetchYilianStatistics } = this.props;
    this.setState({ yKeyOne: '', yTitleOne: '', yKeyTwo: '', yTitleTwo: '' });
    if (!list) {
      onFetchYilianStatistics(0);
    }
    // onFetchSearchHospitals();
  }

  handleParamsChange = async (value, dataKey) => {
    const { onUpdateSearchParams, onFetchYilianStatistics } = this.props;

    if (dataKey === 'cityCode') {
      await onUpdateSearchParams(dataKey, value);
      // await onFetchSearchHospitals();
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
      totalTitle = '日注册量';
    }
    if (countType === 'month') {
      dateTitle = '月份';
      totalTitle = '月注册量';
    }
    if (countType === 'year') {
      dateTitle = '年份';
      totalTitle = '年注册量';
    }
    const columns = [
      {
        title: dateTitle,
        dataIndex: 'countDate',
        key: 'countDate',
        width: 150,
        sorter: (a, b) =>
          parseInt(new Date(a.countDate).valueOf(), 10) -
          parseInt(new Date(b.countDate).valueOf(), 10),
      },
      {
        title: totalTitle,
        dataIndex: 'registerTotal',
        key: 'registerTotal',
        width: 100,
        sorter: (a, b) => parseInt(a.registerTotal, 10) - parseInt(b.registerTotal, 10),
      },
      {
        title: '微医渠道',
        dataIndex: 'weiYiChanelNum',
        key: 'weiYiChanelNum',
        width: 100,
        sorter: (a, b) => parseInt(a.weiYiChanelNum, 10) - parseInt(b.weiYiChanelNum, 10),
      },
      {
        title: '微医渠道注册率',
        dataIndex: 'weiYiChannelRate',
        key: 'weiYiChannelRate',
        width: 100,
        sorter: (a, b) => parseInt(a.weiYiChannelRate, 10) - parseInt(b.weiYiChannelRate, 10),
      },
      {
        title: '医联自有渠道',
        children: [
          {
            title: '医联预约平台',
            dataIndex: 'ylBookPlatformNum',
            key: 'ylBookPlatformNum',
            width: 100,
            sorter: (a, b) => parseInt(a.ylBookPlatformNum, 10) - parseInt(b.ylBookPlatformNum, 10),
          },
          {
            title: '医联预约平台注册率',
            dataIndex: 'ylBookPlatformRate',
            key: 'ylBookPlatformRate',
            width: 100,
            sorter: (a, b) =>
              parseInt(a.ylBookPlatformRate, 10) - parseInt(b.ylBookPlatformRate, 10),
          },
          {
            title: '家医预约',
            dataIndex: 'homeDoctorBookNum',
            key: 'homeDoctorBookNum',
            width: 100,
            sorter: (a, b) => parseInt(a.homeDoctorBookNum, 10) - parseInt(b.homeDoctorBookNum, 10),
          },
          {
            title: '家医预约注册率',
            dataIndex: 'homeDoctorBookRate',
            key: 'homeDoctorBookRate',
            width: 100,
            sorter: (a, b) =>
              parseInt(a.homeDoctorBookRate, 10) - parseInt(b.homeDoctorBookRate, 10),
          },
          {
            title: '医联APP',
            dataIndex: 'ylAppNum',
            key: 'ylAppNum',
            width: 100,
            sorter: (a, b) => parseInt(a.ylAppNum, 10) - parseInt(b.ylAppNum, 10),
          },
          {
            title: '医联APP注册率',
            dataIndex: 'ylAppRate',
            key: 'ylAppRate',
            width: 100,
            sorter: (a, b) => parseInt(a.ylAppRate, 10) - parseInt(b.ylAppRate, 10),
          },
          {
            title: '医联微信',
            dataIndex: 'ylWechatNum',
            key: 'ylWechatNum',
            width: 100,
            sorter: (a, b) => parseInt(a.ylWechatNum, 10) - parseInt(b.ylWechatNum, 10),
          },
          {
            title: '医联微信注册率',
            dataIndex: 'ylWechatRate',
            key: 'ylWechatRate',
            width: 100,
            sorter: (a, b) => parseInt(a.ylWechatRate, 10) - parseInt(b.ylWechatRate, 10),
          },
          {
            title: '电话',
            dataIndex: 'mobileNum',
            key: 'mobileNum',
            width: 100,
            sorter: (a, b) => parseInt(a.mobileNum, 10) - parseInt(b.mobileNum, 10),
          },
          {
            title: '电话注册率',
            dataIndex: 'mobileRate',
            key: 'mobileRate',
            width: 100,
            sorter: (a, b) => parseInt(a.mobileRate, 10) - parseInt(b.mobileRate, 10),
          },
          {
            title: '普陀社区',
            dataIndex: 'puTuoCommunityNum',
            key: 'puTuoCommunityNum',
            width: 100,
            sorter: (a, b) => parseInt(a.puTuoCommunityNum, 10) - parseInt(b.puTuoCommunityNum, 10),
          },
          {
            title: '普陀社区注册率',
            dataIndex: 'puTuoCommunityRate',
            key: 'puTuoCommunityRate',
            width: 100,
            sorter: (a, b) =>
              parseInt(a.puTuoCommunityRate, 10) - parseInt(b.puTuoCommunityRate, 10),
          },
          {
            title: '上海发布',
            dataIndex: 'shangHaiPublicNum',
            key: 'shangHaiPublicNum',
            width: 100,
            sorter: (a, b) => parseInt(a.shangHaiPublicNum, 10) - parseInt(b.shangHaiPublicNum, 10),
          },
          {
            title: '上海发布注册率',
            dataIndex: 'shangHaiPublicRate',
            key: 'shangHaiPublicRate',
            width: 100,
            sorter: (a, b) =>
              parseInt(a.shangHaiPublicRate, 10) - parseInt(b.shangHaiPublicRate, 10),
          },
          {
            title: '医联门户',
            dataIndex: 'ylGateWayNum',
            key: 'ylGateWayNum',
            width: 100,
            sorter: (a, b) => parseInt(a.ylGateWayNum, 10) - parseInt(b.ylGateWayNum, 10),
          },
          {
            title: '医联门户注册率',
            dataIndex: 'ylGateWayRate',
            key: 'ylGateWayRate',
            width: 100,
            sorter: (a, b) => parseInt(a.ylGateWayRate, 10) - parseInt(b.ylGateWayRate, 10),
          },
        ],
      },
      {
        title: '医联自有渠道',
        dataIndex: 'ylOwnerChannelNum',
        key: 'ylOwnerChannelNum',
        width: 100,
        sorter: (a, b) => parseInt(a.ylOwnerChannelNum, 10) - parseInt(b.ylOwnerChannelNum, 10),
      },
      {
        title: '医联自有渠道注册率',
        dataIndex: 'ylOwnerChannelRate',
        key: 'ylOwnerChannelRate',
        width: 100,
        sorter: (a, b) => parseInt(a.ylOwnerChannelRate, 10) - parseInt(b.ylOwnerChannelRate, 10),
      },
    ];
    return columns;
  };

  getDataSourceOne = data => {
    const totalCounts = data.filter(obj => obj.countDate === '注册量总计')[0];
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
      title: (totalCounts && totalCounts.registerTotal) || '',
      data: dataCopy,
    };
  };

  getDataSourceTwo = data => {
    const totalCounts = data.filter(obj => obj.countDate === '注册量总计')[0];
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
        this.setState({ yKeyOne: 'weiYiChanelNum', yTitleOne: '微医注册量趋势图' });
        break;
      case '医联预约平台':
        this.setState({ yKeyTwo: 'ylBookPlatformNum', yTitleTwo: '医联预约平台注册量趋势图' });
        break;
      case '家医预约':
        this.setState({ yKeyTwo: 'homeDoctorBookNum', yTitleTwo: '家医预约注册量趋势图' });
        break;
      case '医联APP':
        this.setState({ yKeyTwo: 'ylAppNum', yTitleTwo: '医联APP注册量趋势图' });
        break;
      case '医联微信':
        this.setState({ yKeyTwo: 'ylWechatNum', yTitleTwo: '医联微信注册量趋势图' });
        break;
      case '电话':
        this.setState({ yKeyTwo: 'mobileNum', yTitleTwo: '电话注册量趋势图' });
        break;
      case '普陀社区':
        this.setState({ yKeyTwo: 'puTuoCommunityNum', yTitleTwo: '普陀社区注册量趋势图' });
        break;
      case '上海发布':
        this.setState({ yKeyTwo: 'shangHaiPublicNum', yTitleTwo: '上海发布注册量趋势图' });
        break;
      case '医联门户':
        this.setState({ yKeyTwo: 'ylGateWayNum', yTitleTwo: '医联门户预约量趋势图' });
        break;
      case '医联自有渠道':
        this.setState({ yKeyOne: 'ylOwnerChannelNum', yTitleOne: '医联自有渠道注册量趋势图' });
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

  render() {
    const { show, yKeyOne, yTitleOne, yKeyTwo, yTitleTwo } = this.state;
    const { searchParam, list, loading } = this.props;
    const chartData = (list && list.filter(obj => obj.countDate !== '注册量总计')) || [];
    const chartOneData = this.getDataSourceOne(list || []);
    const chartTwoData = this.getDataSourceTwo(list || []);
    return (
      <PageHeaderWrapper>
        <div className={classes.Container}>
          <SearchBar
            params={searchParam}
            onParamsChange={this.handleParamsChange}
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
                    title={`渠道注册总量: ${chartOneData.title}`}
                    label="注册"
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
                      yAlias="注册量"
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
                    title={`医联自有渠道注册总量: ${chartTwoData.title}`}
                    label="注册"
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
                      yAlias="注册量"
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
                scroll={{ x: 2250 }}
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
