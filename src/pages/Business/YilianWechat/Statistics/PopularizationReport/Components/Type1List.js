import React, { Component } from 'react';
import { Table, Divider, Spin } from 'antd';

import TableList from '@/components/PageComponents/Table/TableList';

class Type1List extends Component {
  componentDidMount() {}

  setTableColumns = (countType, data) => {
    const columns = [];
    switch (countType) {
      case 'day':
        columns.push({
          title: '日期',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case 'week':
        columns.push({
          title: '周期',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case 'month':
        columns.push({
          title: '月份',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case 'year':
        columns.push({
          title: '年份',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      default:
        break;
    }
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
    const {
      project,
      data,
      countType,
      currentPage,
      totalElements,
      onPageChange,
      loading,
    } = this.props;
    let container = '';
    const followContent = (
      <React.Fragment>
        <Divider>关注量</Divider>
        <Table
          rowKey={(_, index) => index}
          dataSource={this.getList(data, 'fansCount')}
          columns={this.setTableColumns(countType, data)}
          pagination={false}
          // pageSize={5}
        />
      </React.Fragment>
    );
    const registerContent = (
      <React.Fragment>
        <Divider>注册量</Divider>
        <Table
          rowKey={(_, index) => index}
          dataSource={this.getList(data, 'regCount')}
          columns={this.setTableColumns(countType, data)}
          pagination={false}
          // pageSize={5}
        />
      </React.Fragment>
    );
    // const registerRateContent = (
    //   <React.Fragment>
    //     <Divider>注册转化率</Divider>
    //     <TableList
    //       rowKey={(_, index) => index}
    //       list={this.getList(data, 'conversionRate')}
    //       columns={this.setTableColumns(countType, data)}
    //       currentPage={currentPage}
    //       totalElements={totalElements}
    //       onPageChange={onPageChange}
    //       // pageSize={5}
    //     />
    //   </React.Fragment>
    // );
    if (!project) {
      container = (
        <React.Fragment>
          {followContent}
          {registerContent}
          {/* {registerRateContent} */}
        </React.Fragment>
      );
    } else if (project && project === 'fansCount') {
      container = (
        <React.Fragment>
          <Divider>关注量</Divider>
          <TableList
            rowKey={(_, index) => index}
            list={this.getList(data, 'fansCount')}
            columns={this.setTableColumns(countType, data)}
            currentPage={currentPage}
            totalElements={totalElements}
            onPageChange={onPageChange}
            // pageSize={5}
          />
        </React.Fragment>
      );
    } else if (project && project === 'regCount') {
      container = (
        <React.Fragment>
          <Divider>注册量</Divider>
          <TableList
            rowKey={(_, index) => index}
            list={this.getList(data, 'regCount')}
            columns={this.setTableColumns(countType, data)}
            currentPage={currentPage}
            totalElements={totalElements}
            onPageChange={onPageChange}
            // pageSize={5}
          />
        </React.Fragment>
      );
    }
    //  else if (project && project === 'conversionRate') {
    //   container = <React.Fragment>{registerRateContent}</React.Fragment>;
    // }
    return <Spin spinning={loading}>{container}</Spin>;
  }
}

export default Type1List;
