import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AppointmentsContainer from './AppointmentsContainer';

export class Appointments extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageHeaderWrapper>
        <AppointmentsContainer />
      </PageHeaderWrapper>
    );
  }
}

export default Appointments;
