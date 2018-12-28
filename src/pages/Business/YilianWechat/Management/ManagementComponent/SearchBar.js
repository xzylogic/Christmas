import React from 'react';
import { Input, Button, Row, Col } from 'antd';

import classes from '../Management.less';

function searchBar(props) {
  const {
    inputValue,
    inputPlaceholder,
    dataKey,
    onInputChange,
    onRefreshClick,
    onNewClick,
    onExportClick,
    editorBarShow,
    onEditorGroupHosClick,
    onSearchClick,
  } = props;

  return (
    <Row>
      <Col span={12} className={classes.ColLeft}>
        <Input
          type="text"
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={e => onInputChange(dataKey, e.target.value)}
        />
        <Button type="primary" htmlType="button" onClick={onSearchClick}>
          查询
        </Button>
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
        {editorBarShow ? (
          <Button type="primary" htmlType="button" onClick={onEditorGroupHosClick}>
            编辑小组
          </Button>
        ) : (
          ''
        )}
      </Col>
    </Row>
  );
}

export default searchBar;
