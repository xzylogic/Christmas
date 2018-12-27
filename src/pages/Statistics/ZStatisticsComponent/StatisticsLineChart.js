import React, { Component } from 'react';
import createG2 from 'g2-react';
import { Slider, Divider, Row, Col, Button } from 'antd';

class StatisticsIntervalChart extends Component {
  state = {
    range: [0, 100],
    width: 1000,
    height: 500,
    plotCfg: {
      margin: [30, 80, 100, 80],
    },
  };

  componentWillMount() {
    const { data } = this.props;
    if (data.length > 31) {
      this.setState({
        range: [0, parseInt((31 * 100) / data.length, 10)],
      });
    } else {
      this.setState({
        range: [0, 100],
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data.length > 31) {
      this.setState({
        range: [0, parseInt((31 * 100) / data.length, 10)],
      });
    } else {
      this.setState({
        range: [0, 100],
      });
    }
  }

  getDataSource = (data, range, xKey) => {
    const dataCopy = data
      .slice(
        ((range[0] * data.length) / 100).toFixed(0),
        ((range[1] * data.length) / 100).toFixed(0)
      )
      .map(obj => ({
        ...obj,
        [xKey]: ` ${obj[xKey]}`,
      }));
    return dataCopy;
  };

  handleRangeChanged = value => {
    this.setState({ range: value });
  };

  handleRangeLeft = () => {
    const { range } = this.state;
    const gap = range[1] - range[0];
    const left = range[0] - gap;
    this.setState({
      range: [left < 0 ? 0 : left, range[0]],
    });
  };

  handleRangeRight = () => {
    const { range } = this.state;
    const gap = range[1] - range[0];
    const right = range[1] + gap;
    this.setState({
      range: [range[1], right > 100 ? 100 : right],
    });
  };

  render() {
    const { width, height, plotCfg, range } = this.state;
    const { data, xKey, yKey, yAlias, title } = this.props;

    const dataSource = (data && this.getDataSource(data, range, xKey)) || [];

    const Chart = createG2(chart => {
      chart.col(xKey, {
        alias: ' ',
      });
      chart.col(yKey, { alias: yAlias });
      chart
        .line()
        .position(`${xKey}*${yKey}`)
        .color('#36cfc9')
        .animate(false);
      chart
        .point()
        .position(`${xKey}*${yKey}`)
        .color('#36cfc9')
        .animate(false);
      chart.render();
    });

    return (
      <React.Fragment>
        <Divider>{title}</Divider>
        <Row style={{ margin: '0 80px 0 80px' }}>
          <Col span="2" style={{ textAlign: 'center' }}>
            <Button
              shape="circle"
              icon="arrow-left"
              onClick={this.handleRangeLeft}
              disabled={range[0] === 0}
            />
          </Col>
          <Col span="20">
            <Slider range value={range} onChange={this.handleRangeChanged} />
          </Col>
          <Col span="2" style={{ textAlign: 'center' }}>
            <Button
              shape="circle"
              icon="arrow-right"
              onClick={this.handleRangeRight}
              disabled={range[1] === 100}
            />
          </Col>
        </Row>
        <Chart data={dataSource} width={width} height={height} plotCfg={plotCfg} forceFit />
      </React.Fragment>
    );
  }
}

export default StatisticsIntervalChart;
