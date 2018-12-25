import React from 'react';
import { Input, Button, DatePicker, Row, Col, Select } from 'antd';
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
    allGroupName,
  } = props;

  return (
    <Row>
      <Col span={15}>
        {/* <DatePicker.RangePicker
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
        /> */}
        <span className={classes.Span}>
          开始日期：
          <DatePicker
            format="YYYY-MM-DD"
            showToday={false}
            allowClear={false}
            value={moment(startTime, 'YYYY-MM-DD')}
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
            value={moment(endTime, 'YYYY-MM-DD')}
            onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
          />
        </span>
        <span className={classes.Span}>
          {allGroupName instanceof Object ? (
            <Select
              style={{ width: 100 }}
              name="name"
              value={name}
              onChange={value => onParamsChange(value, 'name')}
            >
              <Select.Option value="">全部小组</Select.Option>
              {allGroupName.names.map(item => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <Input
              name="name"
              value={name}
              onChange={e => onParamsChange(e.target.value, 'name')}
              placeholder={inputPlaceholder}
            />
          )}
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
