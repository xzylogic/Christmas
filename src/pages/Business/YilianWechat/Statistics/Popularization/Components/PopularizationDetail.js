import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Select, Divider } from 'antd';

import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  // promoteAttentionList: state.businessYilianWechatQuery.detailList.location,

  // currentPage: state.businessYilianWechatQuery.detailCurrentPage.location,

  // totalElements: state.businessYilianWechatQuery.datailTotalElements.location,

  // searchParam: state.businessYilianWechatQuery.searchParam.location,
  promoteAttentionList: state.businessYilianWechatStatisticDatas.list.promoteAttention,
  currentPage: state.businessYilianWechatStatisticDatas.currentPage.promoteAttention,
  totalElements: state.businessYilianWechatStatisticDatas.totalElements.promoteAttention,
  searchParam: state.businessYilianWechatStatisticDatas.searchParam.promoteAttention,

  loading: state.loading.effects['businessYilianWechatStatisticDatas/fetchPromoteAttentionAmount'],
});

const mapDispatchToProps = dispatch => ({
  onFetchPromoteAttentionAmount: (way, name, page) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchPromoteAttentionAmount',
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
    const columns = [
      {
        title: '日期',
        // dataIndex: 'week' || 'date' || 'months' || 'years',
        // key: 'week',
        dataIndex: 'week' || 'date' || 'months' || 'years',
        key: 'week' || 'date' || 'months' || 'years',
        render: (_, record) => record.date || record.weeks || record.months || record.years,
      },
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
          list={promoteAttentionList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
      </Modal>
    );
  }
}

export default PopularizationDetail;
