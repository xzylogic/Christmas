import React, { Component } from 'react';
import createG2 from 'g2-react';
import G2 from 'g2';

const Chart = createG2(chart => {
  chart.col('name', { alias: ' ' });
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
    .position('name*value')
    .color('type', ['#36cfc9', '#ffc53d', '#40a9ff', '#ff4d4f', '#9254de'])
    .animate(false);
  chart
    .line()
    .position('name*conversionRate')
    .color('#ff4d4f')
    .size(2);
  chart.render();
});

const getDataSource = data => {
  const { Frame } = G2;
  const dataCopy = data.map(obj => {
    const objCopy = { ...obj };
    objCopy.conversionRate = (obj.conversionRate && Number(obj.conversionRate.split('%')[0])) || 0;
    objCopy['关注量'] = objCopy.fansCount;
    objCopy['注册量'] = objCopy.regCount;
    return objCopy;
  });
  let frame = new Frame(dataCopy);
  frame = Frame.combinColumns(frame, ['关注量', '注册量'], 'value', 'type', [
    'name',
    'conversionRate',
  ]);
  return frame;
};

class Type2Chart extends Component {
  state = {
    width: 1000,
    height: 500,
    plotCfg: {
      margin: [50, 200, 100, 120],
    },
  };

  render() {
    const { width, height, plotCfg } = this.state;
    const { data } = this.props;

    return (
      <React.Fragment>
        <Chart
          data={(data && getDataSource(data)) || []}
          width={width}
          height={height}
          plotCfg={plotCfg}
          forceFit
        />
      </React.Fragment>
    );
  }
}

export default Type2Chart;
