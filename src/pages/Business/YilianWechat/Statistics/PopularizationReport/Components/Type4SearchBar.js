import React from 'react';
import { Button, DatePicker } from 'antd';
import moment from 'moment';

import classes from '../PopularizationReport.less';

function type3SearchBar(props) {
  const { params, onParamsChange, onReset, onExport } = props;

  return (
    <div className={classes.Search}>
      <DatePicker
        className={classes.Gap}
        value={moment(params.time, 'YYYY-MM-DD')}
        onChange={(_, dateStrings) => onParamsChange(dateStrings, 'time')}
        allowClear={false}
      />
      <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
        重置
      </Button>
      <Button type="primary" htmlType="button" onClick={onExport}>
        导出
      </Button>
    </div>
  );
}

export default type3SearchBar;
