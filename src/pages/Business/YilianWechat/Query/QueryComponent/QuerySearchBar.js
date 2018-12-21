import React from 'react';
import { Input, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import classes from './QuerySearchBar.less';

function querySearchBar(props) {
  const {
    onAmountSet,
    onSearch,
    onReset,
    onExport,
    params: { startTime, endTime, name },
    onParamsChange,
    inputPlaceholder,
    amountSetShow,
  } = props;
  return (
    <Row>
      <Col span={15}>
        {/* <Select name="origin" value={source} className={classes.Gap} readOnly>
          <Select.Option value="wechat">微信</Select.Option>
        </Select> */}
        <DatePicker.RangePicker
          // className={classes.Gap}
          className={classes.Span}
          value={[moment(startTime, 'YYYY-MM-DD'), moment(endTime, 'YYYY-MM-DD')]}
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
        />
        <span className={classes.Span}>
          <Input
            name="name"
            value={name}
            onChange={e => onParamsChange(e.target.value, 'name')}
            placeholder={inputPlaceholder}
          />
        </span>
      </Col>
      <Col span={9} className={classes.ColRight}>
        <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
          查询
        </Button>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          重置
        </Button>
        {amountSetShow ? (
          <Button type="primary" htmlType="button" onClick={onAmountSet} className={classes.Gap}>
            月指标量
          </Button>
        ) : (
          ''
        )}
        <Button type="primary" htmlType="button" onClick={onExport} className={classes.Gap}>
          导出Excel
        </Button>
      </Col>
    </Row>
  );
}

export default querySearchBar;
