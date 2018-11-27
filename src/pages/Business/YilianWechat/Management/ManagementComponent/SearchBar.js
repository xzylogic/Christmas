import React from 'react';
import { Input, Button, Row, Col } from 'antd';

import classes from '../Management.less';

function searchBar(props) {
  const {
    inputValue,
    inputPlaceholder,
    onInputChange,
    onRefreshClick,
    onNewClick,
    onExportClick,
  } = props;

  return (
    <Row>
      <Col span={12} className={classes.ColLeft}>
        <Input
          type="text"
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={onInputChange}
        />
        {/* <Button type="primary" htmlType="button" onClick={onSearchClick}>查询</Button> */}
      </Col>
      <Col span={12} className={classes.ColRight}>
        <Button type="primary" htmlType="button" onClick={onRefreshClick}>
          刷新
        </Button>
        <Button type="primary" htmlType="button" onClick={onNewClick}>
          新增
        </Button>
        <Button type="primary" htmlType="button" onClick={onExportClick}>
          导出Excel
        </Button>
      </Col>
    </Row>
  );
}

export default searchBar;
