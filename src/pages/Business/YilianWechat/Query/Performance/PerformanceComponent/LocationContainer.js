import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import QuerySearchBar from '../../QueryComponent/QuerySearchBar';
import TableList from '@/components/PageComponents/Table/TableList';
import LocationDetail from './LocationDetail';

const mapStateToProps = state => ({
  locationList: state.businessYilianWechatQuery.list.location,
  currentPage: state.businessYilianWechatQuery.currentPage.location,
  totalElements: state.businessYilianWechatQuery.totalElements.location,
  searchParam: state.businessYilianWechatQuery.searchParam.location,
  loading: state.loading.effects['businessYilianWechatQuery/fetchLocationPerformance'],
});

const mapDispatchToProps = dispatch => ({
  onFetchLocationList: page =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchLocationPerformance',
      payload: { page },
    }),
  onFetchLocationListDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatQuery/fetchLocationPerformance',
        payload: { page },
      }),
    500
  ),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatQuery/updateSearchParam',
      payload: { origin: 'location', key, value },
    }),
  onDownloadLocationList: page =>
    dispatch({
      type: 'businessYilianWechatQuery/downloadLocationPerformance',
      payload: { page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class LocationContainer extends Component {
  state = {
    showDetail: false,
    selectedName: '',
    amountSetShow: false,
  };

  componentDidMount() {
    const { onFetchLocationList } = this.props;
    onFetchLocationList(0);
  }

  handleParamsChanged = async (value, dataKey) => {
    const { onSearchParamChange, onFetchLocationListDebounce } = this.props;
    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchLocationListDebounce(0);
  };

  handleDetail = (e, record) => {
    e.preventDefault();
    this.setState({
      showDetail: true,
      selectedName: record.name,
    });
  };

  setTableColumns = () => {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '人数',
        dataIndex: 'counts',
        key: 'counts',
      },
      {
        title: '所在组',
        dataIndex: 'group',
        key: 'group',
      },
      {
        title: '渠道',
        dataIndex: 'promoCode',
        key: 'promoCode',
        // render: () => '微信',
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
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        render: (_, record) => (
          <span>
            <a onClick={e => this.handleDetail(e, record)}>查看详情</a>
          </span>
        ),
      },
    ];
    return columns;
  };

  handlePageChange = page => {
    const { onFetchLocationList } = this.props;
    onFetchLocationList(page - 1);
  };

  handleAmountSet = e => {
    e.preventDefault();
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchLocationList } = this.props;
    onFetchLocationList(0);
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchLocationList } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onSearchParamChange('name', '');
    await onFetchLocationList(0);
  };

  handleExport = e => {
    e.preventDefault();
    const { onDownloadLocationList, onSearchParamChange, currentPage } = this.props;

    onSearchParamChange('isExport', true);
    onDownloadLocationList(currentPage).then(data => {
      if (data) {
        const a = document.createElement('a');
        a.setAttribute('href', data);
        a.setAttribute('target', '_blank');
        a.click();
      }
    });
    onSearchParamChange('isExport', false);
  };

  handleDetailClose = e => {
    e.preventDefault();
    this.setState({
      showDetail: false,
    });
  };

  render() {
    const { searchParam, locationList, currentPage, totalElements } = this.props;
    const { showDetail, selectedName, amountSetShow } = this.state;
    return (
      <React.Fragment>
        <QuerySearchBar
          params={searchParam}
          onAmountSet={this.handleAmountSet}
          onSearch={this.handleSearch}
          onReset={this.handleReset}
          onExport={this.handleExport}
          onParamsChange={this.handleParamsChanged}
          inputPlaceholder="请输入地址名称"
          amountSetShow={amountSetShow}
        />
        <TableList
          rowKey="name"
          list={locationList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
        <LocationDetail name={selectedName} visible={showDetail} onClose={this.handleDetailClose} />
      </React.Fragment>
    );
  }
}

export default LocationContainer;
