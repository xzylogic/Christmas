import React from 'react';
import { Select, Button, DatePicker } from 'antd';
import moment from 'moment';

import classes from '../PopularizationReport.less';

function type1SearchBar(props) {
  const { params, searchGroupList, onParamsChange, onReset, onExport, onSearch } = props;

  let options = '';
  if (searchGroupList && Array.isArray(searchGroupList)) {
    options = (
      <Select
        className={classes.Gap}
        name="groupName"
        value={params.groupName}
        onChange={value => onParamsChange(value, 'groupName')}
      >
        {searchGroupList.map(data => (
          <Select.Option key={data.id} value={data.name}>
            {data.name}
          </Select.Option>
        ))}
      </Select>
    );
  }

  const dateFormat = () => {
    let content = 'YYYY-MM-DD';
    if (params.countType === 'month' || params.countType === 'year') {
      content = 'YYYY-MM';
    }
    return content;
  };

  return (
    <div className={classes.Search}>
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
          format={dateFormat()}
          showToday={false}
          allowClear={false}
          value={moment(params.startTime, 'YYYY-MM-DD')}
          onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startTime')}
        />
      </span>
      <span className={classes.Span}>
        截止日期：
        <DatePicker
          format={dateFormat()}
          showToday={false}
          allowClear={false}
          value={moment(params.endTime, 'YYYY-MM-DD')}
          onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
        />
      </span>
      <span className={classes.Span}>{options}</span>
      <Select
        className={classes.Span}
        name="project"
        value={params.project}
        onChange={value => onParamsChange(value, 'project')}
        style={{ width: 120 }}
      >
        <Select.Option value="">全部</Select.Option>
        <Select.Option value="fansCount">关注量</Select.Option>
        <Select.Option value="regCount">注册量</Select.Option>
        <Select.Option value="conversionRate">注册转化率</Select.Option>
      </Select>
      <span className={classes.BtnRight}>
        <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
          查询
        </Button>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport}>
          导出
        </Button>
      </span>
    </div>
  );
}

export default type1SearchBar;
