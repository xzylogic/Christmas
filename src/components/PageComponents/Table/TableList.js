import React from 'react';
import { Table } from 'antd';

function tableList(props) {
  const { rowKey, list, columns, currentPage, pageSize, totalElements, onPageChange } = props;

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
      bordered
    />
  );
}

export default tableList;
