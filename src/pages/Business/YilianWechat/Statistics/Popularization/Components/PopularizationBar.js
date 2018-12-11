import React from 'react';
import { Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

import classes from './PopularizationBar.less';

function PopularizationBar(props) {
  const { onExport, allHosName, allGroupName, params, onParamsChange, onReset } = props;
  // const { allHosNameArr } = this.state;

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
          组别：
          {allGroupName instanceof Object ? (
            <Select
              placeholder="请选择推广地址"
              className={classes.Gap}
              // placeholder="组别"
              defaultValue={allGroupName[0].name}
            >
              {allGroupName.map(item => (
                <Select.Option id={item.id} key={item.id} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          ) : (
            ''
          )}
        </span>
        <span className={classes.Span}>
          医院名称：
          {allHosName instanceof Object ? (
            <Select
              placeholder="请选择推广地址"
              className={classes.Gap}
              // placeholder="医院名称"
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
      </Col>
      {/* <Col span={15}> */}
      {/* </Col> */}
      {/* <Col span={8} className={classes.ColRight}> */}
      <span className={classes.Span}>
        数据来源：
        <Select
          style={{ width: 115 }}
          className={classes.Gap}
          placeholder="数据来源"
          value={params.orderStatus}
          // defaultValue='0'
          onChange={value => onParamsChange(value, 'orderStatus')}
        >
          <Select.Option value="0">医联微信</Select.Option>
          <Select.Option value="1">医联APP</Select.Option>
        </Select>
      </span>
      {params.orderStatus ? (
        <span className={classes.Span}>
          渠道：
          <span>
            {params.orderStatus === '0' ? (
              <Select
                style={{ width: 200 }}
                className={classes.Gap}
                placeholder="--请选择--"
                value={params.orderStatusWechat}
                onChange={value => onParamsChange(value, 'orderStatusWechat')}
              >
                <Select.Option value="0">申康医联二维码</Select.Option>
                <Select.Option value="1">医院二维码</Select.Option>
                <Select.Option value="2">员工个人二维码</Select.Option>
              </Select>
            ) : (
              <Select
                style={{ width: 200 }}
                className={classes.Gap}
                placeholder="--请选择--"
                value={params.orderStatusApp}
                onChange={value => onParamsChange(value, 'orderStatusApp')}
              >
                <Select.Option value="0">按员工工号分类</Select.Option>
              </Select>
            )}
          </span>
        </span>
      ) : (
        ''
      )}
      {/* <span className={classes.Span}>
        医院名称：
        {allHosName instanceof Object?<Select
          placeholder="请选择推广地址"
          className={classes.Gap}
          placeholder="医院名称"
          defaultValue={allHosName[0].hos_name}
        >
          {allHosName.map(item => (
            <Select.Option id={item.id} key={item.id} value={item.hos_name}>
              {item.hos_name}
            </Select.Option>
          ))}
        </Select>:''}
      </span>
      <span className={classes.Span}>
        组别：
        {allGroupName instanceof Object?<Select
          placeholder="请选择推广地址"
          className={classes.Gap}
          placeholder="医院名称"
          defaultValue={allGroupName[0].name}
        >
          {allGroupName.map(item => (
            <Select.Option id={item.id} key={item.id} value={item.name}>
              {item.name}
            </Select.Option>
          ))}
        </Select>:''}
      </span> */}

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

export default PopularizationBar;
