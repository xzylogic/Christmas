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

  const chooseTime = () => {
    let content = (
      <span>
        <span className={classes.Gap}>
          开始日期：
          <DatePicker
            format="YYYY-MM-DD"
            showToday={false}
            allowClear={false}
            value={moment(startDate, 'YYYY-MM-DD')}
            onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startTime')}
          />
        </span>
        <span className={classes.Gap}>
          截止日期：
          <DatePicker
            format="YYYY-MM-DD"
            showToday={false}
            allowClear={false}
            value={moment(endDate, 'YYYY-MM-DD')}
            onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
          />
        </span>
      </span>
    );
    if (countType === 'month') {
      content = (
        <span>
          <span className={classes.Gap}>
            开始月份：
            <DatePicker.MonthPicker
              format="YYYY-MM"
              showToday={false}
              allowClear={false}
              value={moment(startDate, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startTime')}
            />
          </span>
          <span className={classes.Gap}>
            截止月份：
            <DatePicker.MonthPicker
              format="YYYY-MM"
              showToday={false}
              allowClear={false}
              value={moment(endDate, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
            />
          </span>
        </span>
      );
    }
    if (countType === 'year') {
      const currentStart = moment(new Date().valueOf() - 2678400000).format('YYYY-MM-DD');
      const currentEnd = moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD');

      // 默认开始年份
      const defaultStart = currentStart.split('-').splice(0, 1);
      defaultStart.push('01', '01');
      const defaultStartTime = defaultStart.join('-');

      // 默认截止年份
      const defaultEnd = currentEnd.split('-').splice(0, 1);
      defaultEnd.push('12', '31');
      const defaultEndTime = defaultEnd.join('-');

      // 开始年份
      const startYear1 = currentStart.split('-').splice(0, 1);
      startYear1.push('01', '01');
      const startYear2 = startYear1.join('-');

      const startYear3 = parseInt(startYear2.split('-')[0], 10);
      const startyearArr = [{ id: startYear2, year: startYear3 }];

      // for (let i = 0; i < 20; i + 1) {
      //   startYear3 - 1;
      //   const startYear4 = [startYear3];
      //   startYear4.push('01', '01');
      //   const startYear5 = startYear4.join('-');
      //   startyearArr.push({ id: startYear5, year: startYear3 });
      // }

      // 截止年份
      const endYear1 = currentEnd.split('-').splice(0, 1);
      endYear1.push('12', '31');
      const endYear2 = endYear1.join('-');

      const endYear3 = parseInt(endYear2.split('-')[0], 10);
      const endyearArr = [{ id: endYear2, year: endYear3 }];

      // for (let i = 0; i < 20; i+1) {
      //   endYear3 - 1;
      //   const endYear4 = [endYear3];
      //   endYear4.push('12', '31');
      //   const endYear5 = endYear4.join('-');
      //   endyearArr.push({ id: endYear5, year: endYear3 });
      // }

      content = (
        <span>
          <span className={classes.Gap}>
            开始年份：
            <Select
              className={classes.Gap}
              style={{ width: 150 }}
              value={defaultStartTime}
              onChange={value => onParamsChange(value, 'startTime')}
            >
              {startyearArr.map(item => (
                <Select.Option key={item.year} value={item.id}>
                  {item.year}
                </Select.Option>
              ))}
            </Select>
          </span>
          <span className={classes.Gap}>
            截止年份：
            <Select
              className={classes.Gap}
              style={{ width: 150 }}
              value={defaultEndTime}
              onChange={value => onParamsChange(value, 'endTime')}
            >
              {endyearArr.map(item => (
                <Select.Option key={item.year} value={item.id}>
                  {item.year}
                </Select.Option>
              ))}
            </Select>
          </span>
        </span>
      );
    }
    return content;
  };

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
      {chooseTime()}
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
