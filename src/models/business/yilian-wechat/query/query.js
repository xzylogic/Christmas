// import { message } from 'antd';
import moment from 'moment';

import {
  fetchGroupPerformanceService,
  fetchGroupPerformanceDetailService,
} from '@/services/business/yilian-wechat/query/query';

export default {
  namespace: 'businessYilianWechatQuery',

  state: {
    queryTab: '1',
    searchParam: {
      group: {
        startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        name: '',
        source: 'wechat',
      },
    },
    list: {
      group: null,
    },
    currentPage: {
      group: 0,
    },
    totalElements: {
      group: 0,
    },
    detailList: {
      group: null,
    },
    detailCurrentPage: {
      group: 0,
    },
    datailTotalElements: {
      group: 0,
    },
  },

  effects: {
    *fetchGroupPerformance({ payload }, { call, put, select }) {
      const { group } = yield select(state => state.businessYilianWechatQuery.searchParam);
      const { page } = payload;
      let params = '';
      if (group && group.startTime) {
        params += `&startTime=${group.startTime}`;
      }
      if (group && group.endTime) {
        params += `&endTime=${group.endTime}`;
      }
      if (group && group.name) {
        params += `&name=${group.name}`;
      }
      // if (group && group.source) {
      //   params += `&source=${group.source}`;
      // }
      const res = yield call(fetchGroupPerformanceService, params, page, 10);
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
    *fetchGroupPerformanceDetail({ payload }, { call, select, put }) {
      const { group } = yield select(state => state.businessYilianWechatQuery.searchParam);
      const { way, name, page } = payload;
      let params = '';
      if (group && group.startTime) {
        params += `&startTime=${group.startTime}`;
      }
      if (group && group.endTime) {
        params += `&endTime=${group.endTime}`;
      }
      if (name) {
        params += `&name=${name}`;
      }
      const res = yield call(fetchGroupPerformanceDetailService, way, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateDetailList',
          payload: {
            key: 'group',
            list: res.data.content,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
        });
      }
    },
  },

  reducers: {
    updateQueryTab(state, { payload }) {
      return {
        ...state,
        queryTab: payload.queryTab,
      };
    },
    updateSearchParam(state, { payload }) {
      return {
        ...state,
        searchParam: {
          ...state.searchParam,
          [payload.origin]: {
            ...state.searchParam[payload.origin],
            [payload.key]: payload.value,
          },
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
    updateDetailList(state, { payload }) {
      return {
        ...state,
        detailList: {
          ...state.list,
          [payload.key]: payload.list,
        },
        detailCurrentPage: {
          ...state.currentPage,
          [payload.key]: payload.currentPage,
        },
        datailTotalElements: {
          ...state.totalElements,
          [payload.key]: payload.totalElements,
        },
      };
    },
  },
};
