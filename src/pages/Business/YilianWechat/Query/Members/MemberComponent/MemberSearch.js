import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Button, DatePicker, Col } from 'antd';
import moment from 'moment';
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
        <Col className={classes.TopSearchBar}>
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
          <DatePicker.RangePicker
            className={classes.Gap}
            value={[moment(params.startTime, 'YYYY-MM-DD'), moment(params.endTime, 'YYYY-MM-DD')]}
            onChange={(_, dateStrings) => onParamsChange(dateStrings, 'date')}
            allowClear={false}
            ranges={{
              最近一周: [
                moment(new Date(new Date().valueOf() - 691200000), 'YYYY-MM-DD'),
                moment(new Date(new Date().valueOf() - 86400000), 'YYYY-MM-DD'),
              ],
              最近30天: [
                moment(new Date(new Date().valueOf() - 2678400000), 'YYYY-MM-DD'),
                moment(new Date(new Date().valueOf() - 86400000), 'YYYY-MM-DD'),
              ],
              最近90天: [
                moment(new Date(new Date().valueOf() - 7862400000), 'YYYY-MM-DD'),
                moment(new Date(new Date().valueOf() - 86400000), 'YYYY-MM-DD'),
              ],
              最近一年: [
                moment(new Date(new Date().valueOf() - 31622400000), 'YYYY-MM-DD'),
                moment(new Date(new Date().valueOf() - 86400000), 'YYYY-MM-DD'),
              ],
            }}
          />
          <Button type="primary" htmlType="button" onClick={onSearch} className={classes.SearchGap}>
            查询
          </Button>
          <Button className={classes.ResetBtn} type="primary" htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Col>
        <Col>
          <span>
            类型：
            <Select
              className={classes.Gap}
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
            <span>
              请选择：
              {params.queryType === 'hosName' ? (
                <Select
                  style={{ width: 200 }}
                  className={classes.Gap}
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
                  className={classes.Gap}
                  placeholder="--请选择--"
                  value={params.name}
                  onChange={value => onParamsChange(value, 'name')}
                >
                  {allPerson.map(item => (
                    <Select.Option id={item.id} key={item.id} value={item.id}>
                      {item.hos_name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </span>
          ) : (
            ''
          )}
        </Col>
      </div>
    );
  }
}

export default MemberSearch;
