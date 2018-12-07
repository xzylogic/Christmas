import React, { Component } from 'react';
import createG2 from 'g2-react';
import { Divider } from 'antd';

const Line1 = createG2(chart => {
  chart.col('date', { alias: ' ' });
  chart.col('fansCount', { alias: '关注量' });
  chart.col('site', { alias: '医院名称' });
  chart
    .line()
    .position('date*fansCount')
    .color('site', ['#36cfc9', '#ffc53d', '#40a9ff', '#ff4d4f', '#9254de'])
    .size(2)
    .animate(false);
  chart.render();
});

const Line2 = createG2(chart => {
  chart.col('date', { alias: ' ' });
  chart.col('regCount', { alias: '注册量' });
  chart.col('site', { alias: '医院名称' });
  chart
    .line()
    .position('date*regCount')
    .color('site', ['#36cfc9', '#ffc53d', '#40a9ff', '#ff4d4f', '#9254de'])
    .size(2)
    .animate(false);
  chart.render();
});

const Line3 = createG2(chart => {
  chart.col('date', { alias: ' ' });
  chart.col('conversionRate', {
    alias: '注册转换率',
    formatter: val => `${val}%`,
  });
  chart.col('site', { alias: '医院名称' });
  chart
    .line()
    .position('date*conversionRate')
    .color('site', ['#36cfc9', '#ffc53d', '#40a9ff', '#ff4d4f', '#9254de'])
    .size(2)
    .animate(false);
  chart.render();
});

const getDataSource = data => {
  const dataCopy = data.map(obj => {
    const objCopy = { ...obj };
    objCopy.date = obj.sub_date || obj.weeks || obj.months || obj.years || '';
    objCopy.conversionRate = (obj.conversionRate && Number(obj.conversionRate.split('%')[0])) || 0;
    return objCopy;
  });
  return dataCopy;
};

class Type1Chart extends Component {
  state = {
    width: 1000,
    height: 500,
    plotCfg: {
      margin: [20, 200, 200, 120],
    },
  };

  render() {
    const { width, height, plotCfg } = this.state;
    const { data, project } = this.props;
    let container = '';
    const followContent = (
      <React.Fragment>
        <Divider>关注量</Divider>
        <Line1
          data={(data && getDataSource(data)) || []}
          width={width}
          height={height}
          plotCfg={plotCfg}
          forceFit
        />
      </React.Fragment>
    );
    const registerContent = (
      <React.Fragment>
        <Divider>注册量</Divider>
        <Line2
          data={(data && getDataSource(data)) || []}
          width={width}
          height={height}
          plotCfg={plotCfg}
          forceFit
        />
      </React.Fragment>
    );
    const registerRateContent = (
      <React.Fragment>
        <Divider>注册转换率</Divider>
        <Line3
          data={(data && getDataSource(data)) || []}
          width={width}
          height={height}
          plotCfg={plotCfg}
          forceFit
        />
      </React.Fragment>
    );

    if (!project) {
      container = (
        <React.Fragment>
          {followContent}
          {registerContent}
          {registerRateContent}
        </React.Fragment>
      );
    } else if (project && project === 'fansCount') {
      container = <React.Fragment>{followContent}</React.Fragment>;
    } else if (project && project === 'regCount') {
      container = <React.Fragment>{registerContent}</React.Fragment>;
    } else if (project && project === 'conversionRate') {
      container = <React.Fragment>{registerRateContent}</React.Fragment>;
    }
    return container;
  }
}

export default Type1Chart;
