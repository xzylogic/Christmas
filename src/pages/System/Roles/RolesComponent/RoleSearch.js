import React from 'react';
import { Input, Button } from 'antd';

import classes from '../Roles.less';

const roleSearch = props => {
  const { name, onNameChange, search, onNewClick } = props;
  return (
    <div className={classes.RoleSearchContainer}>
      <div className={classes.InputContainer}>
        <Input type="text" placeholder="角色名称" value={name} onChange={onNameChange} />
      </div>
      <div className={classes.ButtonContainer}>
        <Button type="primary" onClick={search}>
          搜索
        </Button>
      </div>
      <div className={classes.ButtonContainer}>
        <Button type="primary" onClick={onNewClick}>
          添加角色
        </Button>
      </div>
    </div>
  );
};

export default roleSearch;
