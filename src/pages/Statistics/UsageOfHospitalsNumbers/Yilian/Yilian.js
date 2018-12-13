import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Radio } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchBar from '../../ZStatisticsComponent/QuerySearchBar';
import StatisticsChart from '../../ZStatisticsComponent/StatisticsColumnChart';
import { STATISTICS_TYPE, STATISTICS_ORIGIN } from '@/models/statistics/statistics';

import classes from '../../Statistics.less';

const mapStateToProps = state => ({
  searchParam:
    state.statistics.searchParams[STATISTICS_TYPE.USAGE_OF_HOSPITALS_NUMBERS][
      STATISTICS_ORIGIN.YILIAN
    ],
  list: state.statistics.list[STATISTICS_TYPE.USAGE_OF_HOSPITALS_NUMBERS][STATISTICS_ORIGIN.YILIAN],
  hospitals:
    state.statistics.hospitals[STATISTICS_TYPE.USAGE_OF_HOSPITALS_NUMBERS][
      STATISTICS_ORIGIN.YILIAN
    ],
});

const mapDispatchToProps = dispatch => ({
  onUpdateSearchParams: (key, value) =>
    dispatch({
      type: 'statistics/updateSearchParams',
      payload: {
        type: STATISTICS_TYPE.USAGE_OF_HOSPITALS_NUMBERS,
        origin: STATISTICS_ORIGIN.YILIAN,
        key,
        value,
      },
    }),
  onFetchYilianStatistics: () =>
    dispatch({
      type: 'statistics/fetchYilianStatistics',
      payload: {
        type: STATISTICS_TYPE.USAGE_OF_HOSPITALS_NUMBERS,
        origin: STATISTICS_ORIGIN.YILIAN,
      },
    }),
  onFetchSearchHospitals: () =>
    dispatch({
      type: 'statistics/fetchSearchHospitals',
      payload: {
        type: STATISTICS_TYPE.USAGE_OF_HOSPITALS_NUMBERS,
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
  };

  componentDidMount() {
    const { list, onFetchYilianStatistics, onFetchSearchHospitals } = this.props;
    if (!list) {
      onFetchYilianStatistics(0);
    }
    onFetchSearchHospitals();
  }

  handleParamsChange = async (value, dataKey) => {
    const { onUpdateSearchParams, onFetchYilianStatistics, onFetchSearchHospitals } = this.props;
    if (dataKey === 'date') {
      await onUpdateSearchParams('startDate', value[0]);
      await onUpdateSearchParams('endDate', value[1]);
    } else if (dataKey === 'cityCode') {
      await onUpdateSearchParams(dataKey, value);
      await onFetchSearchHospitals();
    } else {
      await onUpdateSearchParams(dataKey, value);
    }
    await onFetchYilianStatistics();
  };

  setTableColums = () => {
    const columns = [
      {
        title: '医院名称',
        dataIndex: 'orgName',
        key: 'orgName',
      },
      {
        title: '医院号源总数',
        dataIndex: 'cancelNum',
        key: 'cancelNum',
      },
      {
        title: '门诊类型',
        children: [
          {
            title: '专家退号量',
            dataIndex: 'specialistCancelNum',
            key: 'specialistCancelNum',
          },
          {
            title: '专病退号量',
            dataIndex: 'diseaseCancelNum',
            key: 'diseaseCancelNum',
          },
          {
            title: '普通退号量',
            dataIndex: 'commonCancelNum',
            key: 'commonCancelNum',
          },
          {
            title: '特需退号量',
            dataIndex: 'specialCancelNum',
            key: 'specialCancelNum',
          },
        ],
      },
      {
        title: '职称类别',
        children: [
          {
            title: '主任医师',
            dataIndex: 'highCancelNum',
            key: 'highCancelNum',
          },
          {
            title: '副主任医师',
            dataIndex: 'subCancelNum',
            key: 'subCancelNum',
          },
        ],
      },
    ];
    return columns;
  };

  render() {
    const { show } = this.state;
    const { searchParam, list, hospitals } = this.props;
    // const chartData = list && list.filter(obj => obj.orgName!== '退号量总计') || [];
    const chartData = list || [];
    return (
      <PageHeaderWrapper>
        <div className={classes.Container}>
          <SearchBar
            params={searchParam}
            onParamsChange={this.handleParamsChange}
            hospitals={hospitals}
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
            <div className={classes.Content} style={{ minHeight: '560px' }}>
              <StatisticsChart
                data={chartData}
                title="医院号源量统计"
                xKey="orgName"
                yKey="cancelNum"
                yAlias="号源量"
              />
            </div>
          ) : (
            <Table
              rowKey="orgName"
              columns={this.setTableColums()}
              dataSource={list}
              className={classes.Content}
              pagination={false}
            />
          )}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Index;
