import { message } from 'antd';
import {
  fetchAccountListService,
  toggleAccountState,
  resetAccountPassword,
  deleteAccount,
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
    totalPages: 0,
  },

  effects: {
    *fetchAccountList(_, { call, put, select }) {
      const searchParam = yield select(state => state.account.searchParam);
      const res = yield call(fetchAccountListService, searchParam);
      if (res) {
        yield put({
          type: 'updateAccountList',
          payload: res.data,
        });
        yield put({
          type: 'updateCurrentPage',
          payload: res.currentPage,
        });
        yield put({
          type: 'updateTotalPages',
          payload: res.totalPages,
        });
      }
    },
    *toggleAccountState({ payload }, { call }) {
      const res = yield call(toggleAccountState, {
        id: payload.id,
        isDelete: payload.isDelete,
      });
      if (res && res.code === 200) {
        message.success(res.message || '操作成功！！！');
      } else {
        message.success((res && res.message) || '操作失败！！！');
      }
    },
    *resetAccountPassword({ payload }, { call }) {
      const res = yield call(resetAccountPassword, { id: payload.id });
      if (res && res.code === 200) {
        message.success(res.message || '操作成功！！！');
      } else {
        message.success((res && res.message) || '操作失败！！！');
      }
    },
    *deleteAccount({ payload }, { call }) {
      const res = yield call(deleteAccount, { id: payload.id });
      if (res && res.code === 200) {
        message.success(res.message || '操作成功！！！');
      } else {
        message.success((res && res.message) || '操作失败！！！');
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
    updateTotalPages(state, { payload }) {
      return {
        ...state,
        totalPages: payload,
      };
    },
  },
};
