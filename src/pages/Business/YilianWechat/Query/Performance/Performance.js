import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import classes from './Performance.less';

export class Performance extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageHeaderWrapper>
        <div className={classes.Container}>Performance</div>
      </PageHeaderWrapper>
    );
  }
}

export default Performance;
