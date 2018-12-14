import React, { Component } from 'react';
import { Table } from 'antd';

const renderContent = (text, record) => {
  let content = '';
  if (record.type === 'total') {
    content = <span style={{ color: 'red' }}>{text}</span>;
  } else {
    content = text;
  }
  return content;
};

class Type4List extends Component {
  componentDidMount() {}

  setTableColumns = () => {
    const columns = [
      {
        title: '医院/院区',
        dataIndex: 'site',
        key: 'site',
        render: renderContent,
      },
      {
        title: '组别',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: '关注量',
        dataIndex: 'fansCount',
        key: 'fansCount',
        render: renderContent,
      },
      {
        title: '注册量',
        dataIndex: 'regCount',
        key: 'regCount',
        render: renderContent,
      },
      {
        title: '注册转换率',
        dataIndex: 'conversionRate',
        key: 'conversionRate',
        render: renderContent,
      },
    ];
    return columns;
  };

  getDataSource = data => {
    let dataSource = [];
    if (data && Array.isArray(data)) {
      const groupList = data.reduce((pre, curr) => [...pre, curr.name], []);
      const groupKeys = Array.from(new Set(groupList));
      console.log(groupKeys);
      const groupTotal = groupKeys.map(groupname => {
        const newGroup = data.filter(obj => obj.name === groupname);
        const groupCount = newGroup.reduce(
          (pre, curr) => ({
            fansCount: pre.fansCount + curr.fansCount,
            regCount: pre.regCount + curr.regCount,
            conversionRate: parseFloat(pre.conversionRate) + parseFloat(curr.conversionRate),
          }),
          { fansCount: 0, regCount: 0, conversionRate: 0 }
        );
        groupCount.conversionRate = `${(groupCount.conversionRate / newGroup.length).toFixed(2)}%`;
        groupCount.name = groupname;
        groupCount.site = `${groupname}合计`;
        groupCount.type = 'total';
        newGroup.push(groupCount);
        return newGroup;
      });

      dataSource = groupTotal.reduce((pre, curr) => [...pre, ...curr], []);
    }
    return dataSource;
  };

  render() {
    const { data } = this.props;

    return (
      <React.Fragment>
        <Table
          rowKey={(_, index) => index}
          dataSource={this.getDataSource(data)}
          columns={this.setTableColumns()}
          pagination={false}
          bordered
        />
      </React.Fragment>
    );
  }
}

export default Type4List;
