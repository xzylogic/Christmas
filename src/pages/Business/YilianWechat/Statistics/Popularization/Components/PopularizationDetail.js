import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Select, Divider } from 'antd';

import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  promoteAttentionList: state.businessYilianWechatStatisticDatas.detailList.promoteAttention,
  currentPage: state.businessYilianWechatStatisticDatas.currentPage.promoteAttention,
  totalElements: state.businessYilianWechatStatisticDatas.totalElements.promoteAttention,
  searchParam: state.businessYilianWechatStatisticDatas.searchParam.promoteAttention,
  loading:
    state.loading.effects['businessYilianWechatStatisticDatas/fetchPromoteAttentionAmountDetail'],
});

const mapDispatchToProps = dispatch => ({
  onFetchPromoteAttentionAmount: (way, name, page) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchPromoteAttentionAmountDetail',
      payload: { way, name, page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class PopularizationDetail extends Component {
  state = {
    way: 'week',
  };

  componentWillReceiveProps(nextProps) {
    const { name } = this.props;
    if (name && nextProps.name !== name) {
      this.setState({ way: 'week' });
    }
  }

  componentDidUpdate(prevProps) {
    const { onFetchPromoteAttentionAmount, name } = this.props;
    const { way } = this.state;
    if (name && prevProps.name !== name) {
      onFetchPromoteAttentionAmount(way, name, 0);
    }
  }

  setTableColumns = () => {
    const { way } = this.state;
    console.log(way);

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
      {
        title: '注册转换率',
        dataIndex: 'conversionRate',
        key: 'conversionRate',
      },
    ];

    columns.push(...columnsArr);

    // const columns = [
    //   {
    //     title: '日期',
    //     dataIndex: 'weeks' || 'date' || 'months' || 'years',
    //     key: 'weeks' || 'date' || 'months' || 'years',
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
    //   {
    //     title: '注册转换率',
    //     dataIndex: 'conversionRate',
    //     key: 'conversionRate',
    //   },
    // ];
    return columns;
  };

  handlePageChange = page => {
    const { onFetchPromoteAttentionAmount, name } = this.props;
    const { way } = this.state;
    if (name) {
      onFetchPromoteAttentionAmount(way, name, page - 1);
    }
  };

  handleWayChange = value => {
    const { onFetchPromoteAttentionAmount, name } = this.props;
    this.setState({ way: value });
    if (name) {
      onFetchPromoteAttentionAmount(value, name, 0);
    }
  };

  render() {
    const { promoteAttentionList, currentPage, totalElements, visible, name, onClose } = this.props;
    const { way } = this.state;
    return (
      <Modal
        title="查看详情"
        width={600}
        centered
        visible={visible}
        footer={null}
        onCancel={onClose}
      >
        <Select name="way" value={way} onChange={this.handleWayChange}>
          <Select.Option value="day">按日统计</Select.Option>
          <Select.Option value="week">按周统计</Select.Option>
          <Select.Option value="month">按月统计</Select.Option>
          <Select.Option value="year">按年统计</Select.Option>
        </Select>
        <Divider>{name}</Divider>
        {promoteAttentionList instanceof Object ? (
          <TableList
            rowKey={(_, index) => index}
            list={promoteAttentionList}
            columns={this.setTableColumns()}
            currentPage={currentPage}
            totalElements={totalElements}
            onPageChange={this.handlePageChange}
          />
        ) : (
          ''
        )}
      </Modal>
    );
  }
}

export default PopularizationDetail;
