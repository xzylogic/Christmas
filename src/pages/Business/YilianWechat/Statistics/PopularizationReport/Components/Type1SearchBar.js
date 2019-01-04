import React from 'react';
import { Select, Button } from 'antd';
import StatisticalMethods from '@/components/PageComponents/StatisticalMethods/StatisticalMethods';

import classes from '../PopularizationReport.less';

function type1SearchBar(props) {
  const { params, searchGroupList, onParamsChange, onReset, onExport, onSearch } = props;

  let options = '';
  if (searchGroupList && Array.isArray(searchGroupList)) {
    options = (
      <Select
        className={classes.Gap}
        name="groupName"
        value={params.groupName}
        style={{ width: 90 }}
        onChange={value => onParamsChange(value, 'groupName')}
      >
        {searchGroupList.map(data => (
          <Select.Option key={data.id} value={data.name}>
            {data.name}
          </Select.Option>
        ))}
      </Select>
    );
  }

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
      <span className={classes.Span}>{options}</span>
      <Select
        className={classes.Span}
        name="project"
        value={params.project}
        onChange={value => onParamsChange(value, 'project')}
        style={{ width: 120 }}
      >
        <Select.Option value="">全部</Select.Option>
        <Select.Option value="fansCount">关注量</Select.Option>
        <Select.Option value="regCount">注册量</Select.Option>
        {/* <Select.Option value="conversionRate">注册转化率</Select.Option> */}
      </Select>
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

export default type1SearchBar;
