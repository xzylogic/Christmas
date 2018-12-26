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

function StatisticalMethods(props) {
  const { params, onParamsChange } = props;

  const chooseTime = () => {
    let content = (
      <span>
        <span className={classes.Span}>
          开始日期：
          <DatePicker
            format="YYYY-MM-DD"
            showToday={false}
            allowClear={false}
            value={moment(params.startDate, 'YYYY-MM-DD')}
            onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startDate')}
          />
        </span>
        <span className={classes.Span}>
          截止日期：
          <DatePicker
            format="YYYY-MM-DD"
            showToday={false}
            allowClear={false}
            value={moment(params.endDate, 'YYYY-MM-DD')}
            onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endDate')}
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
              value={moment(params.startDate, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startDate')}
            />
          </span>
          <span className={classes.Span}>
            截止月份：
            <DatePicker.MonthPicker
              format="YYYY-MM"
              showToday={false}
              allowClear={false}
              value={moment(params.endDate, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endDate')}
            />
          </span>
        </span>
      );
    }
    if (params.countType === 'year') {
      // 默认起止日期

      // console.log(params)
      // const defaultStartTime = params.startDate.format('YYYY')  || params.startDate.split('-')[0];
      // const defaultEndTime = params.startDate.format('YYYY') || params.endDate.split('-')[0];

      // const defaultStartTime = ;
      // const defaultEndTime = params.endDate.split('-')[0];
      const defaultStartTime = '2018';
      const defaultEndTime = '2018';

      // console.log(params.startDate.format('YYYY-MM-DD'))

      // const defaultStartTime1 = parseInt(defaultStartTime, 10);

      const startyearArr = getStartYears();
      // const endyearArr = getEndYears(defaultStartTime1);
      const endyearArr = getEndYears(1990);

      content = (
        <span>
          <span className={classes.Span}>
            开始年份：
            <Select
              className={classes.Gap}
              style={{ width: 150 }}
              value={defaultStartTime}
              onChange={value => onParamsChange(value, 'startDate')}
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
              onChange={value => onParamsChange(value, 'endDate')}
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
