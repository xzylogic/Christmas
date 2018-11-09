import React, { Component } from 'react';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ account }) => ({
  accountList: account.accountList,
  searchParam: account.searchParam,
}))
class AccountDetail extends Component {
  componentDidMount() {
    console.log(this.props);
    // const { dispatch, accountList } = this.props;
    // if (accountList === null) {
    //   dispatch({
    //     type: 'account/fetchAccountList',
    //   });
    // }
  }

  render() {
    return (
      <PageHeaderWrapper>
        <div>账号详情</div>
      </PageHeaderWrapper>
    );
  }
}

export default AccountDetail;
