import React, { Component } from 'react';
import createG2 from 'g2-react';
import { Stat } from 'g2';
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
      chart.coord('theta', {
        radius: 0.65,
      });
      chart
        .intervalStack()
        .position(Stat.summary.percent('count'))
        .color('item')
        .label('item*..percent', (_, percent) => `${(percent * 100).toFixed(2)}%`)
        .style({
          lineWidth: 1,
          stroke: '#fff',
        });
      chart.on('plotclick', this.handleChartClick);
      chart.render();
      chart.on('tooltipchange', ev => {
        const { items } = ev; // tooltip显示的项
        const origin = items[0]; // 将一条数据改成多条数据
        const {
          point: { _origin },
        } = origin;
        items.splice(0); // 清空
        items.push({
          name: `${label}量`,
          title: origin.name,
          marker: true,
          color: origin.color,
          value: origin.title,
        });
        items.push({
          name: `${label}率`,
          marker: true,
          title: origin.name,
          color: origin.color,
          value: origin.value,
        });
        items.push({
          name: `统计总${label}量`,
          marker: true,
          title: origin.name,
          color: origin.color,
          value: (_origin.count / _origin['..percent']).toFixed(0),
        });
      });
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
