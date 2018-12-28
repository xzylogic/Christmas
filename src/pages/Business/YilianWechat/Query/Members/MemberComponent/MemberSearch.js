import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, Col } from 'antd';
import StatisticalMethods from '@/components/PageComponents/StatisticalMethods/StatisticalMethods';
import classes from '../Members.less';

const mapDispatchToProps = dispatch => ({
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatQuery/updateSearchParam',
      payload: { origin: 'membership', key, value },
    }),
});

@connect(
  null,
  mapDispatchToProps
)
class MemberSearch extends Component {
  showAllHosName = value => {
    const { onSearchParamChange } = this.props;
    if (value) {
      onSearchParamChange('queryType', value);
    }
    if (value === 'name') {
      onSearchParamChange('hosName', '');
    } else {
      onSearchParamChange('name', '');
    }
  };

  render() {
    const { params, onParamsChange, onReset, allHosName, allPerson, onSearch } = this.props;

    return (
      <div className={classes.Search}>
        <Col>
          <Select
            className={classes.Gap}
            name="type"
            value={params.type}
            onChange={value => onParamsChange(value, 'type')}
          >
            <Select.Option value="0">按日统计</Select.Option>
            <Select.Option value="1">按周统计</Select.Option>
            <Select.Option value="2">按月统计</Select.Option>
            <Select.Option value="3">按年统计</Select.Option>
          </Select>
          <StatisticalMethods params={params} onParamsChange={onParamsChange} />
          {/* <span style={{ float: 'right', marginTop: '16px' }}>
            <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
              查询
            </Button>
            <Button type="primary" htmlType="button" onClick={onReset}>
              重置
            </Button>
          </span> */}
        </Col>
        <Col>
          <span className={classes.Span}>
            类型：
            <Select
              // className={classes.Gap}
              onChange={this.showAllHosName}
              style={{ width: 115 }}
              placeholder="--请选择--"
              value={params.queryType}
            >
              <Select.Option value="name">地推人员</Select.Option>
              <Select.Option value="hosName">医院二维码</Select.Option>
            </Select>
          </span>
          {params.queryType ? (
            <span className={classes.Span}>
              请选择：
              {params.queryType === 'hosName' ? (
                <Select
                  style={{ width: 300 }}
                  // className={classes.Gap}
                  placeholder="--请选择--"
                  value={params.hosName}
                  onChange={value => onParamsChange(value, 'hosName')}
                >
                  {allHosName.map(item => (
                    <Select.Option id={item} key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Select
                  style={{ width: 200 }}
                  // className={classes.Gap}
                  placeholder="--请选择--"
                  value={params.name}
                  onChange={value => onParamsChange(value, 'name')}
                >
                  {allPerson.map(item => (
                    <Select.Option id={item.id} key={item.id} value={item.hos_name}>
                      {item.hos_name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </span>
          ) : (
            ''
          )}
          <span style={{ float: 'right', marginTop: '16px' }}>
            <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
              查询
            </Button>
            <Button type="primary" htmlType="button" onClick={onReset}>
              重置
            </Button>
          </span>
        </Col>
      </div>
    );
  }
}

export default MemberSearch;
