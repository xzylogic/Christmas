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
  loading: state.loading.effects['account/fetchAccountList'],
});

const mapDispatchToProps = dispatch => ({
  onFetchAccountList: () =>
    dispatch({
      type: 'account/fetchAccountList',
    }),
  onUpdateSearchParam: (key, name) =>
    dispatch({
      type: 'account/updateSearchParam',
      payload: { key, name },
    }),
  onChangeAccountState: (id, state) =>
    dispatch({
      type: 'account/toggleAccountState',
      payload: { id, state },
    }),
  onResetAccountPwd: id =>
    dispatch({
      type: 'account/resetAccountPassword',
      payload: { id },
    }),
  onDeleteAccount: id =>
    dispatch({
      type: 'account/deleteAccount',
      payload: { id },
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
      onFetchAccountList();
    }
  }

  handleInputChange = (event, myKey) => {
    const { onUpdateSearchParam } = this.props;
    const myName = myKey === 'state' ? event : event.target.value;
    onUpdateSearchParam(myKey, myName);
  };

  handleSearch = () => {
    const { onFetchAccountList } = this.props;
    onFetchAccountList();
  };

  handleNew = e => {
    e.preventDefault();
    Router.push(`/system/accounts/0`);
  };

  handleSelectedChange = (record, type) => {
    const { onChangeAccountState, onResetAccountPwd, onDeleteAccount } = this.props;
    if (type === 'state') {
      onChangeAccountState(record.id, !record.isDelete);
    }
    if (type === 'reset') {
      onResetAccountPwd(record.id);
    }
    if (type === 'delete') {
      onDeleteAccount(record.id);
    }
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
            onNewClick={this.handleNew}
          />
          <AccountList accounts={accountList} onSelectedChange={this.handleSelectedChange} />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Accounts;
