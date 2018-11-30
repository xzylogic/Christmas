import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GroupContainer from './PerformanceComponent/GroupContainer';

import classes from './Performance.less';

const mapStateToProps = state => ({
  queryTab: state.businessYilianWechatQuery.queryTab,
});

const mapDispatchToProps = dispatch => ({
  onUpdateQueryTab: queryTab =>
    dispatch({
      type: 'businessYilianWechatQuery/updateQueryTab',
      payload: { queryTab },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Performance extends Component {
  handleTabChange = tabKey => {
    const { onUpdateQueryTab } = this.props;
    onUpdateQueryTab(tabKey);
  };

  render() {
    const { queryTab } = this.props;
    return (
      <PageHeaderWrapper>
        <Tabs
          className={classes.Container}
          animated={false}
          defaultActiveKey={queryTab}
          onChange={this.handleTabChange}
        >
          <Tabs.TabPane tab="小组查询" key="1" className={classes.Content}>
            <GroupContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="人员查询" key="2" className={classes.Content}>
            人员查询
          </Tabs.TabPane>
          <Tabs.TabPane tab="推广地点查询" key="3" className={classes.Content}>
            推广地点查询
          </Tabs.TabPane>
        </Tabs>
      </PageHeaderWrapper>
    );
  }
}

export default Performance;
