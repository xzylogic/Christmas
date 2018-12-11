import { message } from 'antd';
import Router from 'umi/router';

import {
  fetchAccountListService,
  fetchAccountDetailService,
  fetchAllRolesService,
  toggleAccountStateService,
  resetAccountPasswordService,
  deleteAccountService,
  saveAccountService,
} from '@/services/system/accounts/accounts';

export default {
  namespace: 'account',

  state: {
    searchParam: {
      name: '',
      state: null,
    },
    accountList: null,
    currentPage: 0,
    totalElements: 0,
    selectedAccount: null,
    roles: null,
  },

  effects: {
    *fetchAccountList({ payload }, { call, put, select }) {
      const searchParam = yield select(state => state.account.searchParam);
      const { page } = payload;
      let params = '';
      if (searchParam && searchParam.name) {
        params += `&name=${searchParam.name}`;
      }
      if (searchParam && searchParam.state) {
        params += `&state=${searchParam.state}`;
      }
      const res = yield call(fetchAccountListService, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateAccountList',
          payload: res.data.content,
        });
        yield put({
          type: 'updateCurrentPage',
          payload: page,
        });
        yield put({
          type: 'updateTotalElements',
          payload: res.data.totalElements,
        });
      }
    },
    *fetchAccountDetail({ payload }, { call, put }) {
      const { userId } = payload;
      const res = yield call(fetchAccountDetailService, userId);
      if (res && res.code === 200 && res.data) {
        yield put({
          type: 'updateSelectedAccount',
          payload: res.data,
        });
      }
    },
    *toggleAccountState({ payload }, { call, put }) {
      const { userId, enable } = payload;
      const res = yield call(toggleAccountStateService, userId, enable);
      if (res && res.code === 200) {
        message.success(res.message || '操作成功！！！');
        yield put({ type: 'fetchAccountList', payload: { page: 0 } });
      } else {
        message.success((res && res.message) || '操作失败！！！');
      }
    },
    *resetAccountPassword({ payload }, { call }) {
      const res = yield call(resetAccountPasswordService, payload.userId);
      if (res && res.code === 200) {
        message.success(res.message || '操作成功！！！');
      } else {
        message.success((res && res.message) || '操作失败！！！');
      }
    },
    *deleteAccount({ payload }, { call, put }) {
      const res = yield call(deleteAccountService, payload.userId);
      if (res && res.code === 200) {
        message.success(res.message || '操作成功！！！');
        yield put({ type: 'fetchAccountList', payload: { page: 0 } });
      } else {
        message.success((res && res.message) || '操作失败！！！');
      }
    },
    *saveAccount({ payload }, { call, put }) {
      const res = yield call(saveAccountService, payload.data);
      if (res && res.code === 200) {
        yield put({ type: 'fetchAccountList', payload: { page: 0 } });
        message.success(res.message || '保存用户信息成功！！！').then(() => {
          Router.goBack();
        });
      } else {
        message.success((res && res.message) || '保存用户信息失败！！！');
      }
    },
    *fetchAllRoles(_, { call, put }) {
      const res = yield call(fetchAllRolesService);
      if (res && res.code === 200 && res.data) {
        yield put({ type: 'updateRoles', payload: res.data });
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
    updateAccountList(state, { payload }) {
      return {
        ...state,
        accountList: payload,
      };
    },
    updateCurrentPage(state, { payload }) {
      return {
        ...state,
        currentPage: payload,
      };
    },
    updateTotalElements(state, { payload }) {
      return {
        ...state,
        totalElements: payload,
      };
    },
    updateSelectedAccount(state, { payload }) {
      return {
        ...state,
        selectedAccount: payload,
      };
    },
    updateRoles(state, { payload }) {
      return {
        ...state,
        roles: payload,
      };
    },
  },
};
