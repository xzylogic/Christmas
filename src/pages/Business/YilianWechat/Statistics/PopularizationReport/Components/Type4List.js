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

const renderTitle = (timeTitle, fansTotal, regTotal, conversionRateTotal) => {
  let content = (
    <div>
      {timeTitle}
      微信推广数据
    </div>
  );

  if (fansTotal.length !== 0 && regTotal !== 0 && conversionRateTotal) {
    content = (
      <div>
        <div>
          {timeTitle}
          微信推广数据
        </div>
        <div>
          关注量
          {fansTotal}
          ，注册量
          {regTotal}
          {/* ，注册转化率
          {conversionRateTotal} */}
        </div>
      </div>
    );
  }
  return content;
};

class Type4List extends Component {
  componentDidMount() {}

  setTableColumns = (timeTitle, fansTotal, regTotal, conversionRateTotal) => {
    const columns = [
      {
        title: renderTitle(timeTitle, fansTotal, regTotal, conversionRateTotal),
        children: [
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
          // {
          //   title: '注册转换率',
          //   dataIndex: 'conversionRate',
          //   key: 'conversionRate',
          //   render: renderContent,
          // },
        ],
      },
    ];
    return columns;
  };

  getDataSource = data => {
    let dataSource = [];
    if (data && Array.isArray(data)) {
      const groupList = data.reduce((pre, curr) => [...pre, curr.name], []);
      const groupKeys = Array.from(new Set(groupList));
      const groupTotal = groupKeys.map(groupname => {
        const newGroup = data.filter(obj => obj.name === groupname);
        const groupCount = newGroup.reduce(
          (pre, curr) => ({
            fansCount: pre.fansCount + curr.fansCount,
            regCount: pre.regCount + curr.regCount,
            conversionRate: parseInt(pre.conversionRate, 10) + parseInt(pre.conversionRate, 10),
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

  getFansTotal = data => {
    let fansTotal = [];
    if (data && Array.isArray(data) && data.length !== 0) {
      const fansList = data.reduce((pre, curr) => [...pre, curr.fansCount], []);
      fansTotal = fansList.reduce((preValue, curValue) => preValue + curValue);
    }
    return fansTotal;
  };

  getRegTotal = data => {
    let regTotal = [];

    if (data && Array.isArray(data) && data.length !== 0) {
      const regList = data.reduce((pre, curr) => [...pre, curr.regCount], []);

      regTotal = regList.reduce((preValue, curValue) => preValue + curValue);
    }
    return regTotal;
  };

  getTimeTitle = time => {
    let content = '';
    const month = parseInt(time.split('-')[1], 10);
    const date = parseInt(time.split('-')[2], 10);
    content = (
      <span>
        {month}月{date}日
      </span>
    );
    return content;
  };

  render() {
    const {
      data,
      params: { time },
    } = this.props;

    const timeTitle = this.getTimeTitle(time);
    const fansTotal = this.getFansTotal(data);
    const regTotal = this.getRegTotal(data);
    const conversionRateTotal = `${(regTotal / fansTotal).toFixed(2)}%`;

    return (
      <React.Fragment>
        <Table
          rowKey={(_, index) => index}
          dataSource={this.getDataSource(data)}
          // columns={this.setTableColumns()}
          columns={this.setTableColumns(timeTitle, fansTotal, regTotal, conversionRateTotal)}
          pagination={false}
          bordered
        />
      </React.Fragment>
    );
  }
}

export default Type4List;
