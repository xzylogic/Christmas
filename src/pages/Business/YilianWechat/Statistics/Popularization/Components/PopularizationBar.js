import React from 'react';
import { Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import classes from './PopularizationBar.less';

class PopularizationBar extends React.Component {
  handleChooseTime = () => {
    const { params, onParamsChange } = this.props;
    let content = (
      <span>
        <span className={classes.Span}>
          开始日期：
          <DatePicker
            format="YYYY-MM-DD"
            showToday={false}
            allowClear={false}
            value={moment(params.startTime, 'YYYY-MM-DD')}
            onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startTime')}
          />
        </span>
        <span className={classes.Span}>
          截止日期：
          <DatePicker
            format="YYYY-MM-DD"
            showToday={false}
            allowClear={false}
            value={moment(params.endTime, 'YYYY-MM-DD')}
            onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
          />
        </span>
      </span>
    );
    if (params.type === 'month') {
      content = (
        <span>
          <span className={classes.Span}>
            开始月份：
            <DatePicker.MonthPicker
              format="YYYY-MM"
              showToday={false}
              allowClear={false}
              value={moment(params.startTime, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startTime')}
            />
          </span>
          <span className={classes.Span}>
            截止月份：
            <DatePicker.MonthPicker
              format="YYYY-MM"
              showToday={false}
              allowClear={false}
              value={moment(params.endTime, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
            />
          </span>
        </span>
      );
    }
    if (params.type === 'year') {
      const currentStart = moment(new Date().valueOf() - 2678400000).format('YYYY-MM-DD');
      const currentEnd = moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD');

      // 默认开始年份
      const defaultStart = params.startTime.split('-').splice(0, 1);
      defaultStart.push('01', '01');
      const defaultStartTime = defaultStart.join('-');

      // 默认截止年份
      const defaultEnd = params.endTime.split('-').splice(0, 1);
      defaultEnd.push('12', '31');
      const defaultEndTime = defaultEnd.join('-');

      // 开始年份
      const startYear1 = currentStart.split('-').splice(0, 1);
      startYear1.push('01', '01');
      const startYear2 = startYear1.join('-');

      const startYear3 = parseInt(startYear2.split('-')[0], 10);
      const startyearArr = [{ id: startYear2, year: startYear3 }];

      // for (let i = 0; i < 20; i + 1) {
      //   startYear3 - 1;
      //   const startYear4 = [startYear3];
      //   startYear4.push('01', '01');
      //   const startYear5 = startYear4.join('-');
      //   startyearArr.push({ id: startYear5, year: startYear3 });
      // }

      // 截止年份
      const endYear1 = currentEnd.split('-').splice(0, 1);
      endYear1.push('12', '31');
      const endYear2 = endYear1.join('-');

      const endYear3 = parseInt(endYear2.split('-')[0], 10);
      const endyearArr = [{ id: endYear2, year: endYear3 }];

      // for (let i = 0; i < 20; i+1) {
      //   endYear3 - 1;
      //   const endYear4 = [endYear3];
      //   endYear4.push('12', '31');
      //   const endYear5 = endYear4.join('-');
      //   endyearArr.push({ id: endYear5, year: endYear3 });
      // }

      content = (
        <span>
          <span className={classes.Span}>
            开始年份：
            <Select
              className={classes.Gap}
              style={{ width: 150 }}
              value={defaultStartTime}
              onChange={value => onParamsChange(value, 'startTime')}
            >
              {startyearArr.map(item => (
                <Select.Option key={item.year} value={item.id}>
                  {item.year}
                </Select.Option>
              ))}
            </Select>
          </span>
          <span className={classes.Span}>
            截止年份：
            <Select
              className={classes.Gap}
              style={{ width: 150 }}
              value={defaultEndTime}
              onChange={value => onParamsChange(value, 'endTime')}
            >
              {endyearArr.map(item => (
                <Select.Option key={item.year} value={item.id}>
                  {item.year}
                </Select.Option>
              ))}
            </Select>
          </span>
        </span>
      );
    }
    return content;
  };

  render() {
    const {
      onSearch,
      onReset,
      onExport,
      allHosName,
      allGroupName,
      params,
      onParamsChange,
      groupHosName,
      onChangeWay,
    } = this.props;

    const renderHosName = () => {
      let content = '';
      if (groupHosName instanceof Object && Object.keys(groupHosName).length > 0) {
        content = (
          <Select
            className={classes.Gap}
            style={{ width: 115 }}
            placeholder="医院名称"
            onChange={value => onParamsChange(value, 'hosName')}
            value={params.hosName}
          >
            {groupHosName.map(item => (
              <Select.Option id={item.id} key={item.id} value={item.hos_name}>
                {item.hos_name}
              </Select.Option>
            ))}
          </Select>
        );
      } else if (allHosName instanceof Object) {
        content = (
          <Select
            className={classes.Gap}
            style={{ width: 115 }}
            placeholder="医院名称"
            onChange={value => onParamsChange(value, 'hosName')}
            value={params.hosName}
          >
            {allHosName.map(item => (
              <Select.Option id={item.id} key={item.id} value={item.hos_name}>
                {item.hos_name}
              </Select.Option>
            ))}
          </Select>
        );
      }
      return content;
    };

    return (
      <Row>
        <Col span={24}>
          <Select className={classes.Span} onChange={onChangeWay} value={params.type}>
            <Select.Option value="day">按日统计</Select.Option>
            <Select.Option value="week">按周统计</Select.Option>
            <Select.Option value="month">按月统计</Select.Option>
            <Select.Option value="year">按年统计</Select.Option>
          </Select>
          {this.handleChooseTime()}
          <span className={classes.Span}>
            组别：
            {allGroupName instanceof Object ? (
              <Select
                className={classes.Gap}
                style={{ width: 115 }}
                placeholder="组别"
                onChange={value => onParamsChange(value, 'group')}
                value={params.group}
                defaultValue={allGroupName[0].name}
              >
                {allGroupName.map(item => (
                  <Select.Option id={item.id} key={item.id} value={item.id.toString()}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              ''
            )}
          </span>
        </Col>
        {/* <Col span={15}> */}
        {/* </Col> */}
        {/* <Col span={8} className={classes.ColRight}> */}
        <span className={classes.Span}>
          医院名称：
          {renderHosName()}
        </span>
        <span className={classes.Span}>
          数据来源：
          <Select
            style={{ width: 115 }}
            className={classes.Gap}
            placeholder="数据来源"
            value={params.channel}
            // defaultValue='0'
            onChange={value => onParamsChange(value, 'channel')}
          >
            <Select.Option value="微信">医联微信</Select.Option>
            <Select.Option value="app">医联APP</Select.Option>
          </Select>
        </span>
        {params.channel ? (
          <span className={classes.Span}>
            渠道：
            <span>
              {params.channel === '微信' ? (
                <Select
                  style={{ width: 200 }}
                  className={classes.Gap}
                  placeholder="--请选择--"
                  value={params.orderStatusWechat}
                  onChange={value => onParamsChange(value, 'orderStatusWechat')}
                >
                  <Select.Option value="0">申康医联二维码</Select.Option>
                  <Select.Option value="1">医院二维码</Select.Option>
                  <Select.Option value="2">员工个人二维码</Select.Option>
                </Select>
              ) : (
                <Select
                  style={{ width: 200 }}
                  className={classes.Gap}
                  placeholder="--请选择--"
                  value={params.orderStatusApp}
                  onChange={value => onParamsChange(value, 'orderStatusApp')}
                >
                  <Select.Option value="0">按员工工号分类</Select.Option>
                </Select>
              )}
            </span>
          </span>
        ) : (
          ''
        )}

        <span className={classes.BtnRight}>
          <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
            查询
          </Button>
          <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
            重置
          </Button>
          <Button type="primary" htmlType="button" onClick={onExport}>
            导出Excel
          </Button>
        </span>
        {/* </Col> */}
      </Row>
    );
  }
}

export default PopularizationBar;
