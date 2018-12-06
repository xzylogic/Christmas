import React from 'react';
import { Select, Button, DatePicker, Divider } from 'antd';
import moment from 'moment';

import classes from '../Members.less';

// class MemberSearch extends React.Component {

//   render() {

//   }
// }

function memberSearchBar(props) {
  const { params, onParamsChange, onReset, allHosName } = props;

  let isHosNameShow = false;

  const showAllHosName = value => {
    // console.log(value)
    if (value) {
      isHosNameShow = true;
    }
  };

  const isHosName = allHosName instanceof Array;
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
          // name="type"
          // value={params.type}
          // defaultValue=''
          // placeholder='请选择'
          onSelect={showAllHosName}
          style={{ width: 115 }}
          placeholder="--请选择--"
          // onChange={value => onParamsChange(value, 'type')}
        >
          <Select.Option value="name">地推人员</Select.Option>
          <Select.Option value="hosName">医院二维码</Select.Option>
        </Select>
      </span>
      {isHosNameShow ? (
        <span>
          请选择：
          {isHosName ? (
            <Select style={{ width: 200 }} className={classes.Gap} defaultValue={allHosName[0]}>
              {allHosName.map(item => (
                <Select.Option id={item} key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          ) : (
            ''
          )}
        </span>
      ) : (
        ''
      )}
    </div>
  );
}

export default memberSearchBar;
