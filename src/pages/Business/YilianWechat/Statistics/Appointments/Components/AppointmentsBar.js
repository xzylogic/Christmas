import React from 'react';
import { Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import classes from './AppointmentsBar.less';

function AppointmentsBar(props) {
  const { onSearch, onReset, onExport, allHosName, params, onParamsChange, typeHosName } = props;

  const renderHosName = () => {
    let content = '';
    if (typeHosName instanceof Object) {
      content = (
        <Select
          className={classes.Gap}
          style={{ width: 115 }}
          placeholder="医院名称"
          value={params.hosOrgCode}
          onChange={value => onParamsChange(value, 'hosOrgCode')}
        >
          {typeHosName.map(item => (
            <Select.Option id={item.id} key={item.id} value={item.hos_name}>
              {item.hos_name}
            </Select.Option>
          ))}
        </Select>
      );
    } else if (allHosName instanceof Object) {
      content = (
        <Select
          className={classes.Gap}
          style={{ width: 115 }}
          placeholder="医院名称"
          value={params.hosOrgCode}
          onChange={value => onParamsChange(value, 'hosOrgCode')}
        >
          {allHosName.map(item => (
            <Select.Option id={item.id} key={item.id} value={item.hos_name}>
              {item.hos_name}
            </Select.Option>
          ))}
        </Select>
      );
    }
    return content;
  };

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
            placeholder="医院类型"
            className={classes.Gap}
            style={{ width: 115 }}
            value={params.cityName}
            onChange={value => onParamsChange(value, 'cityName')}
          >
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value="专科医院">专科医院</Select.Option>
            <Select.Option value="综合医院">综合医院</Select.Option>
            <Select.Option value="中医医院">中医医院</Select.Option>
          </Select>
        </span>
        <span className={classes.Span}>
          医院名称：
          {renderHosName()}
          {/* {typeHosName instanceof Object ? (
            <Select
              className={classes.Gap}
              style={{ width: 115 }}
              placeholder="医院名称"
              value={params.hosOrgCode}
              onChange={value => onParamsChange(value, 'hosOrgCode')}
            >
              {typeHosName.map(item => (
                <Select.Option id={item.id} key={item.id} value={item.hos_name}>
                  {item.hos_name}
                </Select.Option>
              ))}
            </Select>
          ) : allHosName instanceof Object ? (
            <Select
              className={classes.Gap}
              style={{ width: 115 }}
              placeholder="医院名称"
              value={params.hosOrgCode}
              onChange={value => onParamsChange(value, 'hosOrgCode')}
            >
              {allHosName.map(item => (
                <Select.Option id={item.id} key={item.id} value={item.hos_name}>
                  {item.hos_name}
                </Select.Option>
              ))}
            </Select>
          ) : (
            ''
          )} */}
        </span>
        <span className={classes.Span}>
          门诊类型：
          <Select
            style={{ width: 115 }}
            placeholder="门诊类型"
            className={classes.Gap}
            value={params.visitLevelCode}
            onChange={value => onParamsChange(value, 'visitLevelCode')}
            // defaultValue={allGroupName[0].name}
          >
            <Select.Option value="1">专家</Select.Option>
            <Select.Option value="2">专病</Select.Option>
            <Select.Option value="3">普通</Select.Option>
          </Select>
        </span>
      </Col>
      <span className={classes.Span}>
        预约渠道：
        <Select
          style={{ width: 115 }}
          placeholder="预约渠道"
          className={classes.Gap}
          value={params.regChannel}
          onChange={value => onParamsChange(value, 'regChannel')}
          // onChange={e => handleChange(e)}
          // defaultValue={allGroupName[0].name}
        >
          <Select.Option value="wechat">医联微信</Select.Option>
          <Select.Option value="app">医联App</Select.Option>
        </Select>
      </span>
      <span className={classes.Span}>
        订单状态：
        <Select
          style={{ width: 115 }}
          placeholder="订单状态"
          className={classes.Gap}
          value={params.orderStatus}
          onChange={value => onParamsChange(value, 'orderStatus')}
          // onChange={e => handleChange(e)}
          // defaultValue={allGroupName[0].name}
        >
          <Select.Option value="1">已预约</Select.Option>
          <Select.Option value="3">已取消</Select.Option>
        </Select>
      </span>

      <span className={classes.BtnRight}>
        <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
          查询
        </Button>
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
