import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Select, Divider } from 'antd';

import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  groupDetailList: state.businessYilianWechatQuery.detailList.group,
  currentPage: state.businessYilianWechatQuery.detailCurrentPage.group,
  totalElements: state.businessYilianWechatQuery.datailTotalElements.group,
  searchParam: state.businessYilianWechatQuery.searchParam.group,
  groupMonthAmount: state.businessYilianWechatQuery.list.fetchMessage,
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

  setFansCountColor = (record, setMonth, groupMonthAmount) => {
    if (setMonth) {
      if (
        !(record.regCount < groupMonthAmount.mRegCount) &&
        !(record.fansCount < groupMonthAmount.mFansCount)
      ) {
        return <span>{record.fansCount}</span>;
      }
      return <span style={{ color: 'red' }}>{record.fansCount}</span>;
    }
    return <span>{record.fansCount}</span>;
  };

  setRegCountColor = (record, setMonth, groupMonthAmount) => {
    if (setMonth) {
      if (
        !(record.regCount < groupMonthAmount.mRegCount) &&
        !(record.fansCount < groupMonthAmount.mFansCount)
      ) {
        return <span>{record.regCount}</span>;
      }
      return <span style={{ color: 'red' }}>{record.regCount}</span>;
    }
    return <span>{record.regCount}</span>;
  };

  setTableColumns = () => {
    const { groupDetailList } = this.props;
    let columns;
    if (groupDetailList instanceof Object) {
      const { groupMonthAmount } = this.props;
      const setMonth = Object.keys(groupDetailList[0])[0] === 'months';
      columns = [
        {
          title: '日期',
          dataIndex: 'date' || 'months' || 'weeks' || 'years',
          key: 'date' || 'months' || 'weeks' || 'years',
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
          render: (_, record) => this.setFansCountColor(record, setMonth, groupMonthAmount),
        },
        {
          title: '注册量',
          dataIndex: 'regCount',
          key: 'regCount',
          render: (_, record) => this.setRegCountColor(record, setMonth, groupMonthAmount),
        },
      ];
    }
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
          rowKey={(_, index) => index}
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
