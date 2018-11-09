import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import classes from './Menus.less';

export class Menus extends Component {
  componentDidMount() {
    console.log('Menus');
  }

  render() {
    return (
      <PageHeaderWrapper>
        <div className={classes.Menus}>Menus</div>
      </PageHeaderWrapper>
    );
  }
}

export default Menus;
