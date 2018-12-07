import React, { Component } from 'react';

import TableList from '@/components/PageComponents/Table/TableList';

class Type2List extends Component {
  componentDidMount() {}

  setTableColumns = () => {
    const columns = [
      {
        title: '组别',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '关注量',
        dataIndex: 'fansCount',
        key: 'fansCount',
      },
      {
        title: '注册量',
        dataIndex: 'regCount',
        key: 'regCount',
      },
      {
        title: '注册转换率',
        dataIndex: 'conversionRate',
        key: 'conversionRate',
      },
    ];
    return columns;
  };

  render() {
    const { data, currentPage, totalElements, onPageChange } = this.props;

    return (
      <React.Fragment>
        <TableList
          rowKey={(_, index) => index}
          list={data}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={onPageChange}
        />
      </React.Fragment>
    );
  }
}

export default Type2List;
