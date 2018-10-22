import React, { Component } from 'react';

import classes from './Menus.less';

export class Menus extends Component {
  componentDidMount() {
    console.log('Menus');
  }

  render() {
    return <div className={classes.Menus}>Menus</div>;
  }
}

export default Menus;
