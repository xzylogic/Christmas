// import React, { Component } from 'react';
// import { connect } from 'dva';
// import { Modal, Select, Divider } from 'antd';

// import TabList from '@/components/PageComponents/Table/TableList';

// // @connect(
// //     mapStateToProps,
// //     mapDispatchToProps
// // )

// class MemberDetail extends Component {
//   state = {
//     way: 'day',
//   };

//   componentWillReceiveProps(nextProps) {
//     const { name } = this.props;
//     if (name && nextProps.name !== name) {
//       this.setState({ way: 'day' });
//     }
//   }

//   componentDidUpdate(prevProps) {
//     const { onFetchGroupPerformanceDetail, name } = this.props;
//     const { way } = this.state;
//     if (name && prevProps.name !== name) {
//       onFetchGroupPerformanceDetail(way, name, 0);
//     }
//   }

//   setTableColumns = () => {
//     const columns = [
//       {
//         title: '日期',
//         dataIndex: 'data',
//         key: 'data',
//         render: (_, record) => record.data || record.weeks || record.months || record.years,
//       },
//       {
//         title: '渠道',
//         dataIndex: 'promoCode',
//         key: 'promoCode',
//       },
//       {
//         title: '关注量',
//         dataIndex: 'fansCount',
//         key: 'fansCount',
//       },
//       {
//         title: '注册量',
//         dataIndex: 'regCount',
//         key: 'regCount',
//       },
//     ];
//     return columns;
//   };

//   handlePageChange = page => {
//     console.log(page);
//   };

//   handleWayChange = value => {
//     console.log(value);
//   };

//   render() {
//     const { memberDetailList, currentPage, TotalElements, visible, name, onClose } = this.props;
//     const { way } = this.state;
//     return (
//       <div>123</div>
//       // <Modal title='查看详情' centered visible={visible} footer={null} onCancel={onClose}>
//       //     <Select name="way" value={way} onChange={this.handleWayChange}>
//       //         <Select.Option value='day'>按日统计</Select.Option>
//       //         <Select.Option value='week'>按周统计</Select.Option>
//       //         <Select.Option value='month'>按月统计</Select.Option>
//       //         <Select.Option value='year'>按年统计</Select.Option>
//       //     </Select>
//       //     <Divider>{name}</Divider>
//       //     <TabList
//       //         rowKey={(_, index) => index}
//       //         list={memberDetailList}
//       //         columns={this.setTableColumns()}
//       //         currentPage={currentPage}
//       //         TotalElements={TotalElements}
//       //         onPageChange={this.handlePageChange}
//       //     />>
//       // </Modal>
//     );
//   }
// }

// export default MemberDetail;
