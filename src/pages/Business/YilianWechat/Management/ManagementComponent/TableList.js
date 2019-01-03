import React from 'react';
import { Table } from 'antd';

function tableList(props) {
  const {
    rowKey,
    list,
    columns,
    currentPage,
    pageSize,
    totalElements,
    onPageChange,
    scroll,
  } = props;

  return (
    <Table
      rowKey={rowKey}
      dataSource={list}
      columns={columns}
      pagination={{
        current: currentPage + 1,
        total: totalElements,
        pageSize: pageSize || 10,
        onChange: onPageChange,
      }}
      scroll={scroll}
      bordered
    />
  );
}

export default tableList;
