import { message } from 'antd';
import {
  fetchAccountListService,
  // fetchAccountDetailService
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
    totalElements: 0,
  },

  effects: {
    *fetchAccountList({ payload }, { call, put, select }) {
      const searchParam = yield select(state => state.account.searchParam);
      const { page } = payload;
      let params = '';
      if (searchParam && searchParam.name) {
        params += `name=${searchParam.name}`;
      }
      if (searchParam && searchParam.state) {
        params += `state=${searchParam.state}`;
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
    // *fetchAccountDetail({ payload }, { call, put, select }) {
    //   const { userId } = payload;

    // },
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
    updateTotalElements(state, { payload }) {
      return {
        ...state,
        totalElements: payload,
      };
    },
  },
};
