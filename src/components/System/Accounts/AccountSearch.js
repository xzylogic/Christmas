import React from 'react';
import { Input, Select, Button } from 'antd';

import classes from './AccountSearch.less';

const accountSearch = props => {
  const selectProps = {};
  const { state, onStateChange, name, onNameChange, search, onNewClick } = props;
  if (state !== null) {
    selectProps.value = state;
  }
  return (
    <div className={classes.AccountSearchContainer}>
      <Select
        placeholder="是否启用"
        {...selectProps}
        onChange={onStateChange}
        className={classes.InputContainer}
        allowClear
      >
        <Select.Option value="true">是</Select.Option>
        <Select.Option value="false">否</Select.Option>
      </Select>
      <div className={classes.InputContainer}>
        <Input type="text" placeholder="姓名" value={name} onChange={onNameChange} />
      </div>
      <div className={classes.ButtonContainer}>
        <Button type="primary" onClick={search}>
          搜索
        </Button>
      </div>
      <div className={classes.ButtonContainer}>
        <Button type="primary" onClick={onNewClick}>
          添加账号
        </Button>
      </div>
    </div>
  );
};

export default accountSearch;
