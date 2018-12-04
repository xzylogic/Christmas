// import React, { Component } from 'react';
// import { connect } from 'dva';
// import moment from 'moment';
// import debounce from 'lodash.debounce';

// import QuerySearchBar from '../../QueryComponent/QuerySearchBar';
// import TableList from '@/components/PageComponents/Table/TableList';
// import MemberDetail from './MemberDetail';

// class MemberContainer extends Component {
//   state = {
//     showDetail: false,
//     selectedName: '',
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <QuerySearchBar
//           params={searchParams}
//           onAmountSet={this.handleAmountSet}
//           onReset={this.handleReset}
//           onExport={this.handleExport}
//           onParamsChange={this.handleParamsChanged}
//         />
//         <TableList
//           rowKey="name"
//           list={memberList}
//           columns={this.setTableColumns()}
//           currentPage={currentPage}
//           totalElements={totalElements}
//           onParamsChange={this.handleParamsChanged}
//         />
//         <MemberDetail />
//       </React.Fragment>
//     );
//   }
// }

// export default MemberContainer;
