import React, { Component } from 'react';

import classes from './Accounts.less';

export class Accounts extends Component {
  componentDidMount() {
    console.log('Accounts');
  }

  render() {
    return <div className={classes.Accounts}>Accounts</div>;
  }
}

export default Accounts;
