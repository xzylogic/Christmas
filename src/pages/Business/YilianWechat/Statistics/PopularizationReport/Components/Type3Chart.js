import React, { Component } from 'react';
import createG2 from 'g2-react';
import G2 from 'g2';
import { Slider } from 'antd';

const Chart = createG2(chart => {
  chart.col('date', { alias: ' ', type: 'cat' });
  chart.col('value', { alias: '人数' });
  chart.col('type', { alias: ' ' });
  chart.col('conversionRate', {
    alias: '注册转换率',
    formatter: val => `${val}%`,
  });
  chart.legend({
    position: 'top', // 设置图例的显示位置
    spacingX: 20, // 图例项之间的水平间距
  });
  chart
    .intervalDodge()
    .position('date*value')
    .color('type', ['#36cfc9', '#ffc53d', '#40a9ff', '#ff4d4f', '#9254de'])
    .animate(false);
  chart
    .line()
    .position('date*conversionRate')
    .color('#ff4d4f')
    .size(2);
  chart
    .point()
    .position('date*conversionRate')
    .color('#ff4d4f')
    .size(2);
  chart.render();
});

class Type3Chart extends Component {
  state = {
    range: [0, 100],
    width: 1000,
    height: 500,
    plotCfg: {
      margin: [50, 200, 150, 120],
    },
  };

  getDataSource = (data, range) => {
    const { Frame } = G2;
    const dataCopy = data
      .slice(
        ((range[0] * data.length) / 100).toFixed(0),
        ((range[1] * data.length) / 100).toFixed(0)
      )
      .map(obj => {
        const objCopy = { ...obj };
        objCopy.date = obj.sub_date || obj.weeks || obj.months || obj.years || '';
        objCopy.conversionRate =
          (obj.conversionRate && Number(obj.conversionRate.split('%')[0])) || 0;
        objCopy['关注量'] = objCopy.fansCount;
        objCopy['注册量'] = objCopy.regCount;
        return objCopy;
      });
    let frame = new Frame(dataCopy);
    frame = Frame.combinColumns(frame, ['关注量', '注册量'], 'value', 'type', [
      'date',
      'conversionRate',
    ]);
    return frame;
  };

  handleRangeChanged = value => {
    this.setState({ range: value });
  };

  render() {
    const { width, height, plotCfg, range } = this.state;
    const { data } = this.props;

    const dataSource = (data && this.getDataSource(data, range)) || [];

    return (
      <React.Fragment>
        <Chart data={dataSource} width={width} height={height} plotCfg={plotCfg} forceFit />
        <Slider
          range
          value={range}
          onChange={this.handleRangeChanged}
          style={{ margin: '0 200px 0 120px' }}
        />
      </React.Fragment>
    );
  }
}

export default Type3Chart;
