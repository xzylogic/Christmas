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
    const chooseTime = () => {
      let content = (
        <span>
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
              format="YYYY-MM-DD"
              showToday={false}
              allowClear={false}
              value={moment(params.endTime, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
            />
          </span>
        </span>
      );
      if (params.type === '2') {
        content = (
          <span>
            <span className={classes.Span}>
              开始月份：
              <DatePicker.MonthPicker
                format="YYYY-MM"
                showToday={false}
                allowClear={false}
                value={moment(params.startTime, 'YYYY-MM-DD')}
                onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startTime')}
              />
            </span>
            <span className={classes.Span}>
              截止月份：
              <DatePicker.MonthPicker
                format="YYYY-MM"
                showToday={false}
                allowClear={false}
                value={moment(params.endTime, 'YYYY-MM-DD')}
                onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
              />
            </span>
          </span>
        );
      }
      if (params.type === '3') {
        const currentStart = moment(new Date().valueOf() - 2678400000).format('YYYY-MM-DD');
        const currentEnd = moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD');

        // 默认开始年份
        const defaultStart = params.startTime.split('-').splice(0, 1);
        defaultStart.push('01', '01');
        const defaultStartTime = defaultStart.join('-');

        // 默认截止年份
        const defaultEnd = params.endTime.split('-').splice(0, 1);
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
            <span className={classes.Span}>
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
            <span className={classes.Span}>
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
          {/* <span className={classes.Span}>
            开始日期：
            <DatePicker
              format={dateFormat()}
              showToday={false}
              allowClear={false}
              value={moment(params.startTime, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startTime')}
            />
          </span>
          <span className={classes.Span}>
            截止日期：
            <DatePicker
              format={dateFormat()}
              showToday={false}
              allowClear={false}
              value={moment(params.endTime, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
            />
          </span> */}
          {chooseTime()}
          <span style={{ float: 'right', marginTop: '16px' }}>
            <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
              查询
            </Button>
            <Button type="primary" htmlType="button" onClick={onReset}>
              重置
            </Button>
          </span>
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
                  style={{ width: 200 }}
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
        </Col>
      </div>
    );
  }
}

export default MemberSearch;
