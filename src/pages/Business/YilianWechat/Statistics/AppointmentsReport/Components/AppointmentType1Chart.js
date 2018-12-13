import React, { Component } from 'react';
import createG2 from 'g2-react';

const Line = createG2(chart => {
  chart.col('date', { alias: ' ' });
  chart.col('reservationCount', { alias: '预约量' });
  chart.col('site', { alias: '医院名称' });
  chart
    .line()
    .position('date*reservationCount')
    .color('site', ['#36cfc9', '#ffc53d', '#40a9ff', '#ff4d4f', '#9254de'])
    .size(2)
    .animate(false);
  chart
    .point()
    .position('date*reservationCount')
    .color('site', ['#36cfc9', '#ffc53d', '#40a9ff', '#ff4d4f', '#9254de'])
    .size(2)
    .animate(false);
  chart.render();
});

class AppointmentType1Chart extends Component {
  state = {
    width: 1000,
    height: 500,
    plotCfg: {
      margin: [20, 200, 200, 120],
    },
  };

  render() {
    const { width, height, plotCfg } = this.state;
    const { data } = this.props;
    return (
      <React.Fragment>
        <React.Fragment>
          <Line data={data || []} width={width} height={height} plotCfg={plotCfg} forceFit />
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default AppointmentType1Chart;
