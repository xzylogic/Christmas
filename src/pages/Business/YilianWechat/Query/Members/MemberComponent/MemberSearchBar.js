import React from 'react';
import { Select, Button, DatePicker } from 'antd';
import moment from 'moment';

import classes from '../Members.less';

function memberSearchBar(props) {
  const { params, onParamsChange, onReset } = props;

  return (
    <div className={classes.Search}>
      <Select
        className={classes.Gap}
        name="type"
        value={params.type}
        onChange={value => onParamsChange(value, 'type')}
      >
        <Select.Option value="0">按日统计</Select.Option>
        <Select.Option value="1">按周统计</Select.Option>
        <Select.Option value="2">按月统计</Select.Option>
        <Select.Option value="3">按年统计</Select.Option>
      </Select>
      <DatePicker.RangePicker
        className={classes.Gap}
        value={[moment(params.startTime, 'YYYY-MM-DD'), moment(params.endTime, 'YYYY-MM-DD')]}
        onChange={(_, dateStrings) => onParamsChange(dateStrings, 'date')}
        allowClear={false}
        ranges={{
          最近一周: [
            moment(new Date(new Date().valueOf() - 604800000), 'YYYY-MM-DD'),
            moment(new Date(), 'YYYY-MM-DD'),
          ],
          最近30天: [
            moment(new Date(new Date().valueOf() - 2592000000), 'YYYY-MM-DD'),
            moment(new Date(), 'YYYY-MM-DD'),
          ],
          最近一年: [
            moment(new Date(new Date().valueOf() - 31536000000), 'YYYY-MM-DD'),
            moment(new Date(), 'YYYY-MM-DD'),
          ],
        }}
      />
      <Button type="primary" htmlType="button" onClick={onReset}>
        重置
      </Button>
    </div>
  );
}

export default memberSearchBar;
