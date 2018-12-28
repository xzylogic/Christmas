import React from 'react';
import { Button, DatePicker } from 'antd';
import moment from 'moment';

import classes from '../PopularizationReport.less';

function type2SearchBar(props) {
  const { params, onParamsChange, onReset, onExport, onSearch } = props;

  return (
    <div className={classes.Search}>
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
      <span className={classes.BtnRight}>
        <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
          查询
        </Button>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport}>
          导出报表
        </Button>
      </span>
    </div>
  );
}

export default type2SearchBar;
