import React, { Component } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';

import AccountSearch from '@/components/System/Accounts/AccountSearch';
import AccountList from '@/components/System/Accounts/AccountList';
import AccountModal from '@/components/System/Accounts/AccountModal';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
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
  onUpdateSearchParam: (mykey, myname) =>
    dispatch({
      type: 'account/updateSearchParam',
      payload: { key: mykey, name: myname },
    }),
  onUpdateSelectedAccount: (data, type) =>
    dispatch({
      type: 'account/updateSelectedAccount',
      payload: { data, type },
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
    onUpdateSearchParam(myKey, myKey === 'state' ? event : event.target.value);
  };

  handleSearch = () => {
    const { onFetchAccountList } = this.props;
    onFetchAccountList();
  };

  handleNew = e => {
    e.preventDefault();
    Router.push(`/system/accounts/0`);
  };

  render() {
    const { searchParam, accountList, onUpdateSelectedAccount } = this.props;
    return (
      <PageHeaderWrapper>
        <div className={classes.Accounts}>
          <AccountModal />
          <AccountSearch
            state={searchParam.state}
            onStateChange={event => this.handleInputChange(event, 'state')}
            name={searchParam.name}
            onNameChange={event => this.handleInputChange(event, 'name')}
            search={this.handleSearch}
            onNewClick={this.handleNew}
          />
          <AccountList accounts={accountList} onSelectedChange={onUpdateSelectedAccount} />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Accounts;
