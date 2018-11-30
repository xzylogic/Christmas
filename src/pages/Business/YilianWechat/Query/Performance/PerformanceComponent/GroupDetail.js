import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Select, Divider } from 'antd';

import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  groupDetailList: state.businessYilianWechatQuery.detailList.group,
  currentPage: state.businessYilianWechatQuery.detailCurrentPage.group,
  totalElements: state.businessYilianWechatQuery.datailTotalElements.group,
  searchParam: state.businessYilianWechatQuery.searchParam.group,
  loading: state.loading.effects['businessYilianWechatQuery/fetchGroupPerformanceDetail'],
});

const mapDispatchToProps = dispatch => ({
  onFetchGroupPerformanceDetail: (way, name, page) =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchGroupPerformanceDetail',
      payload: { way, name, page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class GroupDetail extends Component {
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
    const { onFetchGroupPerformanceDetail, name } = this.props;
    const { way } = this.state;
    if (name && prevProps.name !== name) {
      onFetchGroupPerformanceDetail(way, name, 0);
    }
  }

  setTableColumns = () => {
    const columns = [
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
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
    ];
    return columns;
  };

  handlePageChange = page => {
    const { onFetchGroupPerformanceDetail, name } = this.props;
    const { way } = this.state;
    if (name) {
      onFetchGroupPerformanceDetail(way, name, page - 1);
    }
  };

  handleWayChange = value => {
    const { onFetchGroupPerformanceDetail, name } = this.props;
    this.setState({ way: value });
    if (name) {
      onFetchGroupPerformanceDetail(value, name, 0);
    }
  };

  render() {
    const { groupDetailList, currentPage, totalElements, visible, name, onClose } = this.props;
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
          rowKey="date"
          list={groupDetailList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
      </Modal>
    );
  }
}

export default GroupDetail;
