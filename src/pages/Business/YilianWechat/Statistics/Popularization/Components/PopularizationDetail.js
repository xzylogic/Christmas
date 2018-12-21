import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Divider } from 'antd';

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
  onFetchPromoteAttentionAmount: (way, page) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchPromoteAttentionAmountDetail',
      payload: { way, page },
    }),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/updateSearchParam',
      payload: { origin: 'promoteAttention', key, value },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class PopularizationDetail extends Component {
  state = {
    way: 'day',
  };

  componentDidUpdate(prevProps) {
    const { onFetchPromoteAttentionAmount, onSearchParamChange, name, date } = this.props;
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

      onFetchPromoteAttentionAmount(way, 0);
    }
  }

  setTableColumns = () => {
    const columns = [
      {
        title: '日期',
        dataIndex: 'weeks' || 'date' || 'months' || 'years',
        key: 'weeks' || 'date' || 'months' || 'years',
        render: (_, record) => record.date || record.weeks || record.months || record.years,
      },
      {
        title: '医院',
        dataIndex: 'hosName',
        key: 'hosName',
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
      onFetchPromoteAttentionAmount(way, page - 1);
    }
  };

  render() {
    const { promoteAttentionList, currentPage, totalElements, visible, date, onClose } = this.props;
    return (
      <Modal
        title="查看详情"
        width={700}
        centered
        visible={visible}
        footer={null}
        onCancel={onClose}
      >
        <Divider>{date}</Divider>
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
