import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Divider } from 'antd';

import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  appointmentList: state.businessYilianWechatStatisticDatas.detailList.appointmentAttention,
  currentPage: state.businessYilianWechatStatisticDatas.currentPage.appointmentAttention,
  totalElements: state.businessYilianWechatStatisticDatas.totalElements.appointmentAttention,
  searchParam: state.businessYilianWechatStatisticDatas.searchParam.appointmentAttention,

  loading: state.loading.effects['businessYilianWechatStatisticDatas/fetchAppointmentsDataDetail'],
});

const mapDispatchToProps = dispatch => ({
  onFetchAppointmentsDataDetail: (way, page) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchAppointmentsDataDetail',
      payload: { way, page },
    }),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/updateSearchParam',
      payload: { origin: 'appointmentAttention', key, value },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppointmentsDetail extends Component {
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
    const { onFetchAppointmentsDataDetail, onSearchParamChange, name, date } = this.props;

    const { way } = this.state;
    if (name && prevProps.name !== name) {
      let startTime = '';
      let endTime = '';

      // 按周显示
      if (date.split('-').length === 2) {
        startTime = date
          .split('-')[0]
          .split('/')
          .join('-');
        endTime = date
          .split('-')[1]
          .split('/')
          .join('-');
        // 按月显示
      } else if (date.split('/').length === 2) {
        const newStartDate = date.split('/');
        const newEndDate = date.split('/');
        newStartDate.push('01');
        const num = date.split('/')[1];
        const newNum = parseInt(num, 10);

        if (
          newNum === 1 ||
          newNum === 3 ||
          newNum === 5 ||
          newNum === 7 ||
          newNum === 8 ||
          newNum === 10 ||
          newNum === 12
        ) {
          newEndDate.push('31');
        } else if (newNum === 2) {
          newEndDate.push('28');
        } else {
          newEndDate.push('30');
        }
        startTime = newStartDate.join('-');
        endTime = newEndDate.join('-');
        // 按年显示
      } else if (date.split('/').length === 1) {
        const newStartDate = date.split('/');
        const newEndDate = date.split('/');
        newStartDate.push('01', '31');
        newEndDate.push('12', '31');
        startTime = newStartDate.join('-');
        endTime = newEndDate.join('-');
      }
      onSearchParamChange('chooseStartTime', startTime);
      onSearchParamChange('chooseEndTime', endTime);
      onFetchAppointmentsDataDetail(way, 0);
    }
  }

  setTableColumns = () => {
    const renderVisitLevelCode = record => {
      let content = '';
      if (record === '1') {
        content = <span>专家</span>;
      }
      if (record === '2') {
        content = <span>专病</span>;
      }
      if (record === '3') {
        content = <span>普通</span>;
      }
      return content;
    };

    const renderOrderStatus = record => {
      let content = '';
      if (record === '1') {
        content = <span>已预约</span>;
      }
      if (record === '3') {
        content = <span>已取消</span>;
      }
      return content;
    };

    const renderRegChannel = record => {
      let content = '';
      if (record === 'wechat') {
        content = <span>医联微信</span>;
      }
      if (record === 'app') {
        content = <span>医联App</span>;
      }
      return content;
    };

    const columns = [
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '医院类型',
        dataIndex: 'cityName',
        key: 'cityName',
      },
      {
        title: '医院名称',
        dataIndex: 'hosName',
        key: 'hosName',
      },
      {
        title: '门诊类型',
        dataIndex: 'visitLevelCode',
        key: 'visitLevelCode',
        render: record => renderVisitLevelCode(record),
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: record => renderOrderStatus(record),
      },
      {
        title: '预约渠道',
        dataIndex: 'regChannel',
        key: 'regChannel',
        render: record => renderRegChannel(record),
      },
      {
        title: '预约量',
        dataIndex: 'reservationCount',
        key: 'reservationCount',
      },
    ];
    return columns;
  };

  handlePageChange = page => {
    const { onFetchAppointmentsDataDetail, name } = this.props;
    const { way } = this.state;
    if (name) {
      onFetchAppointmentsDataDetail(way, page - 1);
    }
  };

  render() {
    const { appointmentList, currentPage, totalElements, visible, onClose, date } = this.props;

    return (
      <Modal title="明细" width={900} centered visible={visible} footer={null} onCancel={onClose}>
        <Divider>{date}</Divider>
        {appointmentList instanceof Object ? (
          <TableList
            rowKey={(_, index) => index}
            list={appointmentList}
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

export default AppointmentsDetail;
