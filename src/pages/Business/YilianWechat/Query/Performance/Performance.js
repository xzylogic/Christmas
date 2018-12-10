import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GroupContainer from './PerformanceComponent/GroupContainer';
import MemberContainer from './PerformanceComponent/MemberContainer';
import LocationContainer from './PerformanceComponent/LocationContainer';

import classes from './Performance.less';

const mapStateToProps = state => ({
  performanceTab: state.businessYilianWechatQuery.performanceTab,
});

const mapDispatchToProps = dispatch => ({
  onUpdatePerformanceTab: performanceTab =>
    dispatch({
      type: 'businessYilianWechatQuery/updatePerformanceTab',
      payload: { performanceTab },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Performance extends Component {
  handleTabChange = tabKey => {
    const { onUpdatePerformanceTab } = this.props;
    onUpdatePerformanceTab(tabKey);
  };

  render() {
    const { performanceTab } = this.props;
    return (
      <PageHeaderWrapper>
        <Tabs
          className={classes.Container}
          animated={false}
          defaultActiveKey={performanceTab}
          onChange={this.handleTabChange}
        >
          <Tabs.TabPane tab="小组查询" key="1" className={classes.Content}>
            <GroupContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="人员查询" key="2" className={classes.Content}>
            <MemberContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="推广地点查询" key="3" className={classes.Content}>
            <LocationContainer />
          </Tabs.TabPane>
        </Tabs>
      </PageHeaderWrapper>
    );
  }
}

export default Performance;
