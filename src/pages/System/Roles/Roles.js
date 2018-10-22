import React, { Component } from 'react';

import classes from './Roles.less';

export class Roles extends Component {
  componentDidMount() {
    console.log('Roles');
  }

  render() {
    return <div className={classes.Roles}>Roles</div>;
  }
}

export default Roles;
