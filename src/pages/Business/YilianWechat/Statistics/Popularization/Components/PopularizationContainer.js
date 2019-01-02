import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import PopularizationBar from './PopularizationBar';
import PopularizationDetail from './PopularizationDetail';
import TableList from '@/components/PageComponents/Table/TableList';
// import { Coord } from 'bizcharts';

const mapStateToProps = state => ({
  promoteAttentionList: state.businessYilianWechatStatisticDatas.list.promoteAttention,
  currentPage: state.businessYilianWechatStatisticDatas.currentPage.promoteAttention,
  totalElements: state.businessYilianWechatStatisticDatas.totalElements.promoteAttention,
  searchParam: state.businessYilianWechatStatisticDatas.searchParam.promoteAttention,
  allHosName: state.businessYilianWechatStatisticDatas.list.allHosName,
  allGroupName: state.businessYilianWechatStatisticDatas.list.allGroupName,
  groupHosName: state.businessYilianWechatStatisticDatas.list.groupHosName,
  loading: state.loading.effects['businessYilianWechatStatisticDatas/fetchPromoteAttentionAmount'],
});

const mapDispatchToProps = dispatch => ({
  onFetchPromoteAttentionAmount: (way, page) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchPromoteAttentionAmount',
      payload: { way, page },
    }),
  onFetchPromoteAttentionAmountDebounce: debounce(
    (way, page) =>
      dispatch({
        type: 'businessYilianWechatStatisticDatas/fetchPromoteAttentionAmount',
        payload: { way, page },
      }),
    500
  ),
  onFetchHosGroup: page =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchHosGroup',
      payload: { page },
    }),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/updateSearchParam',
      payload: { origin: 'promoteAttention', key, value },
    }),
  onFetchAllHosName: () =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchAllHosName',
    }),
  onFetchAllGroupName: () =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchAllGroupName',
    }),
  onDownloadPromoteAttentionAmount: (way, page) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/downloadPromoteAttentionAmount',
      payload: { way, page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppointmentsContainer extends Component {
  state = {
    way: 'week',
    selectedName: '',
    selectedDate: '',
    selectedHosName: '',
    selectedChannel: '',
    selectedGroup: '',
    showDetail: false,
  };

  componentDidMount() {
    const {
      onFetchPromoteAttentionAmount,
      onFetchAllHosName,
      onFetchAllGroupName,
      searchParam,
    } = this.props;
    const { way } = searchParam;

    onFetchPromoteAttentionAmount(way, 0);
    onFetchAllHosName();
    onFetchAllGroupName();
  }

  handleParamsChanged = async (value, dataKey) => {
    const {
      onSearchParamChange,
      onFetchPromoteAttentionAmountDebounce,
      onFetchHosGroup,
    } = this.props;
    const { way } = this.state;

    await onSearchParamChange(dataKey, value);
    await onFetchPromoteAttentionAmountDebounce(way, 0);
    await onFetchHosGroup(0);
  };

  setTableColumnsWechat = () => {
    const { searchParam } = this.props;
    const renderGroupId = record => {
      let content = '';
      if (record) {
        content = <span>{record}组</span>;
      }
      return content;
    };

    const handleDetail = (_, record) => {
      let content = (
        <span>
          <a onClick={e => this.handleDetail(e, record)}>查看</a>
        </span>
      );

      if (record && record.date) {
        content = <span style={{ color: '#8e8c8a' }}>查看</span>;
      }

      return content;
    };

    const columns = [];

    switch (searchParam.way) {
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
      // {
      //   title: '医院等级',
      //   dataIndex: 'hosName',
      //   key: 'hosName',
      // },
      {
        title: '医院名称',
        dataIndex: 'hosName',
        key: 'hosName',
      },
      {
        title: '渠道',
        dataIndex: 'promoCode',
        key: 'promoCode',
      },
      {
        title: '注册量',
        dataIndex: 'regCount',
        key: 'regCount',
      },
      // {
      //   title: '实名量',
      //   dataIndex: 'realCount',
      //   key: 'realCount',
      // },
      {
        title: '关注量',
        dataIndex: 'fansCount',
        key: 'fansCount',
      },
      {
        title: '明细',
        dataIndex: 'id',
        key: 'action',
        render: (_, record) => handleDetail(_, record),
        // render: (_, record) => (
        //   <span>
        //     <a onClick={e => this.handleDetail(e, record)}>查看</a>
        //   </span>
        // ),
      },
      {
        title: '组别',
        dataIndex: 'groupId',
        key: 'groupId',
        render: record => renderGroupId(record),
      },
      // {
      //   title: '二维码',
      //   dataIndex: 'hosName',
      //   key: 'hosName',
      // },
    ];

    columns.push(...columnsArr);
    return columns;
  };

  setTableColumnsApp = () => {
    const { way } = this.state;
    const renderGroupId = record => {
      let content = '';
      if (record) {
        content = <span>{record}组</span>;
      }
      return content;
    };

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
      // {
      //   title: '医院等级',
      //   dataIndex: 'hosName',
      //   key: 'hosName',
      // },
      {
        title: '医院名称',
        dataIndex: 'hosName',
        key: 'hosName',
      },
      {
        title: '渠道',
        dataIndex: 'promoCode',
        key: 'promoCode',
      },
      {
        title: '注册量',
        dataIndex: 'regCount',
        key: 'regCount',
      },
      // {
      //   title: '实名量',
      //   dataIndex: 'realCount',
      //   key: 'realCount',
      // },
      {
        title: '明细',
        dataIndex: 'id',
        key: 'action',
        render: (_, record) => (
          <span>
            <a onClick={e => this.handleDetail(e, record)}>查看</a>
          </span>
        ),
      },
      {
        title: '组别',
        dataIndex: 'groupId',
        key: 'groupId',
        render: record => renderGroupId(record),
      },
      // {
      //   title: '二维码',
      //   dataIndex: 'hosName',
      //   key: 'hosName',
      // },
    ];

    columns.push(...columnsArr);
    return columns;
  };

  handlePageChange = page => {
    const { onFetchPromoteAttentionAmount } = this.props;
    const { way } = this.state;
    onFetchPromoteAttentionAmount(way, page - 1);
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchPromoteAttentionAmount } = this.props;
    const { way } = this.state;
    onFetchPromoteAttentionAmount(way, 0);
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchPromoteAttentionAmount } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 2678400000).format('YYYY-MM-DD')
    );
    await onSearchParamChange(
      'endTime',
      moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('way', 'week');
    await onSearchParamChange('type', 'week');
    await onSearchParamChange('origin', '');
    await onSearchParamChange('hosName', '');
    await onSearchParamChange('hosGrade', null);
    await onSearchParamChange('group', '');
    await onSearchParamChange('channel', '微信');
    await onSearchParamChange('hosType', null);
    await onSearchParamChange('orderStatus', null);
    await onSearchParamChange('orderStatusWechat', null);
    await onSearchParamChange('orderStatusApp', null);
    await onSearchParamChange('isExport', false);
    await onSearchParamChange(
      'chooseStartTime',
      moment(new Date().valueOf() - 2678400000).format('YYYY-MM-DD')
    );
    await onSearchParamChange(
      'chooseEndTime',
      moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('chooseHosName', '');
    await onSearchParamChange('chooseChannel', '微信');
    await onSearchParamChange('chooseGroup', '');
    await onFetchPromoteAttentionAmount('week', 0);
  };

  handleExport = e => {
    e.preventDefault();
    const { onDownloadPromoteAttentionAmount, onSearchParamChange, currentPage } = this.props;
    const { way } = this.state;
    onSearchParamChange('isExport', true);
    onDownloadPromoteAttentionAmount(way, currentPage).then(data => {
      if (data) {
        const a = document.createElement('a');
        a.setAttribute('href', data);
        // a.setAttribute('target', '_blank');
        a.click();
      }
    });
    onSearchParamChange('isExport', false);
  };

  handleChangeWay = async value => {
    await this.setState({ way: value });
    const { onFetchPromoteAttentionAmount, onSearchParamChange } = this.props;
    const { way } = this.state;
    await onSearchParamChange('type', way);
    await onSearchParamChange('way', way);
    await onFetchPromoteAttentionAmount(way, 0);
  };

  handleDetail = (e, record) => {
    e.preventDefault();
    this.setState({
      showDetail: true,
      selectedName: record.hosName,
      selectedDate: record.date || record.weeks || record.months || record.years,
      selectedHosName: record.hosName,
      selectedChannel: record.promoCode,
      selectedGroup: record.groupId,
    });
  };

  handleDetailClose = e => {
    e.preventDefault();
    this.setState({
      showDetail: false,
    });
  };

  render() {
    const {
      searchParam,
      promoteAttentionList,
      currentPage,
      totalElements,
      allHosName,
      allGroupName,
      groupHosName,
    } = this.props;

    const {
      showDetail,
      selectedName,
      way,
      selectedDate,
      selectedHosName,
      selectedChannel,
      selectedGroup,
    } = this.state;

    return (
      <React.Fragment>
        <PopularizationBar
          way={way}
          allHosName={allHosName}
          allGroupName={allGroupName}
          groupHosName={groupHosName}
          params={searchParam}
          onSearch={this.handleSearch}
          onReset={this.handleReset}
          onExport={this.handleExport}
          onChangeWay={this.handleChangeWay}
          onParamsChange={this.handleParamsChanged}
        />
        {searchParam.channel === 'app' ? (
          <TableList
            rowKey={(_, index) => index}
            list={promoteAttentionList}
            columns={this.setTableColumnsApp()}
            currentPage={currentPage}
            totalElements={totalElements}
            onPageChange={this.handlePageChange}
          />
        ) : (
          <TableList
            rowKey={(_, index) => index}
            list={promoteAttentionList}
            columns={this.setTableColumnsWechat()}
            currentPage={currentPage}
            totalElements={totalElements}
            onPageChange={this.handlePageChange}
          />
        )}
        <PopularizationDetail
          name={selectedName}
          date={selectedDate}
          hosname={selectedHosName}
          channel={selectedChannel}
          group={selectedGroup}
          visible={showDetail}
          onClose={this.handleDetailClose}
        />
      </React.Fragment>
    );
  }
}

export default AppointmentsContainer;
