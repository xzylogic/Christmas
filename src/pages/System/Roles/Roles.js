import React, { Component } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RoleSearch from './RolesComponent/RoleSearch';
import RoleList from './RolesComponent/RoleList';

import classes from './Roles.less';

const mapStateToProps = state => ({
  roleList: state.role.roleList,
  searchParam: state.role.searchParam,
  currentPage: state.role.currentPage,
  totalElements: state.role.totalElements,
  loading: state.loading.effects['role/fetchRoleList'],
});

const mapDispatchToProps = dispatch => ({
  onFetchRoleList: page =>
    dispatch({
      type: 'role/fetchRoleList',
      payload: { page },
    }),
  onUpdateSearchParam: (key, name) =>
    dispatch({
      type: 'role/updateSearchParam',
      payload: { key, name },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Roles extends Component {
  componentDidMount() {
    console.log('role');
    const { roleList, onFetchRoleList } = this.props;
    if (roleList === null) {
      onFetchRoleList(0);
    }
  }

  handleInputChange = (event, myKey) => {
    const { onUpdateSearchParam } = this.props;
    const myName = myKey === 'state' ? event : event.target.value;
    onUpdateSearchParam(myKey, myName);
  };

  handleSearch = () => {
    const { onFetchRoleList } = this.props;
    onFetchRoleList(0);
  };

  handleNew = e => {
    e.preventDefault();
    Router.push(`/system/roles/0`);
  };

  handleSelectedChange = (record, type) => {
    console.log(record, type);
    // const { onChangeAccountState, onResetAccountPwd, onDeleteAccount } = this.props;
    // if (type === 'state') {
    //   onChangeRoleState(record.id, !record.isDelete);
    // }
    // if (type === 'delete') {
    //   onDeleteRole(record.id);
    // }
  };

  render() {
    console.log('render');
    const { searchParam, roleList, currentPage, totalElements, onFetchRoleList } = this.props;
    return (
      <PageHeaderWrapper>
        <div className={classes.Roles}>
          <RoleSearch
            name={searchParam.name}
            onNameChange={event => this.handleInputChange(event, 'name')}
            search={this.handleSearch}
            onNewClick={this.handleNew}
          />
          <RoleList
            roles={roleList}
            onSelectedChange={this.handleSelectedChange}
            currentPage={currentPage}
            totalElements={totalElements}
            onPageChange={onFetchRoleList}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Roles;
