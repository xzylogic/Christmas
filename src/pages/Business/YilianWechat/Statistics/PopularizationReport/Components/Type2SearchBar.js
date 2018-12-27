import React from 'react';
import { Button, DatePicker } from 'antd';
import moment from 'moment';

import classes from '../PopularizationReport.less';

function type2SearchBar(props) {
  const { params, onParamsChange, onReset, onExport, onSearch } = props;

  return (
    <div className={classes.Search}>
      {/* <Select
        className={classes.Gap}
        name="countType"
        value={params.countType}
        onChange={value => onParamsChange(value, 'countType')}
      >
        <Select.Option value="day">按日统计</Select.Option>
        <Select.Option value="week">按周统计</Select.Option>
        <Select.Option value="month">按月统计</Select.Option>
        <Select.Option value="year">按年统计</Select.Option>
      </Select> */}
      {/* <DatePicker.RangePicker
        className={classes.Span}
        value={[moment(params.startTime, 'YYYY-MM-DD'), moment(params.endTime, 'YYYY-MM-DD')]}
        onChange={(_, dateStrings) => onParamsChange(dateStrings, 'date')}
        allowClear={false}
        ranges={{
          最近一周: [
            moment(new Date(new Date().valueOf() - 691200000), 'YYYY-MM-DD'),
            moment(new Date(new Date().valueOf() - 86400000), 'YYYY-MM-DD'),
          ],
          最近30天: [
            moment(new Date(new Date().valueOf() - 2678400000), 'YYYY-MM-DD'),
            moment(new Date(new Date().valueOf() - 86400000), 'YYYY-MM-DD'),
          ],
          最近90天: [
            moment(new Date(new Date().valueOf() - 7862400000), 'YYYY-MM-DD'),
            moment(new Date(new Date().valueOf() - 86400000), 'YYYY-MM-DD'),
          ],
          最近一年: [
            moment(new Date(new Date().valueOf() - 31622400000), 'YYYY-MM-DD'),
            moment(new Date(new Date().valueOf() - 86400000), 'YYYY-MM-DD'),
          ],
        }}
      /> */}
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
          defaultValue={moment('2018/01/01', 'YYYY-MM-DD')}
          format="YYYY-MM-DD"
          showToday={false}
          allowClear={false}
          value={moment(params.endTime, 'YYYY-MM-DD')}
          onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
        />
      </span>
      <span className={classes.BtnRight}>
        <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
          查询
        </Button>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport}>
          导出报表
        </Button>
      </span>
    </div>
  );
}

export default type2SearchBar;
