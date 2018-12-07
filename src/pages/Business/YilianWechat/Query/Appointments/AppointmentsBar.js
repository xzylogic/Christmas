import React from 'react';
import { Input, Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import classes from './AppointmentsBar.less';

function AppointmentsBar(props) {
  const {
    onReset,
    onExport,
    // params: { startTime, endTime, name, way },
    params: { startTime, endTime },
    onParamsChange,
    // inputPlaceholder,
  } = props;
  return (
    <Row className={classes.Container}>
      <Col span={24} className={classes.Container}>
        <span>
          统计方式：
          <Select name="origin" defaultValue="day" className={classes.Gap} readOnly>
            <Select.Option value="day">按日统计</Select.Option>
            <Select.Option value="week">按周统计</Select.Option>
            <Select.Option value="month">按月统计</Select.Option>
            <Select.Option value="year">按年统计</Select.Option>
          </Select>
        </span>
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
        <span className={classes.Span}>
          预约日期：
          <DatePicker placeholder="--请选择--" />
        </span>
        <span className={classes.Span}>
          就诊日期：
          <DatePicker placeholder="--请选择--" />
        </span>
        <span className={classes.Span}>
          预约状态：
          <Select
            name="origin"
            defaultValue="wuxiao"
            placeholder="全部"
            className={classes.Gap}
            readOnly
          >
            <Select.Option value="wuxiao">无效</Select.Option>
            <Select.Option value="order">预约</Select.Option>
            <Select.Option value="cancel">撤销</Select.Option>
          </Select>
        </span>
        <span>
          预约来源：
          <Select
            name="origin"
            defaultValue="wechat"
            placeholder="全部"
            className={classes.Gap}
            readOnly
          >
            <Select.Option value="app">APP</Select.Option>
            <Select.Option value="wechat">微信服务号</Select.Option>
            <Select.Option value="alypay">支付宝服务窗</Select.Option>
            <Select.Option value="window">窗口</Select.Option>
            <Select.Option value="self">自助机</Select.Option>
          </Select>
        </span>
        {/* <Input
          name="name"
          value={name}
          onChange={e => onParamsChange(e.target.value, 'name')}
          placeholder={inputPlaceholder}
          className={classes.Input}
        /> */}
      </Col>
      {/* <Col span={15}> */}
      <span className={classes.Span}>
        患者姓名：
        <Input className={classes.Input} />
      </span>
      <span className={classes.Span}>
        患者手机：
        <Input className={classes.Input} />
      </span>
      <span className={classes.Span}>
        患者卡号：
        <Input className={classes.Input} />
      </span>
      <span className={classes.Span}>
        身份证号：
        <Input className={classes.Input} />
      </span>
      <span className={classes.Span}>
        医生工号：
        <Input className={classes.Input} />
      </span>
      {/* </Col> */}
      {/* <Col span={8} className={classes.ColRight}> */}
      <span className={classes.BtnRight}>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          查询
        </Button>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport}>
          导出Excel
        </Button>
      </span>
      {/* </Col> */}
    </Row>
  );
}

export default AppointmentsBar;
