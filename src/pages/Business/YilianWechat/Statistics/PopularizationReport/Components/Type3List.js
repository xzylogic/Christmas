import React, { Component } from 'react';

import TableList from '@/components/PageComponents/Table/TableList';

class Type3List extends Component {
  componentDidMount() {}

  setTableColumns = countType => {
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
    columns.push(
      {
        title: '关注量',
        dataIndex: 'fansCount',
        key: 'fansCount',
      },
      {
        title: '注册量',
        dataIndex: 'regCount',
        key: 'regCount',
      }
      // {
      //   title: '注册转换率',
      //   dataIndex: 'conversionRate',
      //   key: 'conversionRate',
      // }
    );
    return columns;
  };

  render() {
    const { data, countType, currentPage, totalElements, onPageChange } = this.props;

    return (
      <React.Fragment>
        <TableList
          rowKey={(_, index) => index}
          list={data}
          columns={this.setTableColumns(countType)}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={onPageChange}
        />
      </React.Fragment>
    );
  }
}

export default Type3List;
