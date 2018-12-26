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
    // yearList.unshift(year.toString());
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

    //

    yearList.unshift({ date: endYear2, y: year });
    // yearList.unshift(year.toString());
  }
  return yearList;
};

function StatisticalMethods(props) {
  const { params, onParamsChange } = props;

  // const onEndYearChange = (value) => {
  //   console.log(value)
  //   onParamsChange(value, 'endTime')
  //   endyearArr = getYears(value)

  //   console.log(endyearArr)
  // }

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
      // const currentStart = moment(new Date().valueOf() - 2678400000).format('YYYY');
      // const currentEnd = moment(new Date().valueOf() - 86400000).format('YYYY');

      // 默认开始年份
      // const defaultStart = params.startTime.split('-').splice(0, 1);
      // defaultStart.push('01', '01');
      // const defaultStartTime = defaultStart.join('-');
      const defaultStartTime = params.startTime.split('-')[0];

      // 默认截止年份
      // const defaultEnd = params.endTime.split('-').splice(0, 1);
      // defaultEnd.push('12', '31');
      // const defaultEndTime = defaultEnd.join('-');
      const defaultEndTime = params.endTime.split('-')[0];

      // 开始年份
      // const startYear1 = currentStart.split('-').splice(0, 1);
      // startYear1.push('01', '01');
      // const startYear2 = startYear1.join('-');

      // const startYear3 = parseInt(startYear2.split('-')[0], 10);
      // const startyearArr = [{ date: startYear2, year: startYear3 }];
      const startyearArr = getStartYears();

      // console.log(startyearArr)

      // for (let i = 0; i < 20; i + 1) {
      //   startYear3 - 1;
      //   const startYear4 = [startYear3];
      //   startYear4.push('01', '01');
      //   const startYear5 = startYear4.join('-');
      //   startyearArr.push({ date: startYear5, year: startYear3 });
      // }

      // 截止年份
      // const endYear1 = currentEnd.split('-').splice(0, 1);
      // endYear1.push('12', '31');
      // const endYear2 = endYear1.join('-');

      // const endYear3 = parseInt(endYear2.split('-')[0], 10);
      // const endyearArr = [{ date: endYear2, year: endYear3 }];

      const defaultStartTime1 = parseInt(defaultStartTime, 10);

      const endyearArr = getEndYears(defaultStartTime1);

      // console.log(endyearArr);

      // console.log(endyearArr)

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
              // onChange={onEndYearChange}
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
