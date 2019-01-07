import React from 'react';
import { Select, Button, DatePicker } from 'antd';
import moment from 'moment';

import classes from '../AppointmentsReport.less';

function AppointmentType1SearchBar(props) {
  const { params, searchGroupList, onParamsChange, onReset, onExport, onSearch } = props;

  let options = '';
  if (searchGroupList && Array.isArray(searchGroupList)) {
    options = (
      <Select
        className={classes.Gap}
        style={{ width: 100 }}
        name="groupName"
        value={params.groupName}
        onChange={value => onParamsChange(value, 'groupName')}
      >
        <Select.Option value="">全部</Select.Option>
        {searchGroupList.map(data => (
          <Select.Option key={data.id} value={data.name}>
            {data.name}
          </Select.Option>
        ))}
      </Select>
    );
  }

  return (
    <div className={classes.Search}>
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
      <span className={classes.Span}>
        小组：
        {options}
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

export default AppointmentType1SearchBar;
