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
  onToggleRoleState: (roleId, enable) =>
    dispatch({
      type: 'role/toggleRoleState',
      payload: { roleId, enable },
    }),
  onDeleteRole: roleId =>
    dispatch({
      type: 'role/deleteRole',
      payload: { roleId },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Roles extends Component {
  componentDidMount() {
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
    const { onToggleRoleState, onDeleteRole } = this.props;
    if (type === 'state') {
      onToggleRoleState(record.roleId, record.enabled ? 0 : 1);
    }
    if (type === 'delete') {
      onDeleteRole(record.roleId);
    }
  };

  render() {
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
