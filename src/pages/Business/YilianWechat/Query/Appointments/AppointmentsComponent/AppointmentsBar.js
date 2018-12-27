import React from 'react';
import { Input, Select, Button, DatePicker, Row } from 'antd';
import moment from 'moment';

import classes from './AppointmentsBar.less';

function AppointmentsBar(props) {
  const { onReset, onExport, params, onParamsChange, onSearch, disabled } = props;

  return (
    <Row className={classes.Container}>
      {/* <Col> */}
      <Select
        className={classes.Gap}
        style={{ width: 115 }}
        onChange={value => onParamsChange(value, 'type')}
        value={params.type}
      >
        <Select.Option value="create_time">预约日期</Select.Option>
        <Select.Option value="schedule_date">就诊日期</Select.Option>
      </Select>
      <span>
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
      </span>
      <span className={classes.Span}>
        预约状态：
        <Select
          style={{ width: 115 }}
          className={classes.Gap}
          placeholder="预约状态"
          value={params.orderStatus}
          onChange={value => onParamsChange(value, 'orderStatus')}
        >
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="1">预约</Select.Option>
          <Select.Option value="3">撤销</Select.Option>
          <Select.Option value="5">无效</Select.Option>
        </Select>
      </span>
      {/* </Col>
      <Col> */}
      <span className={classes.Span}>
        预约来源：
        <Select
          style={{ width: 115 }}
          className={classes.Gap}
          placeholder="预约来源"
          value={params.regChannel}
          onChange={value => onParamsChange(value, 'regChannel')}
        >
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="app">APP</Select.Option>
          <Select.Option value="wechat">微信服务号</Select.Option>
          <Select.Option value="alipay" disabled={disabled}>
            支付宝服务窗
          </Select.Option>
          <Select.Option value="window" disabled={disabled}>
            窗口
          </Select.Option>
          <Select.Option value="machine" disabled={disabled}>
            自助机
          </Select.Option>
        </Select>
      </span>
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
      {/* <Col className={classes.ColRight}> */}
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
