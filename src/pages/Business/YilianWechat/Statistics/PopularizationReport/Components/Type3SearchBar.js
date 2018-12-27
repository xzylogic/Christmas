import React from 'react';
import { Select, Button } from 'antd';
import StatisticalMethods from '@/components/PageComponents/StatisticalMethods/StatisticalMethods';

import classes from '../PopularizationReport.less';

function type3SearchBar(props) {
  const { params, onParamsChange, onReset, onExport, onSearch } = props;

  return (
    <div className={classes.Search}>
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
    </div>
  );
}

export default type3SearchBar;
