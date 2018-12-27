import React from 'react';
import { Select, Button, Row } from 'antd';
import StatisticalMethods from '@/components/PageComponents/StatisticalMethods/StatisticalMethods';

import classes from './AppointmentsBar.less';

function AppointmentsBar(props) {
  const {
    onSearch,
    onReset,
    onExport,
    allHosName,
    params,
    onParamsChange,
    typeHosName,
    disabled,
  } = props;

  const renderHosName = () => {
    let content = '';
    if (typeHosName instanceof Object) {
      content = (
        <Select
          className={classes.Gap}
          style={{ width: 240 }}
          placeholder="医院名称"
          value={params.hosOrgCode}
          onChange={value => onParamsChange(value, 'hosOrgCode')}
        >
          {typeHosName.map(item => (
            <Select.Option id={item.hos_org_code} key={item.hos_org_code} value={item.hos_org_code}>
              {item.hos_name}
            </Select.Option>
          ))}
        </Select>
      );
    } else if (allHosName instanceof Object) {
      content = (
        <Select
          className={classes.Gap}
          style={{ width: 240 }}
          placeholder="医院名称"
          value={params.hosOrgCode}
          onChange={value => onParamsChange(value, 'hosOrgCode')}
        >
          {allHosName.map(item => (
            <Select.Option id={item.id} key={item.id} value={item.id}>
              {item.hos_name}
            </Select.Option>
          ))}
        </Select>
      );
    }
    return content;
  };

  return (
    <Row>
      {/* <Col> */}
      <Select
        className={classes.Span}
        name="countType"
        value={params.countType}
        onChange={value => onParamsChange(value, 'countType')}
      >
        <Select.Option value="day">按日统计</Select.Option>
        <Select.Option value="week">按周统计</Select.Option>
        <Select.Option value="month">按月统计</Select.Option>
        <Select.Option value="year">按年统计</Select.Option>
      </Select>
      <StatisticalMethods params={params} onParamsChange={onParamsChange} />
      <span className={classes.Span}>
        医院类型：
        <Select
          placeholder="医院类型"
          className={classes.Gap}
          style={{ width: 115 }}
          value={params.cityName}
          onChange={value => onParamsChange(value, 'cityName')}
        >
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="zkyy">专科医院</Select.Option>
          <Select.Option value="zhyy">综合医院</Select.Option>
          <Select.Option value="zyyy">中医医院</Select.Option>
        </Select>
      </span>
      <span className={classes.Span}>
        医院名称：
        {renderHosName()}
      </span>
      <span className={classes.Span}>
        门诊类型：
        <Select
          style={{ width: 80 }}
          placeholder="门诊类型"
          className={classes.Gap}
          value={params.visitLevelCode}
          onChange={value => onParamsChange(value, 'visitLevelCode')}
        >
          <Select.Option value="1">专家</Select.Option>
          <Select.Option value="2">专病</Select.Option>
          <Select.Option value="3">普通</Select.Option>
        </Select>
      </span>
      <span className={classes.Span}>
        预约渠道：
        <Select
          style={{ width: 140 }}
          placeholder="预约渠道"
          className={classes.Gap}
          value={params.regChannel}
          onChange={value => onParamsChange(value, 'regChannel')}
        >
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="wechat">医联微信</Select.Option>
          <Select.Option value="app">医联App</Select.Option>
          <Select.Option value="1" disabled={disabled}>
            电话
          </Select.Option>
          <Select.Option value="2" disabled={disabled}>
            健康云微信
          </Select.Option>
          <Select.Option value="3" disabled={disabled}>
            健康云APP
          </Select.Option>
          <Select.Option value="4" disabled={disabled}>
            医联预约平台
          </Select.Option>
          <Select.Option value="5" disabled={disabled}>
            预签家医
          </Select.Option>
          <Select.Option value="6" disabled={disabled}>
            普陀健康
          </Select.Option>
          <Select.Option value="7" disabled={disabled}>
            上海发布
          </Select.Option>
        </Select>
      </span>
      <span className={classes.Span}>
        订单状态：
        <Select
          style={{ width: 90 }}
          placeholder="订单状态"
          className={classes.Gap}
          value={params.orderStatus}
          onChange={value => onParamsChange(value, 'orderStatus')}
        >
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="1">正常</Select.Option>
          <Select.Option value="3">取消</Select.Option>
          <Select.Option value="5" disabled={disabled}>
            停诊
          </Select.Option>
          <Select.Option value="7" disabled={disabled}>
            改诊
          </Select.Option>
        </Select>
      </span>
      {/* </Col> */}
      <span className={classes.BtnRight}>
        <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Span}>
          查询
        </Button>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Span}>
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
