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

class StatisticalMethods extends React.Component {
  handleChangeDayTime = value => {
    const { onParamsChange } = this.props;

    onParamsChange(value, 'startTime');

    let endTime = moment(new Date(value).valueOf() + 2592000000).format('YYYY-MM-DD');

    // 今天

    const currentTime = new Date().getTime();
    // console.log(currentTime)

    // 所选日期+30天（2592000000）
    const chooseTimeAdd30 = new Date(
      moment(new Date(value).valueOf() + 2592000000).format('YYYY-MM-DD')
    );

    if (chooseTimeAdd30 > currentTime) {
      endTime = moment(currentTime - 86400000).format('YYYY-MM-DD');
    }

    onParamsChange(endTime, 'endTime');
  };

  render() {
    const { params, onParamsChange } = this.props;

    // 开始时间
    const disabledStartDate = current => {
      const currentTime = moment(new Date().getTime());
      return current && current > currentTime;
    };

    // 截止时间
    const disabledEndDate = current => {
      // 当前时间
      const currentTime = new Date().getTime();

      // 开始可选时间
      const startChooseTime = new Date(params.startTime).getTime(); // 毫秒

      // 开始+90   （7776000000）
      const startChooseTimeAdd90 = startChooseTime + 7776000000; // 毫秒

      const startTime1 = moment(startChooseTime).format('YYYY-MM-DD');
      let endTime1 = moment(new Date().valueOf()).format('YYYY-MM-DD');

      if (currentTime > startChooseTimeAdd90) {
        endTime1 = moment(startChooseTimeAdd90).format('YYYY-MM-DD');
      }

      return (
        (current.format('YYYY-MM-DD') && current.format('YYYY-MM-DD') < startTime1) ||
        (current.format('YYYY-MM-DD') && current.format('YYYY-MM-DD') > endTime1)
      );
    };

    const chooseTime = () => {
      let content = '';
      if (params.countType === 'day' || params.type === 'day' || params.type === '0') {
        content = (
          <span>
            <span className={classes.Span}>
              开始日期：
              <DatePicker
                format="YYYY-MM-DD"
                showToday={false}
                allowClear={false}
                disabledDate={disabledStartDate}
                value={moment(params.startTime, 'YYYY-MM-DD')}
                onChange={(_, dateStrings) => this.handleChangeDayTime(dateStrings)}
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
      }
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
}

export default StatisticalMethods;
