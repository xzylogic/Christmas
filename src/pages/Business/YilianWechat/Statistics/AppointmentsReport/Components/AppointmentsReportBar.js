import React from 'react';
import { Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import classes from '../../../Query/QueryComponent/QuerySearchBar.less';

function AppointmentsReportBar(props) {
  const {
    allGroupName,
    onReset,
    onExport,
    params: { startTime, endTime, groupId },
    onParamsChange,
  } = props;
  return (
    <Row className={classes.Container}>
      <Col span={16}>
        <DatePicker.RangePicker
          className={classes.Gap}
          value={[moment(startTime, 'YYYY-MM-DD'), moment(endTime, 'YYYY-MM-DD')]}
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
        {allGroupName instanceof Object ? (
          <Select
            className={classes.Gap}
            style={{ width: 115 }}
            onChange={value => onParamsChange(value, 'groupId')}
            placeholder="请选择小组"
            value={groupId}
            // defaultValue='3组'
          >
            {allGroupName.map(item => (
              <Select.Option id={item.id} key={item.id} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        ) : (
          ''
        )}
      </Col>
      <Col span={8} className={classes.ColRight}>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport}>
          导出Excel
        </Button>
      </Col>
    </Row>
  );
}

export default AppointmentsReportBar;
