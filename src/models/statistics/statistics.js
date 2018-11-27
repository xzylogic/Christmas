// import { message } from 'antd';

export const STATISTICS_TYPE = {
  USAGE_OF_HOSPITALS_NUMBERS: 'usageOfHospitalsNumbers',
  AMOUNT_OF_HOSPITALS_APPOINTMENTS: 'amountOfHospitalsAppointments',
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
      usageOfHospitalsNumbers: {
        shi: null,
        yilian: null,
        qu: null,
      },
      amountOfHospitalsAppointments: {
        shi: null,
        yilian: null,
        qu: null,
      },
    },
    list: {
      usageOfHospitalsNumbers: {
        shi: null,
        yilian: null,
        qu: null,
      },
      amountOfHospitalsAppointments: {
        shi: null,
        yilian: null,
        qu: null,
      },
    },
  },

  effects: {
    *fetchDataList({ payload }, { select }) {
      console.log(payload);
      const { searchParam } = yield select(state => state.statistics);
      console.log(searchParam);
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
  },
};
