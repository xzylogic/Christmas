import React, { Component } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AccountSearch from './AccountsComponent/AccountSearch';
import AccountList from './AccountsComponent/AccountList';

import classes from './Accounts.less';

const mapStateToProps = state => ({
  accountList: state.account.accountList,
  searchParam: state.account.searchParam,
  currentPage: state.account.currentPage,
  totalElements: state.account.totalElements,
  loading: state.loading.effects['account/fetchAccountList'],
});

const mapDispatchToProps = dispatch => ({
  onFetchAccountList: page =>
    dispatch({
      type: 'account/fetchAccountList',
      payload: { page },
    }),
  onUpdateSearchParam: (key, name) =>
    dispatch({
      type: 'account/updateSearchParam',
      payload: { key, name },
    }),
  onChangeAccountState: (userId, enable) =>
    dispatch({
      type: 'account/toggleAccountState',
      payload: { userId, enable },
    }),
  onResetAccountPwd: userId =>
    dispatch({
      type: 'account/resetAccountPassword',
      payload: { userId },
    }),
  onDeleteAccount: userId =>
    dispatch({
      type: 'account/deleteAccount',
      payload: { userId },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Accounts extends Component {
  componentDidMount() {
    const { accountList, onFetchAccountList } = this.props;
    if (accountList === null) {
      onFetchAccountList(0);
    }
  }

  handleInputChange = (event, myKey) => {
    const { onUpdateSearchParam } = this.props;
    const myName = myKey === 'state' ? event : event.target.value;
    onUpdateSearchParam(myKey, myName);
  };

  handleSearch = () => {
    const { onFetchAccountList } = this.props;
    onFetchAccountList(0);
  };

  handleNew = e => {
    e.preventDefault();
    Router.push(`/system/accounts/0`);
  };

  handleSelectedChange = (record, type) => {
    const { onChangeAccountState, onResetAccountPwd, onDeleteAccount } = this.props;
    if (type === 'state') {
      const enable = record.enabled ? 0 : 1;
      onChangeAccountState(record.userId, enable);
    }
    if (type === 'reset') {
      onResetAccountPwd(record.userId);
    }
    if (type === 'delete') {
      onDeleteAccount(record.userId);
    }
  };

  render() {
    const { searchParam, accountList, currentPage, totalElements, onFetchAccountList } = this.props;
    return (
      <PageHeaderWrapper>
        <div className={classes.Accounts}>
          <AccountSearch
            state={searchParam.state}
            onStateChange={event => this.handleInputChange(event, 'state')}
            name={searchParam.name}
            onNameChange={event => this.handleInputChange(event, 'name')}
            search={this.handleSearch}
            onNewClick={this.handleNew}
          />
          <AccountList
            accounts={accountList}
            onSelectedChange={this.handleSelectedChange}
            currentPage={currentPage}
            totalElements={totalElements}
            onPageChange={onFetchAccountList}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Accounts;
