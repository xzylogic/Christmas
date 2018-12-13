import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AppointmentsContainer from './Components/AppointmentsContainer';

import classes from './Appointments.less';

export class Appointments extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageHeaderWrapper>
        <div className={classes.Container}>
          <AppointmentsContainer />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Appointments;
