import React from 'react';
import { Input, Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import classes from './AppointmentsBar.less';

function AppointmentsBar(props) {
  const { onReset, onExport, params, onParamsChange } = props;
  // const handleChange = value =>{
  //   console.log(value)
  // }
  return (
    <Row className={classes.Container}>
      <Col span={24} className={classes.Container}>
        <Select
          className={classes.Gap}
          style={{ width: 115 }}
          // name='type'
          // value={params.type}
          // onChange={value => onParamsChange(value, 'type')}
          placeholder="统计方式"
        >
          <Select.Option value="0">按日统计</Select.Option>
          <Select.Option value="1">按周统计</Select.Option>
          <Select.Option value="2">按月统计</Select.Option>
          <Select.Option value="3">按年统计</Select.Option>
        </Select>
        <span>
          预约日期：
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
        <span className={classes.Span}>
          就诊日期：
          <DatePicker placeholder="就诊日期" />
        </span>
        <span className={classes.Span}>
          预约状态：
          <Select
            style={{ width: 115 }}
            className={classes.Gap}
            placeholder="预约状态"
            // defaultValue='0'
            onChange={value => onParamsChange(value, 'orderStatus')}
          >
            <Select.Option value="0">全部</Select.Option>
            <Select.Option value="1">无效</Select.Option>
            <Select.Option value="2">预约</Select.Option>
            <Select.Option value="3">撤销</Select.Option>
          </Select>
        </span>
        <span>
          预约来源：
          <Select
            style={{ width: 115 }}
            className={classes.Gap}
            placeholder="预约来源"
            // defaultValue='0'
            onChange={value => onParamsChange(value, 'orderChannel')}
          >
            <Select.Option value="0">全部</Select.Option>
            <Select.Option value="1">APP</Select.Option>
            <Select.Option value="2">微信服务号</Select.Option>
            <Select.Option value="3">支付宝服务窗</Select.Option>
            <Select.Option value="4">窗口</Select.Option>
            <Select.Option value="5">自助机</Select.Option>
          </Select>
        </span>
      </Col>
      {/* <Col span={15}> */}
      <span className={classes.Span}>
        患者姓名：
        <Input
          name="patientName"
          value={params.patientName}
          onChange={e => onParamsChange(e.target.value, 'patientName')}
          placeholder="请输入患者姓名"
          className={classes.Input}
        />
      </span>
      <span className={classes.Span}>
        患者手机：
        <Input
          name="patientPhone"
          value={params.patientPhone}
          onChange={e => onParamsChange(e.target.value, 'patientPhone')}
          placeholder="请输入患者手机"
          className={classes.Input}
        />
      </span>
      <span className={classes.Span}>
        患者卡号：
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
        医生工号：
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
        {/* <Button type='primary' htmlType='button' onClick={onReset} className={classes.Gap}>
            查询
          </Button> */}
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
