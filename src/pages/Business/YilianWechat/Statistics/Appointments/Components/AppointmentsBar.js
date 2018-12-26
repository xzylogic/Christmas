import React from 'react';
import { Select, Button, DatePicker, Row } from 'antd';
import moment from 'moment';

import classes from './AppointmentsBar.less';

function AppointmentsBar(props) {
  const { onSearch, onReset, onExport, allHosName, params, onParamsChange, typeHosName } = props;

  const renderHosName = () => {
    let content = '';
    if (typeHosName instanceof Object) {
      content = (
        <Select
          className={classes.Gap}
          style={{ width: 150 }}
          placeholder="医院名称"
          value={params.hosOrgCode}
          onChange={value => onParamsChange(value, 'hosOrgCode')}
        >
          {typeHosName.map(item => (
            <Select.Option id={item.id} key={item.hos_name} value={item.hos_name}>
              {item.hos_name}
            </Select.Option>
          ))}
        </Select>
      );
    } else if (allHosName instanceof Object) {
      content = (
        <Select
          className={classes.Gap}
          style={{ width: 150 }}
          placeholder="医院名称"
          value={params.hosOrgCode}
          onChange={value => onParamsChange(value, 'hosOrgCode')}
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

  const chooseTime = () => {
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
    if (params.countType === 'month') {
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
    if (params.countType === 'year') {
      // 当前时间
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
      const startyearArr = [{ date: startYear2, year: startYear3 }];

      // const startyearArr = [];

      // let arr1 = Array.apply(null, { length: 20 });
      // arr1 = Object.keys(arr1);
      // arr1 = arr1.map(function(item) {
      //   const startYear4 = [startYear3 - item];

      //   startYear4.push('01', '01');

      //   const startYear5 = startYear4.join('-');

      //   startyearArr.push({ date: startYear5, year: startYear3 - item });

      //   return startyearArr[0];
      // });

      // for (let i = 0; i < 20; i + 1) {
      //   startYear3 - 1;
      //   let startYear4 = [startYear3];
      //   startYear4.push('01', '01');
      //   const startYear5 = startYear4.join('-');
      //   startyearArr.push({ date: startYear5, year: startYear3 });
      // }

      // 截止年份
      const endYear1 = currentEnd.split('-').splice(0, 1);
      endYear1.push('12', '31');
      const endYear2 = endYear1.join('-');

      const endYear3 = parseInt(endYear2.split('-')[0], 10);
      const endyearArr = [{ date: endYear2, year: endYear3 }];

      // const endyearArr = [];

      // let arr2 = Array.apply(null, { length: 20 });
      // arr2 = Object.keys(arr2);
      // arr2 = arr2.map(function(item) {
      //   const endYear4 = [endYear3 - item];

      //   endYear4.push('12', '31');

      //   const endYear5 = endYear4.join('-');

      //   endyearArr.push({ date: endYear5, year: endYear3 - item });

      //   return endyearArr[0];
      // });

      // for (let i = 0; i < 20; i+1) {
      //   endYear3 - 1;
      //   const endYear4 = [endYear3];
      //   endYear4.push('12', '31');
      //   const endYear5 = endYear4.join('-');
      //   endyearArr.push({ date: endYear5, year: endYear3 });
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
                <Select.Option key={item.year} value={item.date}>
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
                <Select.Option key={item.year} value={item.date}>
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

  return (
    <Row>
      {/* <Col> */}
      <Select
        className={classes.Span}
        name="countType"
        value={params.countType}
        onChange={value => onParamsChange(value, 'countType')}
      >
        <Select.Option value="day">按日统计</Select.Option>
        <Select.Option value="week">按周统计</Select.Option>
        <Select.Option value="month">按月统计</Select.Option>
        <Select.Option value="year">按年统计</Select.Option>
      </Select>
      {chooseTime()}
      <span className={classes.Span}>
        医院类型：
        <Select
          placeholder="医院类型"
          className={classes.Gap}
          style={{ width: 115 }}
          value={params.cityName}
          onChange={value => onParamsChange(value, 'cityName')}
        >
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="zkyy">专科医院</Select.Option>
          <Select.Option value="zhyy">综合医院</Select.Option>
          <Select.Option value="zyyy">中医医院</Select.Option>
        </Select>
      </span>
      <span className={classes.Span}>
        医院名称：
        {renderHosName()}
      </span>
      <span className={classes.Span}>
        门诊类型：
        <Select
          style={{ width: 115 }}
          placeholder="门诊类型"
          className={classes.Gap}
          value={params.visitLevelCode}
          onChange={value => onParamsChange(value, 'visitLevelCode')}
        >
          <Select.Option value="1">专家</Select.Option>
          <Select.Option value="2">专病</Select.Option>
          <Select.Option value="3">普通</Select.Option>
        </Select>
      </span>
      <span className={classes.Span}>
        预约渠道：
        <Select
          style={{ width: 115 }}
          placeholder="预约渠道"
          className={classes.Gap}
          value={params.regChannel}
          onChange={value => onParamsChange(value, 'regChannel')}
        >
          <Select.Option value="wechat">医联微信</Select.Option>
          <Select.Option value="app">医联App</Select.Option>
        </Select>
      </span>
      <span className={classes.Span}>
        订单状态：
        <Select
          style={{ width: 115 }}
          placeholder="订单状态"
          className={classes.Gap}
          value={params.orderStatus}
          onChange={value => onParamsChange(value, 'orderStatus')}
        >
          <Select.Option value="1">已预约</Select.Option>
          <Select.Option value="3">已取消</Select.Option>
        </Select>
      </span>
      {/* </Col> */}
      <span className={classes.BtnRight}>
        <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Span}>
          查询
        </Button>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Span}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport}>
          导出Excel
        </Button>
      </span>
    </Row>
  );
}

export default AppointmentsBar;
