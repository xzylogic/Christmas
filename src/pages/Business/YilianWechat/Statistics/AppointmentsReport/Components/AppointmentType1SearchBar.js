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
          最近90天: [
            moment(new Date(new Date().valueOf() - 7776000000), 'YYYY-MM-DD'),
            moment(new Date(), 'YYYY-MM-DD'),
          ],
          最近一年: [
            moment(new Date(new Date().valueOf() - 31536000000), 'YYYY-MM-DD'),
            moment(new Date(), 'YYYY-MM-DD'),
          ],
        }}
      />
      <span>
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
          导出
        </Button>
      </span>
    </div>
  );
}

export default AppointmentType1SearchBar;
