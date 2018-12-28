import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Popconfirm } from 'antd';
import debounce from 'lodash.debounce';

import SearchBar from './SearchBar';
import TableList from './TableList';
import LocationEditor from './LocationEditor';

const mapStateToProps = state => ({
  locationName: state.businessYilianWechatManagement.searchParam.locationName,
  locationList: state.businessYilianWechatManagement.list.location,
  currentPage: state.businessYilianWechatManagement.currentPage.location,
  totalElements: state.businessYilianWechatManagement.totalElements.location,
  loading: state.loading.effects['businessYilianWechatManagement/fetchLocationList'],
});

const mapDispatchProps = dispatch => ({
  onFetchLocationList: page =>
    dispatch({
      type: 'businessYilianWechatManagement/fetchLocationList',
      payload: { page },
    }),
  onSearchLocationList: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatManagement/fetchLocationList',
        payload: { page },
      }),
    500
  ),
  onUpdataSearchParam: (key, value) =>
    dispatch({
      type: 'businessYilianWechatManagement/updateSearchParam',
      payload: { key, value },
    }),
  onDeleteLocation: id =>
    dispatch({
      type: 'businessYilianWechatManagement/deleteLocation',
      payload: { id },
    }),
  onDownloadLocationList: () =>
    dispatch({
      type: 'businessYilianWechatManagement/downloadLocationList',
    }),
});

@connect(
  mapStateToProps,
  mapDispatchProps
)
class LocationContainer extends Component {
  state = {
    param: '',
    showEditor: false,
    selectedData: null,
  };

  componentDidMount() {
    const { locationList, onFetchLocationList } = this.props;
    if (!locationList) {
      onFetchLocationList(0);
    }
  }

  handleEditor = (e, record) => {
    e.preventDefault();
    this.setState({
      showEditor: true,
      selectedData: record,
    });
  };

  handleDelete = (e, record) => {
    e.preventDefault();
    const { onDeleteLocation } = this.props;
    onDeleteLocation(record.id);
  };

  handlePageChange = page => {
    const { onFetchLocationList } = this.props;
    onFetchLocationList(page - 1);
  };

  setTableColumns = () => {
    const renderValid = record => {
      let content = <span>有效</span>;
      if (!record) {
        content = <span>无效</span>;
      }
      return content;
    };
    const columns = [
      {
        title: '地址名称',
        dataIndex: 'hosName',
        key: 'hosName',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '状态',
        dataIndex: 'valid',
        key: 'valid',
        render: record => renderValid(record),
        // render: (_,record)
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={e => this.handleEditor(e, record)}>编辑</a>
            {/* <Divider type="vertical" /> */ ' '}
            <Popconfirm
              placement="topRight"
              title={`确定要删除【${record.hosName}】这条记录吗？`}
              onConfirm={e => this.handleDelete(e, record)}
              onCancel={e => e.preventDefault()}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    return columns;
  };

  handleParamChange = async e => {
    e.preventDefault();
    this.setState({
      param: e.target.value,
    });
    const { onUpdataSearchParam, onSearchLocationList } = this.props;
    await onUpdataSearchParam('locationName', e.target.value);
    await onSearchLocationList(0);
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchLocationList } = this.props;
    onFetchLocationList(0);
  };

  handleRefresh = e => {
    e.preventDefault();
    const { onSearchLocationList } = this.props;
    onSearchLocationList(0);
  };

  handleNew = e => {
    e.preventDefault();
    this.setState({
      showEditor: true,
      selectedData: null,
    });
  };

  handleExport = e => {
    e.preventDefault();
    const { onDownloadLocationList } = this.props;
    onDownloadLocationList().then(data => {
      if (data) {
        const a = document.createElement('a');
        a.setAttribute('href', data);
        // a.setAttribute('target', '_blank');
        a.click();
      }
    });
  };

  render() {
    const { locationList, currentPage, totalElements } = this.props;
    const { param, showEditor, selectedData } = this.state;
    return (
      <div>
        <SearchBar
          inputValue={param}
          inputPlaceholder="请输入地址名称"
          onInputChange={this.handleParamChange}
          onSearchClick={this.handleSearch}
          onRefreshClick={this.handleRefresh}
          onNewClick={this.handleNew}
          onExportClick={this.handleExport}
        />
        <Divider />
        <TableList
          rowKey="id"
          list={locationList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
        <LocationEditor
          visible={showEditor}
          initialValue={selectedData}
          onClose={() => this.setState({ showEditor: false })}
        />
      </div>
    );
  }
}

export default LocationContainer;
