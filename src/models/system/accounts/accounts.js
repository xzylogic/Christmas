import { fetchAccountListService } from '@/services/system/accounts/accounts';

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
      const data = yield call(fetchAccountListService, searchParam);
      yield put({
        type: 'updateAccountList',
        payload: data.data,
      });
      yield put({
        type: 'updateCurrentPage',
        payload: data.currentPage,
      });
      yield put({
        type: 'updateTotalPages',
        payload: data.totalPages,
      });
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
