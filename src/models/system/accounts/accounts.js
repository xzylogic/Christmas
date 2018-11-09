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
    selectedAccount: null,
    modalType: '',
    modalVisible: false,
    modalLoading: false,
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
    *toggleAccountState({ payload }, { call, put }) {
      const data = yield call(toggleAccountState, {
        id: payload.id,
        isDelete: payload.isDelete,
      });
      if (data) {
        console.log(data);
        yield put({ type: 'closeAccountModal' });
      }
    },
    *resetAccountPassword({ payload }, { call, put }) {
      const data = yield call(resetAccountPassword, { id: payload.id });
      if (data) {
        console.log(data);
        yield put({ type: 'closeAccountModal' });
      }
    },
    *deleteAccount({ payload }, { call, put }) {
      const data = yield call(deleteAccount, { id: payload.id });
      if (data) {
        console.log(data);
        yield put({ type: 'closeAccountModal' });
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
    updateSelectedAccount(state, { payload }) {
      return {
        ...state,
        selectedAccount: payload.data,
        modalType: payload.type,
        modalVisible: true,
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
    openAccountModal(state) {
      return {
        ...state,
        modalVisible: true,
      };
    },
    closeAccountModal(state) {
      return {
        ...state,
        modalVisible: false,
      };
    },
  },
};
