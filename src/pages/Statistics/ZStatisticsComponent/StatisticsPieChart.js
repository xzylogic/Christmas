import React, { Component } from 'react';
import createG2 from 'g2-react';
import { Divider } from 'antd';

class StatisticsIntervalChart extends Component {
  state = {
    width: 1000,
    height: 500,
    plotCfg: {
      margin: [0, 120, 30, 50],
    },
  };

  handleChartClick = e => {
    const { onChartClick } = this.props;
    if (e && e.shape && e.shape.id) {
      const title = e.shape.id;
      try {
        onChartClick(title.split(' ')[1]);
      } catch {
        console.log(title);
      }
    }
  };

  render() {
    const { width, height, plotCfg } = this.state;
    const { data, title, label } = this.props;
    const Chart = createG2(chart => {
      chart.col('item', { alias: '渠道' });
      chart.col('percent', {
        alias: label,
        formatter: val => `${(val * 100).toFixed(2)}%`,
      });
      chart.coord('theta', {
        radius: 0.75,
      });
      chart
        .intervalStack()
        .position('percent')
        .color('item')
        .label('percent')
        .tooltip('item*percent')
        .style({
          lineWidth: 1,
          stroke: '#fff',
        });
      chart.on('plotclick', this.handleChartClick);
      chart.render();
    });

    return (
      <React.Fragment>
        <Divider>{title}</Divider>
        <Chart data={data} width={width} height={height} plotCfg={plotCfg} forceFit />
      </React.Fragment>
    );
  }
}

export default StatisticsIntervalChart;
