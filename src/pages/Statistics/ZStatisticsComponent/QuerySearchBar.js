import React from 'react';
import { Select, Button, DatePicker } from 'antd';
import moment from 'moment';

import classes from './QuerySearchBar.less';

// class QuerySearchBar extends Component {
// state = {
//   mode: 'date',
//   formatString: 'YYYY-MM-DD',
//   // open: false,
//   // counts: 0,
// }

// componentWillMount() {
//   const { params: { countType } } = this.props;
//   if (countType === 'day') {
//     this.setState({ mode: 'date', formatString: 'YYYY-MM-DD' });
//   } else if (countType === 'month') {
//     this.setState({ mode: 'month', formatString: 'YYYY-MM' });
//   } else if (countType === 'year') {
//     this.setState({ mode: 'year', formatString: 'YYYY' });
//   }
// }

// componentWillReceiveProps(nextProps) {
//   const { params: { countType } } = nextProps;
//   if (countType === 'day') {
//     this.setState({ mode: 'date', formatString: 'YYYY-MM-DD' });
//   } else if (countType === 'month') {
//     this.setState({ mode: 'month', formatString: 'YYYY-MM' });
//   } else if (countType === 'year') {
//     this.setState({ mode: 'year', formatString: 'YYYY' });
//   }
// }

// handlePanelChange = (value) => {
//   const { onParamsChange } = this.props;
//   const { counts } = this.state;
//   console.log(value[0].format('YYYY'))
//   console.log(value[1].format('YYYY'))
//   onParamsChange(value, 'date');
//   if (counts) {
//     this.setState({ counts: 0, open: false });
//   } else {
//     this.setState({ counts: 1 });
//   }
// }

// handleOpenChange = (state) => {
//   this.setState({ open: state });
// }

function querySearchBar(props) {
  const {
    onSearch,
    onReset,
    onExport,
    params: { countType, startDate, endDate, cityCode, orgId, isExclusive },
    onParamsChange,
    hospitals,
  } = props;
  // const { mode, formatString } = this.state;
  const mode = 'date';
  const formatString = 'YYYY-MM-DD';

  return (
    <div className={classes.Container}>
      <Select
        placeholder="统计方式"
        className={[classes.Gap, classes.Select].join(' ')}
        name="countType"
        value={countType}
        onChange={value => onParamsChange(value, 'countType')}
      >
        <Select.Option value="day">按日统计</Select.Option>
        <Select.Option value="month">按月统计</Select.Option>
        <Select.Option value="year">按年统计</Select.Option>
      </Select>
      <DatePicker.RangePicker
        className={classes.Gap}
        value={[startDate, endDate]}
        onChange={date => onParamsChange(date, 'date')}
        // onPanelChange={this.handlePanelChange}
        // onOpenChange={this.handleOpenChange}
        // open={open}
        allowClear={false}
        // format={formatString}
        mode={[mode, mode]}
        ranges={{
          最近一周: [
            moment(new Date(new Date().valueOf() - 691200000), formatString),
            moment(new Date(new Date().valueOf() - 86400000), formatString),
          ],
          最近30天: [
            moment(new Date(new Date().valueOf() - 2678400000), formatString),
            moment(new Date(new Date().valueOf() - 86400000), formatString),
          ],
          最近90天: [
            moment(new Date(new Date().valueOf() - 7862400000), formatString),
            moment(new Date(new Date().valueOf() - 86400000), formatString),
          ],
          最近一年: [
            moment(new Date(new Date().valueOf() - 31622400000), formatString),
            moment(new Date(new Date().valueOf() - 86400000), formatString),
          ],
        }}
      />
      {/* <span className={classes.Gap}>
            开始日期：
            <DatePicker
              format="YYYY-MM-DD"
              showToday={false}
              allowClear={false}
              value={moment(startDate, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startDate')}
            />
          </span>
          <span className={classes.Gap}>
            截止日期：
            <DatePicker
              defaultValue={moment('2018/01/01', 'YYYY-MM-DD')}
              format="YYYY-MM-DD"
              showToday={false}
              allowClear={false}
              value={moment(endDate, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endDate')}
            />
          </span> */}
      {hospitals ? (
        <React.Fragment>
          {/* <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            医院类型： */}
          <Select
            id="cityCode"
            placeholder="医院类型"
            className={[classes.Gap, classes.Select].join(' ')}
            name="cityCode"
            value={cityCode}
            onChange={value => onParamsChange(value, 'cityCode')}
          >
            <Select.Option value="">全部医院类型</Select.Option>
            <Select.Option value="zkyy">专科医院</Select.Option>
            <Select.Option value="zyyy">中医医院</Select.Option>
            <Select.Option value="zhyy">综合医院</Select.Option>
          </Select>
          {/* </span> */}
          {/* <span style={{display: 'inline-block', whiteSpace: 'nowrap'}}>
            医院名称： */}
          <Select
            placeholder="医院名称"
            className={[classes.Gap, classes.Hospital].join(' ')}
            name="orgId"
            value={orgId}
            onChange={value => onParamsChange(value, 'orgId')}
          >
            <Select.Option value="">全部医院</Select.Option>
            {hospitals.map(hospital => (
              <Select.Option key={hospital.hos_org_code} value={hospital.hos_org_code}>
                {hospital.hos_name}
              </Select.Option>
            ))}
          </Select>
          {/* </span> */}
          {/* <span style={{display: 'inline-block', whiteSpace: 'nowrap'}}>
            号源类型： */}
          <Select
            placeholder="号源类型"
            className={[classes.Gap, classes.Select].join(' ')}
            name="isExclusive"
            value={isExclusive}
            onChange={value => onParamsChange(value, 'isExclusive')}
          >
            <Select.Option value="">全部号源</Select.Option>
            <Select.Option value="0">独享</Select.Option>
            <Select.Option value="1">共享</Select.Option>
          </Select>
          {/* </span> */}
        </React.Fragment>
      ) : (
        ''
      )}
      <span className={classes.Span}>
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
    </div>
  );
}
// }

export default querySearchBar;
