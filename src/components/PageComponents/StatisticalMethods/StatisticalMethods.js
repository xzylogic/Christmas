import React from 'react';
import { Select, DatePicker } from 'antd';
import moment from 'moment';
import classes from './StatisticalMethods.less';

const getStartYears = start => {
  const startYear = start || 1900;
  const thisYear = new Date().getFullYear();
  const yearList = [];
  for (let year = startYear; year <= thisYear; year += 1) {
    const startYear1 = [year];
    startYear1.push('01', '01');
    const startYear2 = startYear1.join('-');
    yearList.unshift({ date: startYear2, y: year });
  }
  return yearList;
};

const getEndYears = end => {
  const endYear = end;
  const thisYear = new Date().getFullYear();
  const yearList = [];
  for (let year = endYear; year <= thisYear; year += 1) {
    const endYear1 = [year];
    endYear1.push('12', '31');
    const endYear2 = endYear1.join('-');
    yearList.unshift({ date: endYear2, y: year });
  }
  return yearList;
};

const add = m => (m < 10 ? `0 + ${m}` : m);

const formDate = milliseconds => {
  // milliseconds是整数，否则要parseInt转换
  const time = new Date(milliseconds);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  return `${y}-${add(m)}-${add(d)}`;
};

function StatisticalMethods(props) {
  const { params, onParamsChange } = props;

  const disabledEndDate = current => {
    const currentStartTime = moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD');
    const chooseTime = new Date(params.startTime).getTime();
    const thirtyTime = formDate(chooseTime + 7776000000);
    if (currentStartTime < thirtyTime) {
      return (
        (current.format('YYYY-MM-DD') && current.format('YYYY-MM-DD') < params.startTime) ||
        (current.format('YYYY-MM-DD') && current.format('YYYY-MM-DD') > currentStartTime)
      );
    }
    return (
      (current.format('YYYY-MM-DD') && current.format('YYYY-MM-DD') < params.startTime) ||
      (current.format('YYYY-MM-DD') && current.format('YYYY-MM-DD') > thirtyTime)
    );
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
            disabledDate={disabledEndDate}
            value={moment(params.endTime, 'YYYY-MM-DD')}
            onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
          />
        </span>
      </span>
    );
    if (params.countType === 'week' || params.type === 'week' || params.type === '1') {
      content = (
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
    }
    if (params.countType === 'month' || params.type === 'month' || params.type === '2') {
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
    if (params.countType === 'year' || params.type === 'year' || params.type === '3') {
      let defaultStartTime = '';
      let defaultEndTime = '';

      if (params.startTime instanceof Object) {
        defaultStartTime = params.startTime.format('YYYY');
      } else {
        const times = params.startTime.split('-');
        const [firstTime] = times;
        defaultStartTime = firstTime;
      }

      if (params.endTime instanceof Object) {
        defaultEndTime = params.endTime.format('YYYY');
      } else {
        const times = params.endTime.split('-');
        const [firstTime] = times;
        defaultEndTime = firstTime;
      }

      const defaultStartTime1 = parseInt(defaultStartTime, 10);

      const startyearArr = getStartYears();
      const endyearArr = getEndYears(defaultStartTime1);

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
                <Select.Option key={item.y} value={item.date}>
                  {item.y}
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
                <Select.Option key={item.y} value={item.date}>
                  {item.y}
                </Select.Option>
              ))}
            </Select>
          </span>
        </span>
      );
    }
    return content;
  };

  return <span>{chooseTime()}</span>;
}

export default StatisticalMethods;
