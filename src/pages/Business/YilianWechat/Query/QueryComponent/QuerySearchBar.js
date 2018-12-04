import React from 'react';
import { Input, Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import classes from './QuerySearchBar.less';

function querySearchBar(props) {
  const {
    onAmountSet,
    onReset,
    onExport,
    params: { startTime, endTime, name, source },
    onParamsChange,
    inputPlaceholder,
  } = props;
  return (
    <Row className={classes.Container}>
      <Col span={16}>
        <Select name="origin" value={source} className={classes.Gap} readOnly>
          <Select.Option value="wechat">微信</Select.Option>
        </Select>
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
        <Input
          name="name"
          value={name}
          onChange={e => onParamsChange(e.target.value, 'name')}
          placeholder={inputPlaceholder}
          className={classes.Input}
        />
      </Col>
      <Col span={8} className={classes.ColRight}>
        <Button type="primary" htmlType="button" onClick={onAmountSet} className={classes.Gap}>
          月指标量
        </Button>
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

export default querySearchBar;
