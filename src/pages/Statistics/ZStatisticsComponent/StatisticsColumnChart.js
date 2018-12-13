import React, { Component } from 'react';
import createG2 from 'g2-react';
import { Slider, Divider } from 'antd';

class StatisticsIntervalChart extends Component {
  state = {
    range: [0, 100],
    width: 1000,
    height: 500,
    plotCfg: {
      margin: [30, 80, 250, 80],
    },
  };

  getDataSource = (data, range) => {
    const dataCopy = data.slice(
      ((range[0] * data.length) / 100).toFixed(0),
      ((range[1] * data.length) / 100).toFixed(0)
    );
    return dataCopy;
  };

  handleRangeChanged = value => {
    this.setState({ range: value });
  };

  onChartClick = e => {
    console.log(e);
    if (e && e.shape && e.shape.id) {
      console.log(e.shape.id);
    }
  };

  render() {
    const { width, height, plotCfg, range } = this.state;
    const { data, xKey, yKey, yAlias, title } = this.props;

    const dataSource = (data && this.getDataSource(data, range)) || [];

    const Chart = createG2(chart => {
      chart.col(xKey, { alias: ' ' });
      chart.col(yKey, { alias: yAlias });
      chart
        .interval()
        .position(`${xKey}*${yKey}`)
        .color('#36cfc9')
        .animate(false);
      chart.on('plotclick', this.onChartClick);
      chart.render();
    });

    return (
      <React.Fragment>
        <Divider>{title}</Divider>
        <Slider
          range
          value={range}
          onChange={this.handleRangeChanged}
          style={{ margin: '0 80px 0 80px' }}
        />
        <Chart data={dataSource} width={width} height={height} plotCfg={plotCfg} forceFit />
      </React.Fragment>
    );
  }
}

export default StatisticsIntervalChart;
