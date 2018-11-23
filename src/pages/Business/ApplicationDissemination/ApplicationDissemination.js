import React, { Component } from 'react';
import { Tabs } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MemberContainer from './ApplicationDisseminationComponent/MemberContainer';
import GroupContainer from './ApplicationDisseminationComponent/GroupContainer';
import LocationContainer from './ApplicationDisseminationComponent/LocationContainer';

import classes from './ApplicationDissemination.less';

export class ApplicationDissemination extends Component {
  componentDidMount() {
    console.log('ApplicationDissemination');
  }

  render() {
    return (
      <PageHeaderWrapper>
        <Tabs className={classes.Container} animated={false}>
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
