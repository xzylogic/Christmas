import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Select, Divider } from 'antd';

import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  locationDetailList: state.businessYilianWechatQuery.detailList.location,
  currentPage: state.businessYilianWechatQuery.detailCurrentPage.location,
  totalElements: state.businessYilianWechatQuery.datailTotalElements.location,
  searchParam: state.businessYilianWechatQuery.searchParam.location,
  loading: state.loading.effects['businessYilianWechatQuery/fetchLocationPerformanceDetail'],
});

const mapDispatchToProps = dispatch => ({
  onFetchLocationPerformanceDetail: (way, name, page) =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchLocationPerformanceDetail',
      payload: { way, name, page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class LocationDetail extends Component {
  state = {
    way: 'day',
  };

  componentWillReceiveProps(nextProps) {
    const { name } = this.props;
    if (name && nextProps.name !== name) {
      this.setState({ way: 'day' });
    }
  }

  componentDidUpdate(prevProps) {
    const { onFetchLocationPerformanceDetail, name } = this.props;
    const { way } = this.state;
    if (name && prevProps.name !== name) {
      onFetchLocationPerformanceDetail(way, name, 0);
    }
  }

  setTableColumns = () => {
    const { way } = this.state;

    const columns = [];

    switch (way) {
      case 'day':
        columns.push({
          title: '日期',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case 'week':
        columns.push({
          title: '周期',
          dataIndex: 'weeks',
          key: 'weeks',
        });
        break;
      case 'month':
        columns.push({
          title: '月份',
          dataIndex: 'months',
          key: 'months',
        });
        break;
      case 'year':
        columns.push({
          title: '年份',
          dataIndex: 'years',
          key: 'years',
        });
        break;
      default:
        break;
    }

    const columnsArr = [
      {
        title: '渠道',
        dataIndex: 'promoCode',
        key: 'promoCode',
      },
      {
        title: '关注量',
        dataIndex: 'fansCount',
        key: 'fansCount',
      },
      {
        title: '注册量',
        dataIndex: 'regCount',
        key: 'regCount',
      },
    ];

    columns.push(...columnsArr);

    // const columns = [
    //   {
    //     title: '日期',
    //     dataIndex: 'date' || 'months' || 'weeks' || 'years',
    //     key: 'date' || 'months' || 'weeks' || 'years',
    //     render: (_, record) => record.date || record.weeks || record.months || record.years,
    //   },
    //   {
    //     title: '渠道',
    //     dataIndex: 'promoCode',
    //     key: 'promoCode',
    //   },
    //   {
    //     title: '关注量',
    //     dataIndex: 'fansCount',
    //     key: 'fansCount',
    //   },
    //   {
    //     title: '注册量',
    //     dataIndex: 'regCount',
    //     key: 'regCount',
    //   },
    // ];
    return columns;
  };

  handlePageChange = page => {
    const { onFetchLocationPerformanceDetail, name } = this.props;
    const { way } = this.state;
    if (name) {
      onFetchLocationPerformanceDetail(way, name, page - 1);
    }
  };

  handleWayChange = value => {
    const { onFetchLocationPerformanceDetail, name } = this.props;
    this.setState({ way: value });
    if (name) {
      onFetchLocationPerformanceDetail(value, name, 0);
    }
  };

  render() {
    const { locationDetailList, currentPage, totalElements, visible, name, onClose } = this.props;
    const { way } = this.state;
    return (
      <Modal title="查看详情" centered visible={visible} footer={null} onCancel={onClose}>
        <Select name="way" value={way} onChange={this.handleWayChange}>
          <Select.Option value="day">按日统计</Select.Option>
          <Select.Option value="week">按周统计</Select.Option>
          <Select.Option value="month">按月统计</Select.Option>
          <Select.Option value="year">按年统计</Select.Option>
        </Select>
        <Divider>{name}</Divider>
        <TableList
          rowKey={(_, index) => index}
          list={locationDetailList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
      </Modal>
    );
  }
}

export default LocationDetail;
