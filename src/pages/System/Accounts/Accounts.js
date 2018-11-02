import React, { Component } from 'react';
import { connect } from 'dva';

import AccountSearch from '@/components/System/Accounts/AccountSearch';
import AccountList from '@/components/System/Accounts/AccountList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import classes from './Accounts.less';

@connect(({ account, loading }) => ({
  accountList: account.accountList,
  searchParam: account.searchParam,
  loading: loading.effects['account/fetchAccountList'],
}))
class Accounts extends Component {
  componentDidMount() {
    const { dispatch, accountList } = this.props;
    if (accountList === null) {
      dispatch({
        type: 'account/fetchAccountList',
      });
    }
  }

  handleInputChange = (event, myKey) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/updateSearchParam',
      payload: {
        key: myKey,
        name: myKey === 'state' ? event : event.target.value,
      },
    });
  };

  handleSearch = () => {
    // console.log('search');
  };

  render() {
    const { searchParam, accountList } = this.props;
    return (
      <PageHeaderWrapper>
        <div className={classes.Accounts}>
          <AccountSearch
            state={searchParam.state}
            onStateChange={event => this.handleInputChange(event, 'state')}
            name={searchParam.name}
            onNameChange={event => this.handleInputChange(event, 'name')}
            search={this.handleSearch}
          />
          <AccountList accounts={accountList} />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Accounts;
