import moment from 'moment';

import { fetchPopularizationReportType1Service } from '@/services/business/yilian-wechat/statistics/statistics';

export const POPULARIZATION_REPORT_TYPE = {
  TYPE1: 'TYPE1',
  TYPE2: 'TYPE2',
  TYPE3: 'TYPE3',
  TYPE4: 'TYPE4',
};

export const APPOINTMENTS_REPORT_TYPE = {
  TYPE1: 'TYPE1',
  TYPE2: 'TYPE2',
};

export default {
  namespace: 'businessYilianWechatStatistics',

  state: {
    reportType: {
      popularization: POPULARIZATION_REPORT_TYPE.TYPE1,
      appointments: APPOINTMENTS_REPORT_TYPE.TYPE1,
    },
    searchParams: {
      popularization: {
        // 推广数据统计搜索条件
        origin: {},
        [POPULARIZATION_REPORT_TYPE.TYPE1]: {
          startTime: moment(new Date().valueOf() - 11604800000).format('YYYY-MM-DD'),
          endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
          countType: 'day',
          groupName: '1组',
          project: '',
        },
        [POPULARIZATION_REPORT_TYPE.TYPE2]: {
          startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
          endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
          contentType: 'day',
        },
        [POPULARIZATION_REPORT_TYPE.TYPE3]: {
          startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
          endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
          contentType: 'day',
        },
        [POPULARIZATION_REPORT_TYPE.TYPE4]: {
          time: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        },
      },
      appointments: {},
    },
    list: {
      popularization: {
        // 推广数据统计列表
        origin: null,
        [POPULARIZATION_REPORT_TYPE.TYPE1]: null,
        [POPULARIZATION_REPORT_TYPE.TYPE2]: null,
        [POPULARIZATION_REPORT_TYPE.TYPE3]: null,
        [POPULARIZATION_REPORT_TYPE.TYPE4]: null,
      },
      appointments: {},
    },
    currentPage: {
      popularization: {
        origin: 0,
        [POPULARIZATION_REPORT_TYPE.TYPE1]: 0,
        [POPULARIZATION_REPORT_TYPE.TYPE2]: 0,
        [POPULARIZATION_REPORT_TYPE.TYPE3]: 0,
        [POPULARIZATION_REPORT_TYPE.TYPE4]: 0,
      },
      appointments: {},
    },
    totalElements: {
      popularization: {
        origin: 0,
        [POPULARIZATION_REPORT_TYPE.TYPE1]: 0,
        [POPULARIZATION_REPORT_TYPE.TYPE2]: 0,
        [POPULARIZATION_REPORT_TYPE.TYPE3]: 0,
        [POPULARIZATION_REPORT_TYPE.TYPE4]: 0,
      },
      appointments: {},
    },
    chart: {
      popularization: {
        [POPULARIZATION_REPORT_TYPE.TYPE1]: null,
        [POPULARIZATION_REPORT_TYPE.TYPE2]: null,
        [POPULARIZATION_REPORT_TYPE.TYPE3]: null,
        [POPULARIZATION_REPORT_TYPE.TYPE4]: null,
      },
      appointments: {},
    },
  },

  effects: {
    *fetchPopularizationReportType1({ payload }, { call, put, select }) {
      const searchParams = yield select(
        state =>
          state.businessYilianWechatStatistics.searchParams.popularization[
            POPULARIZATION_REPORT_TYPE.TYPE1
          ]
      );
      const { page } = payload;
      let params = '';
      if (searchParams && searchParams.startTime) {
        params += `&startTime=${searchParams.startTime}`;
      }
      if (searchParams && searchParams.endTime) {
        params += `&endTime=${searchParams.endTime}`;
      }
      if (searchParams && searchParams.countType) {
        params += `&countType=${searchParams.countType}`;
      }
      if (searchParams && searchParams.groupName) {
        params += `&groupName=${searchParams.groupName}`;
      }
      const res = yield call(fetchPopularizationReportType1Service, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            pageKey: 'popularization',
            typeKey: POPULARIZATION_REPORT_TYPE.TYPE1,
            list: res.data.content,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
        });
      }
    },
  },

  reducers: {
    updateReportType(state, { payload }) {
      return {
        ...state,
        reportType: {
          ...state.reportType,
          [payload.pageKey]: payload.reportType,
        },
      };
    },
    updateSearchParams(state, { payload }) {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          [payload.pageKey]: {
            ...state.searchParams[payload.pageKey],
            [payload.typeKey]: {
              ...state.searchParams[payload.pageKey][payload.typeKey],
              [payload.key]: payload.value,
            },
          },
        },
      };
    },
    updateList(state, { payload }) {
      return {
        ...state,
        list: {
          ...state.list,
          [payload.pageKey]: {
            ...state.list[payload.pageKey],
            [payload.typeKey]: payload.list,
          },
        },
        currentPage: {
          ...state.currentPage,
          [payload.pageKey]: {
            ...state.currentPage[payload.pageKey],
            [payload.typeKey]: payload.currentPage,
          },
        },
        totalElements: {
          ...state.totalElements,
          [payload.pageKey]: {
            ...state.totalElements[payload.pageKey],
            [payload.typeKey]: payload.totalElements,
          },
        },
      };
    },
    updateChart(state, { payload }) {
      return {
        ...state,
        chart: {
          ...state.chart,
          [payload.pageKey]: {
            ...state.chart[payload.pageKey],
            [payload.typeKey]: payload.chart,
          },
        },
      };
    },
  },
};
