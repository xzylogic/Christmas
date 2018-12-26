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
    // onChangeWay,
    inputPlaceholder,
    amountSetShow,
    allGroupName,
    // params,
  } = props;

  return (
    <Row>
      <Col span={15}>
        {/* <Select
        className={classes.Span}
        name="countType"
        value={params.countType}
        // onChange={onChangeWay}
        onChange={value => onParamsChange(value, 'countType')}
      >
        <Select.Option value="day">按日统计</Select.Option>
        <Select.Option value="week">按周统计</Select.Option>
        <Select.Option value="month">按月统计</Select.Option>
        <Select.Option value="year">按年统计</Select.Option>
      </Select> */}
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
