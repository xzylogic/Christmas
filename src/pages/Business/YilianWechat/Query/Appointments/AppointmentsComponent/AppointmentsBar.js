import React from 'react';
import { Input, Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import classes from './AppointmentsBar.less';

function AppointmentsBar(props) {
  const { onReset, onExport, params, onParamsChange, onSearch } = props;

  return (
    <Row className={classes.Container}>
      <Col span={24}>
        <Select
          className={classes.Gap}
          style={{ width: 115 }}
          // name='type'
          // value={params.type}
          onChange={value => onParamsChange(value, 'type')}
          defaultValue="create_time"
        >
          <Select.Option value="create_time">预约日期</Select.Option>
          <Select.Option value="schedule_date">就诊日期</Select.Option>
        </Select>
        <span>
          {/* 预约日期： */}
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
        </span>
        {/* <span className={classes.Span}>
          就诊日期：
          <DatePicker placeholder='就诊日期' />
        </span> */}
        <span className={classes.Span}>
          预约状态：
          <Select
            style={{ width: 115 }}
            className={classes.Gap}
            placeholder="预约状态"
            // defaultValue='0'
            onChange={value => onParamsChange(value, 'orderStatus')}
          >
            <Select.Option value="1">已预约</Select.Option>
            <Select.Option value="3">已撤销</Select.Option>
          </Select>
        </span>
        <span>
          预约来源：
          <Select
            style={{ width: 115 }}
            className={classes.Gap}
            placeholder="预约来源"
            // defaultValue='0'
            onChange={value => onParamsChange(value, 'regChannel')}
          >
            <Select.Option value="app">APP</Select.Option>
            <Select.Option value="wechat">微信服务号</Select.Option>
          </Select>
        </span>
      </Col>
      {/* <Col span={15}> */}
      <span className={classes.Span}>
        姓名：
        <Input
          name="patientName"
          value={params.patientName}
          onChange={e => onParamsChange(e.target.value, 'patientName')}
          placeholder="请输入患者姓名"
          className={classes.Input}
        />
      </span>
      <span className={classes.Span}>
        手机：
        <Input
          name="patientPhone"
          value={params.patientPhone}
          onChange={e => onParamsChange(e.target.value, 'patientPhone')}
          placeholder="请输入患者手机"
          className={classes.Input}
        />
      </span>
      <span className={classes.Span}>
        卡号：
        <Input
          name="mediCardId"
          value={params.mediCardId}
          onChange={e => onParamsChange(e.target.value, 'mediCardId')}
          placeholder="请输入患者卡号"
          className={classes.Input}
        />
      </span>
      <span className={classes.Span}>
        身份证号：
        <Input
          name="patientCardId"
          value={params.patientCardId}
          onChange={e => onParamsChange(e.target.value, 'patientCardId')}
          placeholder="请输入患者身份证号"
          className={classes.Input}
        />
      </span>
      <span className={classes.Span}>
        工号：
        <Input
          name="hosDocCode"
          value={params.hosDocCode}
          onChange={e => onParamsChange(e.target.value, 'hosDocCode')}
          placeholder="请输入医生工号"
          className={classes.Input}
        />
      </span>
      {/* </Col> */}
      {/* <Col span={8} className={classes.ColRight}> */}
      <span className={classes.BtnRight}>
        <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
          查询
        </Button>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport} className={classes.Gap}>
          导出Excel
        </Button>
      </span>
      {/* </Col> */}
    </Row>
  );
}

export default AppointmentsBar;
