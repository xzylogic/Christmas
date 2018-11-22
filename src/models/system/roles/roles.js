import { fetchRoleListService } from '@/services/system/roles/roles';

export default {
  namespace: 'role',

  state: {
    searchParam: {
      name: '',
    },
    roleList: null,
    currentPage: 0,
    totalElements: 0,
  },

  effects: {
    *fetchRoleList({ payload }, { call, put, select }) {
      const searchParam = yield select(state => state.account.searchParam);
      const { page } = payload;
      let params = '';
      if (searchParam && searchParam.name) {
        params += `name=${searchParam.name}`;
      }
      const res = yield call(fetchRoleListService, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateRoleList',
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
        roleList: payload,
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
