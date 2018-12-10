import React, { Component } from 'react';
import createG2 from 'g2-react';

const Line = createG2(chart => {
  chart.col('date', { alias: ' ' });
  chart.col('value', { alias: '注册人数' });
  chart.col('type', { alias: '渠道' });
  chart
    .line()
    .position('date*value')
    .color('type', ['#36cfc9', '#ffc53d', '#40a9ff', '#ff4d4f'])
    .shape('line')
    .size(2);
  chart.render();
});

const getType = type => {
  switch (type) {
    case 'online':
      return '微信线上注册数';
    case 'person':
      return '微信地推人员注册数';
    case 'hos':
      return '微信医院二维码注册数';
    case 'counts':
      return '微信注册总数';
    default:
      return '';
  }
};

const getDateSource = data =>
  data.filter(obj => obj.date !== undefined).reduce((preArr, currObj) => {
    const singleArr = Object.keys(currObj)
      .filter(key => !(key === 'date' || key === 'appName'))
      .reduce((pre, curr, i, arr) => {
        const singleObj = {
          date: currObj.date,
          appName: currObj.appName,
          type: getType(arr[i]),
          value: currObj[arr[i]],
        };
        return [...pre, ...[singleObj]];
      }, []);
    return [...preArr, ...singleArr];
  }, []);

class FollowChart extends Component {
  state = {
    width: 1000,
    height: 500,
    plotCfg: {
      margin: [10, 200, 200, 120],
    },
  };

  render() {
    const { width, height, plotCfg } = this.state;
    const { data } = this.props;

    return (
      <Line
        data={(data && getDateSource(data)) || []}
        width={width}
        height={height}
        plotCfg={plotCfg}
        forceFit
      />
    );
  }
}

export default FollowChart;
