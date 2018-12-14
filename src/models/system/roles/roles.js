import { message } from 'antd';
import Router from 'umi/router';
import {
  fetchRoleListService,
  fetchRoleService,
  saveRoleService,
  toggleRoleStateService,
  deleteRoleService,
} from '@/services/system/roles/roles';

export default {
  namespace: 'role',

  state: {
    searchParam: {
      name: '',
    },
    roleList: null,
    currentPage: 0,
    totalElements: 0,
    currentRole: null,
  },

  effects: {
    *fetchRoleList({ payload }, { call, put, select }) {
      const searchParam = yield select(state => state.role.searchParam);
      const { page } = payload;
      let params = '';
      if (searchParam && searchParam.name) {
        params += `&roleName=${searchParam.name}`;
      }
      const res = yield call(fetchRoleListService, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateRoleList',
          payload: {
            data: res.data.content,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
        });
      }
    },
    *fetchRole({ payload }, { call, put }) {
      const { roleId } = payload;
      const res = yield call(fetchRoleService, roleId);
      if (res && res.code === 200) {
        yield put({
          type: 'updateCurrentRole',
          payload: res.data,
        });
      }
    },
    *saveRole({ payload }, { call, put }) {
      const res = yield call(saveRoleService, payload.data);
      if (res && res.code === 200) {
        yield put({
          type: 'fetchRoleList',
          payload: { page: 0 },
        });
        message.success(res.message || '保存角色成功！！！').then(() => {
          Router.goBack();
        });
      } else {
        message.error((res && res.message) || '保存角色失败！！！');
      }
    },
    *toggleRoleState({ payload }, { call, put }) {
      const res = yield call(toggleRoleStateService, payload.roleId, payload.enable);
      if (res && res.code === 200) {
        message.success(res.message || '更改角色状态成功！！！');
        yield put({
          type: 'fetchRoleList',
          payload: { page: 0 },
        });
      } else {
        message.error((res && res.message) || '更改角色状态失败！！！');
      }
    },
    *deleteRole({ payload }, { call, put }) {
      const res = yield call(deleteRoleService, payload.roleId);
      if (res && res.code === 200) {
        message.success(res.message || '删除角色成功！！！');
        yield put({
          type: 'fetchRoleList',
          payload: { page: 0 },
        });
      } else {
        message.error((res && res.message) || '删除角色失败！！！');
      }
    },
  },

  reducers: {
    updateSearchParam(state, { payload }) {
      return {
        ...state,
        searchParam: {
          ...state.searchParam,
          [payload.key]: payload.name,
        },
      };
    },
    updateRoleList(state, { payload }) {
      return {
        ...state,
        roleList: payload.data,
        currentPage: payload.currentPage,
        totalElements: payload.totalElements,
      };
    },
    updateCurrentRole(state, { payload }) {
      return {
        ...state,
        currentRole: payload,
      };
    },
  },
};
