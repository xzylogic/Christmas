import moment from 'moment';

import {
  fetchAllGroupNameService,
  fetchAppointmentReportType1Service,
} from '@/services/business/yilian-wechat/statistics/statisticsdata';

export const APPOINTMENTS_REPORT_TYPE = {
  TYPE1: 'TYPE1',
};

export default {
  namespace: 'businessYilianWechatStatisticsAppointment',

  state: {
    searchGroupList: [],
    reportType: {
      appointments: APPOINTMENTS_REPORT_TYPE.TYPE1,
    },
    searchParams: {
      appointments: {
        // 预约数据统计搜索条件
        origin: {},
        [APPOINTMENTS_REPORT_TYPE.TYPE1]: {
          startTime: moment(new Date().valueOf() - 2678400000).format('YYYY-MM-DD'),
          endTime: `${moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD')} 24`,
          groupName: '',
          show: 'chart',
          isExport: false,
        },
      },
    },
    list: {
      appointments: {
        // 预约数据统计列表
        origin: null,
        [APPOINTMENTS_REPORT_TYPE.TYPE1]: null,
      },
    },
    currentPage: {
      appointments: {
        origin: 0,
        [APPOINTMENTS_REPORT_TYPE.TYPE1]: 0,
      },
    },
    totalElements: {
      appointments: {
        origin: 0,
        [APPOINTMENTS_REPORT_TYPE.TYPE1]: 0,
      },
    },
    chart: {
      appointments: {
        [APPOINTMENTS_REPORT_TYPE.TYPE1]: null,
      },
    },
  },

  effects: {
    *fetchSearchGroupList(_, { call, put, select }) {
      const { searchGroupList } = yield select(
        state => state.businessYilianWechatStatisticsAppointment
      );
      if (searchGroupList && searchGroupList.length === 0) {
        const res = yield call(fetchAllGroupNameService);
        if (res && res.code === 200 && res.data && res.data[0]) {
          yield put({
            type: 'updateSearchGroupList',
            payload: res.data,
          });
          // yield put({
          //   type: 'updateSearchParams',
          //   payload: {
          //     pageKey: 'appointments',
          //     typeKey: APPOINTMENTS_REPORT_TYPE.TYPE1,
          //     key: 'groupName',
          //     value: res.data[0].name,
          //   },
          // });
        }
      }
    },
    *fetchAppointmentReportType1({ payload }, { call, put, select }) {
      yield put({ type: 'fetchSearchGroupList' });
      const searchParams = yield select(
        state =>
          state.businessYilianWechatStatisticsAppointment.searchParams.appointments[
            APPOINTMENTS_REPORT_TYPE.TYPE1
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
      if (searchParams && searchParams.groupName) {
        params += `&groupId=${searchParams.groupName}`;
      }
      if (searchParams && !searchParams.isExport) {
        params += `&isExport=${searchParams.isExport}`;
      }
      const res = yield call(fetchAppointmentReportType1Service, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            pageKey: 'appointments',
            typeKey: APPOINTMENTS_REPORT_TYPE.TYPE1,
            list: res.data.content,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
        });
      }
    },
    *downloadAppointmentReportType1({ payload }, { call, put, select }) {
      yield put({ type: 'fetchSearchGroupList' });
      const searchParams = yield select(
        state =>
          state.businessYilianWechatStatisticsAppointment.searchParams.appointments[
            APPOINTMENTS_REPORT_TYPE.TYPE1
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
      if (searchParams && searchParams.groupName) {
        params += `&groupId=${searchParams.groupName}`;
      }
      if (searchParams && searchParams.isExport) {
        params += `&isExport=${searchParams.isExport}`;
      }
      const res = yield call(fetchAppointmentReportType1Service, params, page, 10);

      let returnData = null;
      if (res && res.code === 200 && res.msg) {
        returnData = res.msg;
      }
      return returnData;
    },
    *fetchAppointmentChartType1(_, { call, put, select }) {
      const searchParams = yield select(
        state =>
          state.businessYilianWechatStatisticsAppointment.searchParams.appointments[
            APPOINTMENTS_REPORT_TYPE.TYPE1
          ]
      );
      let params = '';
      if (searchParams && searchParams.startTime) {
        params += `&startTime=${searchParams.startTime}`;
      }
      if (searchParams && searchParams.endTime) {
        params += `&endTime=${searchParams.endTime}`;
      }
      if (searchParams && searchParams.groupName) {
        params += `&groupId=${searchParams.groupName}`;
      }
      if (searchParams && !searchParams.isExport) {
        params += `&isExport=${searchParams.isExport}`;
      }
      const res = yield call(fetchAppointmentReportType1Service, params, 0, 99999);
      if (res && res.code === 200) {
        yield put({
          type: 'updateChart',
          payload: {
            pageKey: 'appointments',
            typeKey: APPOINTMENTS_REPORT_TYPE.TYPE1,
            chart: res.data.content,
          },
        });
      }
    },
  },

  reducers: {
    updateSearchGroupList(state, { payload }) {
      return {
        ...state,
        searchGroupList: payload,
      };
    },
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
