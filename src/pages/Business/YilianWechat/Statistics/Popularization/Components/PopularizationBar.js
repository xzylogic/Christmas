import React from 'react';
import { Select, Button, Row, Col } from 'antd';
import StatisticalMethods from '@/components/PageComponents/StatisticalMethods/StatisticalMethods';
import classes from './PopularizationBar.less';

class PopularizationBar extends React.Component {
  handleGroupChange = value => {
    const { onParamsChange, groupHosName } = this.props;
    onParamsChange(value, 'group');
    if (groupHosName instanceof Object && Object.keys(groupHosName).length > 0) {
      onParamsChange(groupHosName[0].hos_name, 'hosName');
    }
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

    // const renderHosName = () => {
    //   let content = '';
    //   if (groupHosName instanceof Object && Object.keys(groupHosName).length > 0) {
    //     content = (
    //       <Select
    //         className={classes.Gap}
    //         style={{ width: 260 }}
    //         placeholder="医院名称"
    //         onChange={value => onParamsChange(value, 'hosName')}
    //         value={params.hosName}
    //       >
    //         {groupHosName.map(item => (
    //           <Select.Option id={item.id} key={item.id} value={item.hos_name}>
    //             {item.hos_name}
    //           </Select.Option>
    //         ))}
    //       </Select>
    //     );
    //   } else if (allHosName instanceof Object) {
    //     content = (
    //       <Select
    //         className={classes.Gap}
    //         style={{ width: 260 }}
    //         placeholder="医院名称"
    //         onChange={value => onParamsChange(value, 'hosName')}
    //         value={params.hosName}
    //       >
    //         {allHosName.map(item => (
    //           <Select.Option id={item.id} key={item.id} value={item.hos_name}>
    //             {item.hos_name}
    //           </Select.Option>
    //         ))}
    //       </Select>
    //     );
    //   }
    //   return content;
    // };

    const renderHosName = () => {
      let content = '';

      if (groupHosName instanceof Object && Object.keys(groupHosName).length > 0) {
        // const filteredOptions = groupHosName.filter(o => !params.hosName.includes(o));
        // console.log(filteredOptions)
        // console.log(2222)

        content = (
          //     <Select
          //   placeholder="医院名称"
          //   value={params.hosName}
          //   onChange={value => onParamsChange(value, 'hosName')}
          //   style={{ width: '100%' }}
          // >
          //   {filteredOptions.map(item => (
          //     <Select.Option key={item.id} value={item.hos_name}>
          //       {item.hos_name}
          //     </Select.Option>
          //   ))}
          // </Select>
          <Select
            className={classes.Gap}
            style={{ width: 260 }}
            placeholder="医院名称"
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
      } else if (allHosName instanceof Object) {
        content = (
          <Select
            className={classes.Gap}
            style={{ width: 260 }}
            placeholder="医院名称"
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
                // onChange={value => onParamsChange(value, 'group')}
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
        {/* <Col span={15}> */}
        {/* </Col> */}
        {/* <Col span={8} className={classes.ColRight}> */}
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
            // defaultValue='0'
            onChange={value => onParamsChange(value, 'channel')}
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
        {/* </Col> */}
      </Row>
    );
  }
}

export default PopularizationBar;
