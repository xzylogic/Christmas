import moment from 'moment';
import { message } from 'antd';
import {
  fetchYilianStatisticsService,
  fetchSearchHospitalsService,
  fetchHospitalBookDetailService,
  fetchHospitalCancelDetailService,
} from '@/services/statistics/yilian-statistics';

export const STATISTICS_TYPE = {
  USAGE_OF_HOSPITALS_NUMBERS: 'USAGE_OF_HOSPITALS_NUMBERS',
  AMOUNT_OF_HOSPITALS_APPOINTMENTS: 'AMOUNT_OF_HOSPITALS_APPOINTMENTS',
  AMOUNT_OF_HOSPITALS_REFUNDS: 'AMOUNT_OF_HOSPITALS_REFUNDS',
  AMOUNT_OF_HOSPITALS_FAILURES: 'AMOUNT_OF_HOSPITALS_FAILURES',
  AMOUNT_OF_CHANNELS_REGISTRATION: 'AMOUNT_OF_CHANNELS_REGISTRATION',
  AMOUNT_OF_CHANNELS_APPOINTMENTS: 'AMOUNT_OF_CHANNELS_APPOINTMENTS',
  AMOUNT_OF_CHANNELS_REFUNDS: 'AMOUNT_OF_CHANNELS_REFUNDS',
  AMOUNT_OF_CHANNELS_FAILURES: 'AMOUNT_OF_CHANNELS_FAILURES',
  AMOUNT_OF_DAILY_ACTIVENESS: 'AMOUNT_OF_DAILY_ACTIVENESS',
  AMOUNT_OF_DOWNLOAD: 'AMOUNT_OF_DOWNLOAD',
};

export const STATISTICS_ORIGIN = {
  SHI: 'shi',
  YILIAN: 'yilian',
  QU: 'qu',
};

export default {
  namespace: 'statistics',

  state: {
    searchParams: {
      [STATISTICS_TYPE.USAGE_OF_HOSPITALS_NUMBERS]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: {
          functionType: 'YYHY', // 各医院号源使用情况
          countType: 'day', // 统计方式
          startDate: moment(new Date().valueOf() - 2678400000),
          endDate: moment(new Date().valueOf() - 86400000),
          cityCode: '', // 医院类型
          orgId: '', // 医院ID
          isExclusive: '', // 号源类型
        },
        [STATISTICS_ORIGIN.QU]: null,
      },
      [STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_APPOINTMENTS]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: {
          functionType: 'YYYY', // 各医院预约量统计
          countType: 'day', // 统计方式
          startDate: moment(new Date().valueOf() - 2678400000),
          endDate: moment(new Date().valueOf() - 86400000),
          cityCode: '', // 医院类型
          orgId: '', // 医院ID
          isExclusive: '', // 号源类型
        },
        [STATISTICS_ORIGIN.QU]: null,
      },
      [STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_REFUNDS]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: {
          functionType: 'YYTH', // 各医院退号量统计
          countType: 'day', // 统计方式
          startDate: moment(new Date().valueOf() - 2678400000),
          endDate: moment(new Date().valueOf() - 86400000),
          cityCode: '', // 医院类型
          orgId: '', // 医院ID
          isExclusive: '', // 号源类型
        },
        [STATISTICS_ORIGIN.QU]: null,
      },
      [STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REGISTRATION]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: {
          functionType: 'QDZC', // 各渠道注册量统计
          countType: 'day', // 统计方式
          startDate: moment(new Date().valueOf() - 2678400000),
          endDate: moment(new Date().valueOf() - 86400000),
          cityCode: '', // 医院类型
          orgId: '', // 医院ID
          isExclusive: '', // 号源类型
        },
        [STATISTICS_ORIGIN.QU]: null,
      },
      [STATISTICS_TYPE.AMOUNT_OF_CHANNELS_APPOINTMENTS]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: {
          functionType: 'QDYY', // 各渠道预约量统计
          countType: 'day', // 统计方式
          startDate: moment(new Date().valueOf() - 2678400000),
          endDate: moment(new Date().valueOf() - 86400000),
          cityCode: '', // 医院类型
          orgId: '', // 医院ID
          isExclusive: '', // 号源类型
        },
        [STATISTICS_ORIGIN.QU]: null,
      },
      [STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REFUNDS]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: {
          functionType: 'QDTH', // 各渠道退号量统计
          countType: 'day', // 统计方式
          startDate: moment(new Date().valueOf() - 2678400000),
          endDate: moment(new Date().valueOf() - 86400000),
          cityCode: '', // 医院类型
          orgId: '', // 医院ID
          isExclusive: '', // 号源类型
        },
        [STATISTICS_ORIGIN.QU]: null,
      },
    },
    list: {
      [STATISTICS_TYPE.USAGE_OF_HOSPITALS_NUMBERS]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: null,
        [STATISTICS_ORIGIN.QU]: null,
      },
      [STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_APPOINTMENTS]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: null,
        [STATISTICS_ORIGIN.QU]: null,
      },
      [STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_REFUNDS]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: null,
        [STATISTICS_ORIGIN.QU]: null,
      },
      [STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REGISTRATION]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: null,
        [STATISTICS_ORIGIN.QU]: null,
      },
      [STATISTICS_TYPE.AMOUNT_OF_CHANNELS_APPOINTMENTS]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: null,
        [STATISTICS_ORIGIN.QU]: null,
      },
      [STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REFUNDS]: {
        [STATISTICS_ORIGIN.SHI]: null,
        [STATISTICS_ORIGIN.YILIAN]: null,
        [STATISTICS_ORIGIN.QU]: null,
      },
    },
    hospitals: {
      [STATISTICS_TYPE.USAGE_OF_HOSPITALS_NUMBERS]: {
        [STATISTICS_ORIGIN.SHI]: [],
        [STATISTICS_ORIGIN.YILIAN]: [],
        [STATISTICS_ORIGIN.QU]: [],
      },
      [STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_APPOINTMENTS]: {
        [STATISTICS_ORIGIN.SHI]: [],
        [STATISTICS_ORIGIN.YILIAN]: [],
        [STATISTICS_ORIGIN.QU]: [],
      },
      [STATISTICS_TYPE.AMOUNT_OF_HOSPITALS_REFUNDS]: {
        [STATISTICS_ORIGIN.SHI]: [],
        [STATISTICS_ORIGIN.YILIAN]: [],
        [STATISTICS_ORIGIN.QU]: [],
      },
      [STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REGISTRATION]: {
        [STATISTICS_ORIGIN.SHI]: [],
        [STATISTICS_ORIGIN.YILIAN]: [],
        [STATISTICS_ORIGIN.QU]: [],
      },
      [STATISTICS_TYPE.AMOUNT_OF_CHANNELS_APPOINTMENTS]: {
        [STATISTICS_ORIGIN.SHI]: [],
        [STATISTICS_ORIGIN.YILIAN]: [],
        [STATISTICS_ORIGIN.QU]: [],
      },
      [STATISTICS_TYPE.AMOUNT_OF_CHANNELS_REFUNDS]: {
        [STATISTICS_ORIGIN.SHI]: [],
        [STATISTICS_ORIGIN.YILIAN]: [],
        [STATISTICS_ORIGIN.QU]: [],
      },
    },
  },

  effects: {
    *fetchYilianStatistics({ payload }, { select, call, put }) {
      const { type, origin } = payload;
      const searchParam = yield select(state => state.statistics.searchParams[type][origin]);
      const postData = {};
      Object.keys(searchParam).forEach(key => {
        if (key === 'startDate' || key === 'endDate') {
          if (searchParam.countType === 'day') {
            postData[key] = moment(searchParam[key]).format('YYYY-MM-DD');
          }
          if (searchParam.countType === 'month') {
            postData[key] = moment(searchParam[key]).format('YYYY-MM');
          }
          if (searchParam.countType === 'year') {
            postData[key] = moment(searchParam[key]).format('YYYY');
          }
        } else if (searchParam[key]) {
          postData[key] = searchParam[key];
        }
      });
      postData.queryType = 0;
      const res = yield call(fetchYilianStatisticsService, postData);
      if (res && res.code === 200) {
        yield put({
          type: 'updateDataList',
          payload: {
            type,
            origin,
            value: res.data,
          },
        });
      } else {
        message.error((res && res.msg) || '获取数据错误');
        yield put({
          type: 'updateDataList',
          payload: {
            type,
            origin,
            value: [],
          },
        });
      }
    },
    *exportYilianStatistics({ payload }, { select, call }) {
      const { type, origin } = payload;
      const searchParam = yield select(state => state.statistics.searchParams[type][origin]);
      const postData = {};
      Object.keys(searchParam).forEach(key => {
        if (key === 'startDate' || key === 'endDate') {
          if (searchParam.countType === 'day') {
            postData[key] = moment(searchParam[key]).format('YYYY-MM-DD');
          }
          if (searchParam.countType === 'month') {
            postData[key] = moment(searchParam[key]).format('YYYY-MM');
          }
          if (searchParam.countType === 'year') {
            postData[key] = moment(searchParam[key]).format('YYYY');
          }
        } else if (searchParam[key]) {
          postData[key] = searchParam[key];
        }
      });
      postData.queryType = 1;
      const res = yield call(fetchYilianStatisticsService, postData);
      let returnData = '';
      if (res && res.code === 200 && res.data) {
        returnData = res.data;
      }
      return returnData;
    },
    *fetchHospitalBookDetail({ payload }, { select, call }) {
      const { type, origin, orgId } = payload;
      const searchParam = yield select(state => state.statistics.searchParams[type][origin]);
      const searchData = {};
      if (searchParam.countType === 'day') {
        searchData.startDate = moment(searchParam.startDate).format('YYYY-MM-DD');
        searchData.endDate = moment(searchParam.endDate).format('YYYY-MM-DD');
      }
      if (searchParam.countType === 'month') {
        searchData.startDate = moment(searchParam.startDate).format('YYYY-MM');
        searchData.endDate = moment(searchParam.endDate).format('YYYY-MM');
      }
      if (searchParam.countType === 'year') {
        searchData.startDate = moment(searchParam.startDate).format('YYYY');
        searchData.endDate = moment(searchParam.endDate).format('YYYY');
      }
      searchData.countType = searchParam.countType;
      searchData.orgId = orgId;
      const res = yield call(fetchHospitalBookDetailService, searchData);
      return res;
    },
    *fetchHospitalCancelDetail({ payload }, { select, call }) {
      const { type, origin, orgId } = payload;
      const searchParam = yield select(state => state.statistics.searchParams[type][origin]);
      const searchData = {};
      if (searchParam.countType === 'day') {
        searchData.startDate = moment(searchParam.startDate).format('YYYY-MM-DD');
        searchData.endDate = moment(searchParam.endDate).format('YYYY-MM-DD');
      }
      if (searchParam.countType === 'month') {
        searchData.startDate = moment(searchParam.startDate).format('YYYY-MM');
        searchData.endDate = moment(searchParam.endDate).format('YYYY-MM');
      }
      if (searchParam.countType === 'year') {
        searchData.startDate = moment(searchParam.startDate).format('YYYY');
        searchData.endDate = moment(searchParam.endDate).format('YYYY');
      }
      searchData.countType = searchParam.countType;
      searchData.orgId = orgId;
      const res = yield call(fetchHospitalCancelDetailService, searchData);
      return res;
    },
    *fetchSearchHospitals({ payload }, { select, call, put }) {
      const { type, origin } = payload;
      const searchParam = yield select(state => state.statistics.searchParams[type][origin]);
      const { cityCode } = searchParam;
      const res = yield call(fetchSearchHospitalsService, cityCode);
      if (res && res.code === 200) {
        yield put({
          type: 'updateHospitals',
          payload: {
            type,
            origin,
            value: res.data,
          },
        });
      }
      yield put({
        type: 'updateSearchParams',
        payload: {
          type,
          origin,
          key: 'orgId',
          value: '',
        },
      });
    },
  },

  reducers: {
    updateSearchParams(state, { payload }) {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          [payload.type]: {
            ...state.searchParams[payload.type],
            [payload.origin]: {
              ...state.searchParams[payload.type][payload.origin],
              [payload.key]: payload.value,
            },
          },
        },
      };
    },
    updateDataList(state, { payload }) {
      return {
        ...state,
        list: {
          ...state.list,
          [payload.type]: {
            ...state.list[payload.type],
            [payload.origin]: payload.value,
          },
        },
      };
    },
    updateHospitals(state, { payload }) {
      return {
        ...state,
        hospitals: {
          ...state.hospitals,
          [payload.type]: {
            ...state.hospitals[payload.type],
            [payload.origin]: payload.value,
          },
        },
      };
    },
  },
};
