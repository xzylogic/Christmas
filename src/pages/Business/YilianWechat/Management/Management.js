import React, { Component } from 'react';
import { Tabs } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MemberContainer from './ManagementComponent/MemberContainer';
import GroupContainer from './ManagementComponent/GroupContainer';
import LocationContainer from './ManagementComponent/LocationContainer';
import classes from './Management.less';

export class ApplicationDissemination extends Component {
  render() {
    return (
      <PageHeaderWrapper>
        <Tabs className={classes.Container} animated={false} onChange={this.handleTabChange}>
          <Tabs.TabPane tab="小组管理" key="1" className={classes.Content}>
            <GroupContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="人员管理" key="2" className={classes.Content}>
            <MemberContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="推广地点管理" key="3" className={classes.Content}>
            <LocationContainer />
          </Tabs.TabPane>
        </Tabs>
      </PageHeaderWrapper>
    );
  }
}

export default ApplicationDissemination;
