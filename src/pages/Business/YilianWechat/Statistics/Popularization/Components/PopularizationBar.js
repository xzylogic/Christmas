import React from 'react';
import { Select, Button, Row, Col } from 'antd';
import StatisticalMethods from '@/components/PageComponents/StatisticalMethods/StatisticalMethods';
import classes from './PopularizationBar.less';

class PopularizationBar extends React.Component {
  handleGroupChange = value => {
    const { onParamsChange } = this.props;
    onParamsChange(value, 'group');
    onParamsChange('', 'hosName');
  };

  handleChangePromoCode = value => {
    const { onParamsChange } = this.props;
    onParamsChange(null, 'hosType');
    onParamsChange(value, 'channel');
  };

  render() {
    const {
      onSearch,
      onReset,
      onExport,
      allHosName,
      allGroupName,
      params,
      onParamsChange,
      groupHosName,
      onChangeWay,
    } = this.props;

    const renderHosName = () => {
      let content = (
        <Select
          className={classes.Gap}
          style={{ width: 260 }}
          placeholder="医院名称"
          showSearch
          onChange={value => onParamsChange(value, 'hosName')}
          value=""
        >
          <Select.Option value="" />
        </Select>
      );

      if (params.group === '' && allHosName instanceof Object) {
        // 空  全部
        content = (
          <Select
            className={classes.Gap}
            style={{ width: 260 }}
            placeholder="医院名称"
            showSearch
            onChange={value => onParamsChange(value, 'hosName')}
            value={params.hosName}
          >
            {allHosName.map(item => (
              <Select.Option id={item.id} key={item.id} value={item.hos_name}>
                {item.hos_name}
              </Select.Option>
            ))}
          </Select>
        );
      } else if (
        params.group !== '' &&
        (groupHosName instanceof Object && Object.keys(groupHosName).length > 0)
      ) {
        // 小组有医院'
        content = (
          <Select
            className={classes.Gap}
            style={{ width: 260 }}
            placeholder="医院名称"
            showSearch
            onChange={value => onParamsChange(value, 'hosName')}
            value={params.hosName}
          >
            {groupHosName.map(item => (
              <Select.Option id={item.id} key={item.id} value={item.hos_name}>
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
        <Col span={24}>
          <Select className={classes.Span} onChange={onChangeWay} value={params.type}>
            <Select.Option value="day">按日统计</Select.Option>
            <Select.Option value="week">按周统计</Select.Option>
            <Select.Option value="month">按月统计</Select.Option>
            <Select.Option value="year">按年统计</Select.Option>
          </Select>
          <StatisticalMethods params={params} onParamsChange={onParamsChange} />
          <span className={classes.Span}>
            组别：
            {allGroupName instanceof Object ? (
              <Select
                className={classes.Gap}
                style={{ width: 115 }}
                placeholder="组别"
                onChange={this.handleGroupChange}
                value={params.group}
                defaultValue={allGroupName[0].name}
              >
                <Select.Option value="">全部</Select.Option>
                {allGroupName.map(item => (
                  <Select.Option id={item.id} key={item.id} value={item.id.toString()}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              ''
            )}
          </span>
        </Col>
        <span className={classes.Span}>
          医院名称：
          {renderHosName()}
        </span>
        <span className={classes.Span}>
          数据来源：
          <Select
            style={{ width: 115 }}
            className={classes.Gap}
            placeholder="数据来源"
            value={params.channel}
            onChange={this.handleChangePromoCode}
          >
            <Select.Option value="微信">医联微信</Select.Option>
            <Select.Option value="app">医联APP</Select.Option>
          </Select>
        </span>
        {params.channel ? (
          <span className={classes.Span}>
            渠道：
            <span>
              {params.channel === '微信' ? (
                <Select
                  style={{ width: 200 }}
                  className={classes.Gap}
                  placeholder="--请选择--"
                  value={params.hosType}
                  onChange={value => onParamsChange(value, 'hosType')}
                >
                  <Select.Option value="0">医院二维码</Select.Option>
                  <Select.Option value="1">员工个人二维码</Select.Option>
                  <Select.Option value="3" disabled>
                    申康医联二维码
                  </Select.Option>
                </Select>
              ) : (
                <Select
                  style={{ width: 200 }}
                  className={classes.Gap}
                  placeholder="--请选择--"
                  value={params.hosType}
                  onChange={value => onParamsChange(value, 'hosType')}
                >
                  <Select.Option value="4">按员工工号分类</Select.Option>
                </Select>
              )}
            </span>
          </span>
        ) : (
          ''
        )}

        <span className={classes.BtnRight}>
          <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
            查询
          </Button>
          <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
            重置
          </Button>
          <Button type="primary" htmlType="button" onClick={onExport}>
            导出Excel
          </Button>
        </span>
      </Row>
    );
  }
}

export default PopularizationBar;
