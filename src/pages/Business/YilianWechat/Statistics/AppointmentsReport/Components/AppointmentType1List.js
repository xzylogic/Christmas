import React, { Component } from 'react';
import { Divider } from 'antd';

import TableList from '@/components/PageComponents/Table/TableList';

class AppointmentType1List extends Component {
  componentDidMount() {}

  setTableColumns = data => {
    const columns = [];
    columns.push({
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    });

    if (data && Array.isArray(data)) {
      const arr = data.reduce((pre, curr) => [...pre, curr.site], []);
      const columnKeys = Array.from(new Set(arr));
      columnKeys.forEach(columnKey => {
        columns.push({
          title: columnKey,
          dataIndex: columnKey,
          key: columnKey,
          render: text => text || 0,
        });
      });
    }

    return columns;
  };

  getList = (data, type) => {
    let returnData = [];
    if (data && Array.isArray(data)) {
      const arr = data.reduce((pre, curr) => [...pre, curr.date || ''], []);
      const dateKeys = Array.from(new Set(arr));
      returnData = dateKeys.map(date => {
        const mapData = {};
        mapData.date = date;
        const dataBydate = data.filter(obj => obj.date === date);
        dataBydate.forEach(obj => {
          mapData[obj.site] = obj[type] || 0;
        });
        return mapData;
      });
    }
    return returnData;
  };

  render() {
    const { data, currentPage, totalElements, onPageChange } = this.props;
    return (
      <React.Fragment>
        <Divider>预约量</Divider>
        <TableList
          rowKey={(_, index) => index}
          list={this.getList(data, 'reservationCount')}
          columns={this.setTableColumns(data)}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={onPageChange}
        />
      </React.Fragment>
    );
  }
}

export default AppointmentType1List;
