import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Select, Divider } from 'antd';

import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  memberDetailList: state.businessYilianWechatQuery.detailList.member,
  currentPage: state.businessYilianWechatQuery.detailCurrentPage.member,
  totalElements: state.businessYilianWechatQuery.datailTotalElements.member,
  searchParam: state.businessYilianWechatQuery.searchParam.member,
  memberMonthAmount: state.businessYilianWechatQuery.list.fetchMemberMessage,
  loading: state.loading.effects['businessYilianWechatQuery/fetchMemberPerformanceDetail'],
});

const mapDispatchToProps = dispatch => ({
  onFetchMemberPerformanceDetail: (way, name, page) =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchMemberPerformanceDetail',
      payload: { way, name, page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class MemberDetail extends Component {
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
    const { onFetchMemberPerformanceDetail, name } = this.props;
    const { way } = this.state;
    if (name && prevProps.name !== name) {
      onFetchMemberPerformanceDetail(way, name, 0);
    }
  }

  setFansCountColor = (record, setMonth, memberMonthAmount) => {
    if (setMonth) {
      if (
        !(record.regCount < memberMonthAmount.mRegCount) &&
        !(record.fansCount < memberMonthAmount.mFansCount)
      ) {
        return <span>{record.fansCount}</span>;
      }
      return <span style={{ color: 'red' }}>{record.fansCount}</span>;
    }
    return <span>{record.fansCount}</span>;
  };

  setRegCountColor = (record, setMonth, memberMonthAmount) => {
    if (setMonth) {
      if (
        !(record.regCount < memberMonthAmount.mRegCount) &&
        !(record.fansCount < memberMonthAmount.mFansCount)
      ) {
        return <span>{record.regCount}</span>;
      }
      return <span style={{ color: 'red' }}>{record.regCount}</span>;
    }
    return <span>{record.regCount}</span>;
  };

  setTableColumns = () => {
    const { memberDetailList } = this.props;
    let columns;
    if (memberDetailList instanceof Object) {
      const { memberMonthAmount } = this.props;
      const setMonth = Object.keys(memberDetailList[0])[0] === 'months';
      columns = [
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
          render: (_, record) => this.setFansCountColor(record, setMonth, memberMonthAmount),
        },
        {
          title: '注册量',
          dataIndex: 'regCount',
          key: 'regCount',
          render: (_, record) => this.setRegCountColor(record, setMonth, memberMonthAmount),
        },
      ];
    }
    return columns;
  };

  handlePageChange = page => {
    const { onFetchMemberPerformanceDetail, name } = this.props;
    const { way } = this.state;
    if (name) {
      onFetchMemberPerformanceDetail(way, name, page - 1);
    }
  };

  handleWayChange = value => {
    const { onFetchMemberPerformanceDetail, name } = this.props;
    this.setState({ way: value });
    if (name) {
      onFetchMemberPerformanceDetail(value, name, 0);
    }
  };

  render() {
    const { memberDetailList, currentPage, totalElements, visible, name, onClose } = this.props;
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
          list={memberDetailList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
      </Modal>
    );
  }
}

export default MemberDetail;
