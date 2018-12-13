import React from 'react';
import { Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

// import classes from '../../../Query/QueryComponent/QuerySearchBar.less';
import classes from '../AppointmentsReport.less';

function AppointmentsReportBar(props) {
  const {
    allGroupName,
    onReset,
    onExport,
    params: { startTime, endTime, groupId },
    onParamsChange,
    onSearch,
  } = props;

  return (
    <Row className={classes.Container}>
      <div className={classes.Search}>
        <Select
          className={classes.Gap}
          // name="groupName"
          // value={reportType}
          // onChange={value => onUpdateReportType(value)}
          defaultValue="1"
          style={{ width: '100%' }}
        >
          <Select.Option value="1">
            按小组统计医院明细（微信关注量、注册量、注册转化率总量对比）
          </Select.Option>
          {/* <Select.Option value={POPULARIZATION_REPORT_TYPE.TYPE2}>
                按小组（微信关注量、注册量、注册转化率）总量统计
              </Select.Option>
              <Select.Option value={POPULARIZATION_REPORT_TYPE.TYPE3}>
                按所有医院（微信关注量、注册量、注册转化率）总量统计
              </Select.Option>
              <Select.Option value={POPULARIZATION_REPORT_TYPE.TYPE4}>
                微信关注量、注册量、注册转化率日数据（根据小组统计）
              </Select.Option> */}
        </Select>
      </div>
      <Col span={16}>
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
        {allGroupName instanceof Object ? (
          <span>
            组别：
            <Select
              className={classes.Gap}
              style={{ width: 115 }}
              onChange={value => onParamsChange(value, 'groupId')}
              placeholder="请选择小组"
              value={groupId}
              defaultValue={allGroupName[0].name}
            >
              {allGroupName.map(item => (
                <Select.Option id={item.id} key={item.id} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </span>
        ) : (
          ''
        )}
      </Col>
      <Col span={8} className={classes.ColRight}>
        <span className={classes.BtnRight}>
          <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
            查询
          </Button>
          <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
            重置
          </Button>
          <Button type="primary" htmlType="button" onClick={onExport}>
            导出
          </Button>
        </span>
        {/* <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport}>
          导出Excel
        </Button> */}
      </Col>
    </Row>
  );
}

export default AppointmentsReportBar;
