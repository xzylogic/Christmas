import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import classes from './Roles.less';

export class Roles extends Component {
  componentDidMount() {
    console.log('Roles');
  }

  render() {
    return (
      <PageHeaderWrapper>
        <div className={classes.Roles}>Roles</div>
      </PageHeaderWrapper>
    );
  }
}

export default Roles;
