import React from 'react';
import { Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import classes from './AppointmentsBar.less';

function AppointmentsBar(props) {
  const { onExport, allHosName, params, onParamsChange, onReset } = props;
  // console.log(allHosName)

  return (
    <Row className={classes.Container}>
      <Col span={24} className={classes.Container}>
        <span>
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
          医院类型：
          <Select
            placeholder="请选择推广地址"
            className={classes.Gap}
            // placeholder="组别"
            // onChange={value => onParamsChange(value, 'group')}
            // onChange={e => handleChange(e)}
            // defaultValue={allGroupName[0].name}
          >
            <Select.Option value="0">1组</Select.Option>
            <Select.Option value="1">2组</Select.Option>
            <Select.Option value="2">3组</Select.Option>
          </Select>
        </span>
        <span className={classes.Span}>
          医院名称：
          {allHosName instanceof Object ? (
            <Select
              className={classes.Gap}
              placeholder="医院名称"
              // onChange={value => onParamsChange(value, 'hosName')}
              defaultValue={allHosName[0].hos_name}
            >
              {allHosName.map(item => (
                <Select.Option id={item.id} key={item.id} value={item.hos_name}>
                  {item.hos_name}
                </Select.Option>
              ))}
            </Select>
          ) : (
            ''
          )}
        </span>
        <span className={classes.Span}>
          门诊类型：
          <Select
            placeholder="请选择推广地址"
            className={classes.Gap}
            // placeholder="组别"
            // onChange={value => onParamsChange(value, 'group')}
            // onChange={e => handleChange(e)}
            // defaultValue={allGroupName[0].name}
          >
            <Select.Option value="0">1组</Select.Option>
            <Select.Option value="1">2组</Select.Option>
            <Select.Option value="2">3组</Select.Option>
          </Select>
        </span>
      </Col>
      <span className={classes.Span}>
        预约渠道：
        <Select
          placeholder="请选择推广地址"
          className={classes.Gap}
          // placeholder="组别"
          // onChange={value => onParamsChange(value, 'group')}
          // onChange={e => handleChange(e)}
          // defaultValue={allGroupName[0].name}
        >
          <Select.Option value="0">1组</Select.Option>
          <Select.Option value="1">2组</Select.Option>
          <Select.Option value="2">3组</Select.Option>
        </Select>
      </span>
      <span className={classes.Span}>
        订单状态：
        <Select
          placeholder="请选择推广地址"
          className={classes.Gap}
          // placeholder="组别"
          // onChange={value => onParamsChange(value, 'group')}
          // onChange={e => handleChange(e)}
          // defaultValue={allGroupName[0].name}
        >
          <Select.Option value="0">1组</Select.Option>
          <Select.Option value="1">2组</Select.Option>
          <Select.Option value="2">3组</Select.Option>
        </Select>
      </span>

      <span className={classes.BtnRight}>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport}>
          导出Excel
        </Button>
      </span>
    </Row>
  );
}

export default AppointmentsBar;
