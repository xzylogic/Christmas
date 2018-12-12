import React, { Component } from 'react';

import TableList from '@/components/PageComponents/Table/TableList';

class AppointmentsReportList extends Component {
  componentDidMount() {}

  setTableColumns = () => {
    const columns = [
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '医院名称',
        dataIndex: 'site',
        key: 'site',
      },
      {
        title: '预约量',
        dataIndex: 'reservationCount',
        key: 'reservationCount',
      },
    ];
    return columns;
  };

  render() {
    const { data, currentPage, totalElements, onPageChange } = this.props;
    return (
      <TableList
        rowKey="index"
        list={data}
        columns={this.setTableColumns()}
        currentPage={currentPage}
        totalElements={totalElements}
        onPageChange={onPageChange}
      />
    );
  }
}

export default AppointmentsReportList;
