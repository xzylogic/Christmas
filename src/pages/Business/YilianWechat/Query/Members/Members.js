import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Tabs, Radio, Table, Button } from 'antd';
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
    const { followingList } = this.props;
    const listLength = (followingList && followingList.length) || 0;
    const columns = [
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
      },
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
    return columns;
  };

  setRTableColumns = () => {
    const { registrationList } = this.props;
    const listLength = (registrationList && registrationList.length) || 0;
    const columns = [
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
      },
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

  handleFollowDownload = e => {
    e.preventDefault();
    console.log('follow download');
  };

  handleRegisterDownload = e => {
    e.preventDefault();
    console.log('register download');
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
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onFetchMembershipListDebounce(0);
  };

  render() {
    const { followingList, registrationList, searchParam, allHosName, allPerson } = this.props;
    const { tab1Show, tab2Show } = this.state;
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
                <Button type="ghost" onClick={this.handleFollowDownload}>
                  下载
                </Button>
              </div>
              {tab1Show === 'list' ? (
                <div>
                  <Table
                    rowKey={(_, index) => index}
                    columns={this.setFTableColumns()}
                    dataSource={followingList}
                    pagination={false}
                  />
                </div>
              ) : (
                <FollowChart data={followingList} />
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
                <Button type="ghost" onClick={this.handleRegisterDownload}>
                  下载
                </Button>
              </div>
              {tab2Show === 'list' ? (
                <div>
                  <Table
                    rowKey={(_, index) => index}
                    columns={this.setRTableColumns()}
                    dataSource={registrationList}
                    pagination={false}
                  />
                </div>
              ) : (
                <RegisterChart data={registrationList} />
              )}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Member;
