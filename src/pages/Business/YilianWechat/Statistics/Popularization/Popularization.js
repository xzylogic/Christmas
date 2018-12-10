import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PopularizationContainer from './Components/PopularizationContainer';
import classes from './Popularization.less';

export class Popularization extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageHeaderWrapper>
        <div className={classes.Container}>
          <PopularizationContainer />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Popularization;
