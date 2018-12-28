import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Tabs, Radio, Table, Button, Modal } from 'antd';
import debounce from 'lodash.debounce';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MemberSearch from './MemberComponent/MemberSearch';

import FollowChart from './MemberComponent/FollowChart';
import RegisterChart from './MemberComponent/RegisterChart';

import classes from './Members.less';

const mapStateToProps = state => ({
  searchParam: state.businessYilianWechatQuery.searchParam.membership,
  followingList: state.businessYilianWechatQuery.list.following,
  registrationList: state.businessYilianWechatQuery.list.registration,
  allHosName: state.businessYilianWechatQuery.list.fetchhosName,
  allPerson: state.businessYilianWechatQuery.list.fetchallPerson,
});

const mapDispatchToProps = dispatch => ({
  onFetchMembershipList: () =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchMembership',
    }),
  onFetchMembershipListDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatQuery/fetchMembership',
        payload: { page },
      }),
    500
  ),

  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatQuery/updateSearchParam',
      payload: { origin: 'membership', key, value },
    }),

  onFetchHosname: () =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchHosname',
    }),

  onFetchallPerson: () =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchallPerson',
    }),
  onDownloadMembershipList: () =>
    dispatch({
      type: 'businessYilianWechatQuery/downloadMembership',
    }),
});

const renderContent = (text, record, index, listLength) => {
  let content = '';
  if (index === listLength - 1) {
    content = <span style={{ color: 'red' }}>{text}</span>;
  } else {
    content = text;
  }
  return content;
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Member extends Component {
  state = {
    tab1Show: 'chart',
    tab2Show: 'chart',
    tab1ModalShow: false,
    tab2ModalShow: false,
  };

  componentDidMount() {
    const { onFetchMembershipList, onFetchHosname, onFetchallPerson } = this.props;
    onFetchMembershipList();
    onFetchHosname();
    onFetchallPerson();
  }

  hangdleTab1Change = e => {
    this.setState({ tab1Show: e.target.value });
  };

  hangdleTab2Change = e => {
    this.setState({ tab2Show: e.target.value });
  };

  setFTableColumns = () => {
    const { followingList, searchParam } = this.props;
    const listLength = (followingList && followingList.length) || 0;
    const columns = [];

    switch (searchParam.type) {
      case '0':
        columns.push({
          title: '日期',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case '1':
        columns.push({
          title: '周期',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case '2':
        columns.push({
          title: '月份',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case '3':
        columns.push({
          title: '年份',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      default:
        break;
    }

    const columnsArr = [
      {
        title: '机构',
        dataIndex: 'appName',
        key: 'appName',
        render: (text, record, index) => renderContent(text, record, index, listLength),
      },
      {
        title: '微信线上关注数',
        dataIndex: 'online',
        key: 'online',
        render: (text, record, index) => renderContent(text, record, index, listLength),
      },
      {
        title: '微信地推人员关注数',
        dataIndex: 'person',
        key: 'person',
        render: (text, record, index) => renderContent(text, record, index, listLength),
      },
      {
        title: '微信医院二维码关注数',
        dataIndex: 'hos',
        key: 'hos',
        render: (text, record, index) => renderContent(text, record, index, listLength),
      },
      {
        title: '微信关注总数',
        dataIndex: 'counts',
        key: 'counts',
        render: (text, record, index) => renderContent(text, record, index, listLength),
      },
      {
        title: '微信取消关注数',
        dataIndex: 'unFollow',
        key: 'unFollow',
        render: (text, record, index) => renderContent(text, record, index, listLength),
      },
    ];

    columns.push(...columnsArr);
    return columns;
  };

  setRTableColumns = () => {
    const { registrationList, searchParam } = this.props;
    const listLength = (registrationList && registrationList.length) || 0;
    const columns = [];

    switch (searchParam.type) {
      case '0':
        columns.push({
          title: '日期',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case '1':
        columns.push({
          title: '周期',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case '2':
        columns.push({
          title: '月份',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case '3':
        columns.push({
          title: '年份',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      default:
        break;
    }

    const columnsArr = [
      {
        title: '机构',
        dataIndex: 'appName',
        key: 'appName',
        render: (text, record, index) => renderContent(text, record, index, listLength),
      },
      {
        title: '微信线上注册数',
        dataIndex: 'online',
        key: 'online',
        render: (text, record, index) => renderContent(text, record, index, listLength),
      },
      {
        title: '微信地推人员注册数',
        dataIndex: 'person',
        key: 'person',
        render: (text, record, index) => renderContent(text, record, index, listLength),
      },
      {
        title: '微信医院二维码注册数',
        dataIndex: 'hos',
        key: 'hos',
        render: (text, record, index) => renderContent(text, record, index, listLength),
      },
      {
        title: '微信注册总数',
        dataIndex: 'counts',
        key: 'counts',
        render: (text, record, index) => renderContent(text, record, index, listLength),
      },
    ];

    columns.push(...columnsArr);
    return columns;
  };

  getList = list => {
    const listCopy = [...list];
    const listCounts = listCopy.reduce((preObj, obj) => ({
      counts: Number(preObj.counts + obj.counts),
      hos: Number(preObj.hos + obj.hos),
      online: Number(preObj.online + obj.online),
      person: Number(preObj.person + obj.person),
      unFollow: Number(preObj.unFollow + obj.unFollow),
    }));
    listCopy.push(listCounts);
    return listCopy;
  };

  handleParamsChange = async (value, dataKey) => {
    const { onSearchParamChange, onFetchMembershipListDebounce } = this.props;
    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchMembershipListDebounce(0);
  };

  handleSureFollowDownload = e => {
    e.preventDefault();
    this.setState({ tab1ModalShow: true, tab2ModalShow: false });
  };

  handleFollowDownload = async e => {
    e.preventDefault();
    const { onDownloadMembershipList, onSearchParamChange } = this.props;

    onSearchParamChange('isExportFocus', true);
    onDownloadMembershipList().then(data => {
      if (data) {
        const a = document.createElement('a');
        a.setAttribute('href', data);
        a.click();
      }
    });
    onSearchParamChange('isExportFocus', false);
    this.setState({ tab1ModalShow: false, tab2ModalShow: false });
  };

  handleSureRegisterDownload = e => {
    e.preventDefault();
    this.setState({ tab1ModalShow: false, tab2ModalShow: true });
  };

  handleRegisterDownload = e => {
    e.preventDefault();

    const { onDownloadMembershipList, onSearchParamChange } = this.props;

    onSearchParamChange('isExportRegister', true);
    onDownloadMembershipList().then(data => {
      if (data) {
        const a = document.createElement('a');
        a.setAttribute('href', data);
        a.click();
      }
    });
    onSearchParamChange('isExportRegister', false);
    this.setState({ tab1ModalShow: false, tab2ModalShow: false });
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchMembershipList } = this.props;
    onFetchMembershipList(0);
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchMembershipListDebounce } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 2678400000).format('YYYY-MM-DD')
    );
    await onSearchParamChange(
      'endTime',
      moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('type', '0');
    await onSearchParamChange('name', '');
    await onSearchParamChange('hosName', '');
    await onSearchParamChange('queryType', '');
    await onFetchMembershipListDebounce(0);
  };

  render() {
    const { followingList, registrationList, searchParam, allHosName, allPerson } = this.props;
    const { tab1Show, tab2Show, tab1ModalShow, tab2ModalShow } = this.state;
    return (
      <PageHeaderWrapper>
        <div className={classes.Container}>
          <MemberSearch
            allHosName={allHosName}
            allPerson={allPerson}
            params={searchParam}
            onParamsChange={this.handleParamsChange}
            onSearch={this.handleSearch}
            onReset={this.handleReset}
          />
          <Tabs className={classes.Content} animated={false}>
            <Tabs.TabPane tab="会员关注" key="1">
              <div className={classes.Map}>
                <Radio.Group
                  className={classes.Gap}
                  onChange={this.hangdleTab1Change}
                  defaultValue={tab1Show}
                >
                  <Radio.Button value="chart">图形</Radio.Button>
                  <Radio.Button value="list">列表</Radio.Button>
                </Radio.Group>
                <Button type="ghost" onClick={this.handleSureFollowDownload}>
                  下载
                </Button>
                <Modal
                  title="提示"
                  centered
                  visible={tab1ModalShow}
                  onOk={this.handleFollowDownload}
                  onCancel={() => this.setState({ tab1ModalShow: false })}
                >
                  <div>
                    【会员关注】: 确定导出从
                    {searchParam.startTime}到{searchParam.endTime}
                    该时段的记录？
                  </div>
                </Modal>
              </div>
              {tab1Show === 'list' ? (
                <div>
                  <Table
                    rowKey={(_, index) => index}
                    columns={this.setFTableColumns()}
                    dataSource={followingList}
                    pagination={false}
                    bordered
                  />
                </div>
              ) : (
                <FollowChart data={followingList} params={searchParam} />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="会员注册" key="2">
              <div className={classes.Map}>
                <Radio.Group
                  className={classes.Gap}
                  onChange={this.hangdleTab2Change}
                  defaultValue={tab2Show}
                >
                  <Radio.Button value="chart">图形</Radio.Button>
                  <Radio.Button value="list">列表</Radio.Button>
                </Radio.Group>
                <Button type="ghost" onClick={this.handleSureRegisterDownload}>
                  下载
                </Button>
                <Modal
                  title="提示"
                  centered
                  visible={tab2ModalShow}
                  onOk={this.handleRegisterDownload}
                  onCancel={() => this.setState({ tab2ModalShow: false })}
                >
                  <div>
                    【会员注册 】: 确定导出从
                    {searchParam.startTime}到{searchParam.endTime}
                    该时段的记录？
                  </div>
                </Modal>
              </div>
              {tab2Show === 'list' ? (
                <div>
                  <Table
                    rowKey={(_, index) => index}
                    columns={this.setRTableColumns()}
                    dataSource={registrationList}
                    pagination={false}
                    bordered
                  />
                </div>
              ) : (
                <RegisterChart data={registrationList} params={searchParam} />
              )}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Member;
