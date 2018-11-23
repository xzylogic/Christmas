// import { message } from 'antd';
import {
  fetchGroupListService,
  fetchMemberListService,
  fetchLocationListService,
  // createGroupService,
  // createMemberService,
  // createLocationService,
  // modifyGroupService,
  // modifyMemberService,
  // modifyLocationService,
  // deleteGroupService,
  // deleteMemberService,
  // deleteLocationService,
} from '@/services/business/application-dissemination/application-dissemination';

export default {
  namespace: 'applicationDissemination',

  state: {
    searchParam: {
      groupName: '',
      memberName: '',
      locationName: '',
    },
    list: {
      group: null,
      member: null,
      location: null,
    },
    currentPage: {
      group: 0,
      member: 0,
      location: 0,
    },
    totalElements: {
      group: 0,
      member: 0,
      location: 0,
    },
  },

  effects: {
    *fetchGroupList({ payload }, { call, put, select }) {
      const searchParam = yield select(state => state.applicationDissemination.searchParam);
      const { page } = payload;
      let params = '';
      if (searchParam && searchParam.groupName) {
        params += `name=${searchParam.groupName}`;
      }
      const res = yield call(fetchGroupListService, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'group',
            list: res.data.content,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
        });
      }
    },
    *fetchMemberList({ payload }, { call, put, select }) {
      const searchParam = yield select(state => state.applicationDissemination.searchParam);
      const { page } = payload;
      let params = '';
      if (searchParam && searchParam.memberName) {
        params += `name=${searchParam.memberName}`;
      }
      const res = yield call(fetchMemberListService, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'member',
            list: res.data.content,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
        });
      }
    },
    *fetchLocationList({ payload }, { call, put, select }) {
      const searchParam = yield select(state => state.applicationDissemination.searchParam);
      const { page } = payload;
      let params = '';
      if (searchParam && searchParam.locationName) {
        params += `name=${searchParam.locationName}`;
      }
      const res = yield call(fetchLocationListService, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'location',
            list: res.data.content,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
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
          [payload.key]: payload.value,
        },
      };
    },
    updateList(state, { payload }) {
      return {
        ...state,
        list: {
          ...state.list,
          [payload.key]: payload.list,
        },
        currentPage: {
          ...state.currentPage,
          [payload.key]: payload.currentPage,
        },
        totalElements: {
          ...state.totalElements,
          [payload.key]: payload.totalElements,
        },
      };
    },
  },
};
