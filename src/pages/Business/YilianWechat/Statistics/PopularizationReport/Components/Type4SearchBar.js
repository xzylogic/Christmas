import React from 'react';
import { Button, DatePicker } from 'antd';
import moment from 'moment';

import classes from '../PopularizationReport.less';

function type3SearchBar(props) {
  const { params, onParamsChange, onReset, onExport, onSearch } = props;

  return (
    <div className={classes.Search}>
      <DatePicker
        className={classes.Span}
        value={moment(params.time, 'YYYY-MM-DD')}
        onChange={(_, dateStrings) => onParamsChange(dateStrings, 'time')}
        allowClear={false}
      />
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

export default type3SearchBar;
