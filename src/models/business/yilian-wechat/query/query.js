// import { message } from 'antd';
import moment from 'moment';

import {
  fetchGroupPerformanceService,
  fetchGroupPerformanceDetailService,
} from '@/services/business/yilian-wechat/query/query';

export default {
  namespace: 'businessYilianWechatQuery',

  state: {
    // 业绩查询 Tab
    performanceTab: '1',
    // 会员查询 Tab
    memberTab: '1',
    searchParam: {
      // 小组查询
      group: {
        startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        name: '',
        source: 'wechat',
      },
      // 人员查询
      member: {
        startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        name: '',
        source: 'wechat',
      },
      // 推广地点查询
      location: {
        startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        name: '',
        source: 'wechat',
      },
      // 会员查询
      membership: {},
      // 预约查询
      appointment: {},
    },
    list: {
      // 小组列表
      group: null,
      // 人员列表
      member: null,
      // 推广地点列表
      loaction: null,
      // 会员关注列表
      following: null,
      // 会员注册列表
      registration: null,
      // 预约列表
      appointment: null,
    },
    currentPage: {
      group: 0,
      member: 0,
      loaction: 0,
      following: 0,
      registration: 0,
      appointment: 0,
    },
    totalElements: {
      group: 0,
      member: 0,
      loaction: 0,
      following: 0,
      registration: 0,
      appointment: 0,
    },
    // 详情页列表
    detailList: {
      // 小组详情列表
      group: null,
      // 人员详情列表
      member: null,
      // 推广地点详情列表
      location: null,
    },
    detailCurrentPage: {
      group: 0,
      member: 0,
      location: 0,
    },
    datailTotalElements: {
      group: 0,
      member: 0,
      location: 0,
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
    updatePerformanceTab(state, { payload }) {
      return {
        ...state,
        performanceTab: payload.performanceTab,
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
