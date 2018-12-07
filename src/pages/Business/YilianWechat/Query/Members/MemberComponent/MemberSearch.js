import React, { Component } from 'react';
import { Select, Button, DatePicker, Divider } from 'antd';
import moment from 'moment';
import classes from '../Members.less';

class MemberSearch extends Component {
  state = {
    isHosNameShow: false,
    hosNameType: '',
  };

  render() {
    const { params, onParamsChange, onReset, allHosName, allPerson } = this.props;
    const { isHosNameShow, hosNameType } = this.state;

    const showAllHosName = value => {
      if (value) {
        this.setState({ isHosNameShow: true, hosNameType: value });
      }
    };

    return (
      <div className={classes.Search}>
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
              moment(new Date(new Date().valueOf() - 604800000), 'YYYY-MM-DD'),
              moment(new Date(), 'YYYY-MM-DD'),
            ],
            最近30天: [
              moment(new Date(new Date().valueOf() - 2592000000), 'YYYY-MM-DD'),
              moment(new Date(), 'YYYY-MM-DD'),
            ],
            最近一年: [
              moment(new Date(new Date().valueOf() - 31536000000), 'YYYY-MM-DD'),
              moment(new Date(), 'YYYY-MM-DD'),
            ],
          }}
        />
        <Button className={classes.ResetBtn} type="primary" htmlType="button" onClick={onReset}>
          重置
        </Button>
        <Divider />
        <span>
          类型：
          <Select
            className={classes.Gap}
            onChange={showAllHosName}
            style={{ width: 115 }}
            placeholder="--请选择--"
          >
            <Select.Option value="name">地推人员</Select.Option>
            <Select.Option value="hosName">医院二维码</Select.Option>
          </Select>
        </span>
        {isHosNameShow ? (
          <span>
            请选择：
            {hosNameType === 'hosName' ? (
              <Select
                style={{ width: 200 }}
                className={classes.Gap}
                placeholder="--请选择--"
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
      </div>
    );
  }
}

export default MemberSearch;
