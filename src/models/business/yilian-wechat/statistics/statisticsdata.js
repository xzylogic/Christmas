import moment from 'moment';

import {
  fetchPromoteAttentionAmountService,
  fetchAllHosNameService,
  fetchAllGroupNameService,
  fetchAppointmentsDataService,
  fetchHosTypeService,
  fetchHosGroupService,
} from '@/services/business/yilian-wechat/statistics/statisticsdata';

export const APPOINTMENTS_REPORT_TYPE = {
  TYPE1: 'TYPE1',
};

export default {
  namespace: 'businessYilianWechatStatisticDatas',

  state: {
    searchParam: {
      // 预约数据统计
      appointmentAttention: {
        startTime: moment(new Date().valueOf() - 2678400000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD'),
        countType: 'week',
        cityName: '',
        hosOrgCode: null,
        visitLevelCode: null,
        orderStatus: null,
        regChannel: null,
        chooseStartTime: moment(new Date().valueOf() - 31622400000).format('YYYY-MM-DD'),
        chooseEndTime: moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD'),
        type: 'day',
        isExport: false,
      },
      // 推广数据统计
      promoteAttention: {
        way: 'week',
        startTime: moment(new Date().valueOf() - 2678400000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        origin: '',
        // 医院名字
        hosName: '',
        // 医院等级
        hosGrade: null,
        group: '1',
        channel: '微信',
        hosType: null,
        orderStatus: null,
        // 医联微信
        orderStatusWechat: null,
        // 医联App
        orderStatusApp: null,
        chooseStartTime: moment(new Date().valueOf() - 31622400000).format('YYYY-MM-DD'),
        chooseEndTime: moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD'),
        isExport: false,
      },
    },
    list: {
      // 预约数据统计
      appointmentAttention: null,
      // 推广数据统计
      promoteAttention: null,
      // 所有医院名称
      allHosName: null,
      // 所有小组类别
      allGroupName: null,
      // 按类型查询到的医院名
      typeHosName: null,
      // 按小组查询到的医院名
      groupHosName: null,
    },
    currentPage: {
      appointmentAttention: 0,
      promoteAttention: 0,
    },
    totalElements: {
      appointmentAttention: 0,
      promoteAttention: 0,
    },
    // 详情页列表
    detailList: {
      appointmentAttention: 0,
      promoteAttention: 0,
    },
    detailCurrentPage: {
      appointmentAttention: 0,
      promoteAttention: 0,
    },
    datailTotalElements: {
      appointmentAttention: 0,
      promoteAttention: 0,
    },
  },

  effects: {
    *fetchAllHosName(_, { call, put }) {
      const res = yield call(fetchAllHosNameService);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'allHosName',
            list: res.data,
          },
        });
      }
    },
    *fetchAllGroupName(_, { call, put }) {
      const res = yield call(fetchAllGroupNameService);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'allGroupName',
            list: res.data,
          },
        });
      }
    },
    *fetchPromoteAttentionAmount({ payload }, { call, put, select }) {
      try {
        const { promoteAttention } = yield select(
          state => state.businessYilianWechatStatisticDatas.searchParam
        );
        const { way, page } = payload;
        let params = '';
        if (promoteAttention && promoteAttention.startTime) {
          params += `&startTime=${promoteAttention.startTime}`;
        }
        if (promoteAttention && promoteAttention.endTime) {
          params += `&endTime=${promoteAttention.endTime}`;
        }
        if (promoteAttention && promoteAttention.origin) {
          params += `&origin=${promoteAttention.origin}`;
        }
        if (promoteAttention && promoteAttention.hosName) {
          params += `&hosName=${promoteAttention.hosName}`;
        }
        if (promoteAttention && promoteAttention.hosGrade) {
          params += `&hosGrade=${promoteAttention.hosGrade}`;
        }
        if (promoteAttention && promoteAttention.channel) {
          params += `&promoCode=${promoteAttention.channel}`;
        }
        if (promoteAttention && promoteAttention.group) {
          params += `&groupId=${promoteAttention.group}`;
        }
        if (promoteAttention && !promoteAttention.isExport) {
          params += `&isExport=${promoteAttention.isExport}`;
        }
        const res = yield call(fetchPromoteAttentionAmountService, params, page, 10, way);
        if (res && res.code === 200) {
          yield put({
            type: 'updateList',
            payload: {
              key: 'promoteAttention',
              list: res.data.content,
              currentPage: page,
              totalElements: res.data.totalElements,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    *downloadPromoteAttentionAmount({ payload }, { call, select }) {
      const { promoteAttention } = yield select(
        state => state.businessYilianWechatStatisticDatas.searchParam
      );
      const { way, page } = payload;
      let params = '';
      if (promoteAttention && promoteAttention.startTime) {
        params += `&startTime=${promoteAttention.startTime}`;
      }
      if (promoteAttention && promoteAttention.endTime) {
        params += `&endTime=${promoteAttention.endTime}`;
      }
      if (promoteAttention && promoteAttention.origin) {
        params += `&origin=${promoteAttention.origin}`;
      }
      if (promoteAttention && promoteAttention.hosName) {
        params += `&hosName=${promoteAttention.hosName}`;
      }
      if (promoteAttention && promoteAttention.hosGrade) {
        params += `&hosGrade=${promoteAttention.hosGrade}`;
      }
      if (promoteAttention && promoteAttention.channel) {
        params += `&promoCode=${promoteAttention.channel}`;
      }
      if (promoteAttention && promoteAttention.group) {
        params += `&groupId=${promoteAttention.group}`;
      }
      if (promoteAttention && promoteAttention.isExport) {
        params += `&isExport=${promoteAttention.isExport}`;
      }
      const res = yield call(fetchPromoteAttentionAmountService, params, page, 10, way);

      let returnData = null;
      if (res && res.code === 200 && res.msg) {
        returnData = res.msg;
      }
      return returnData;
    },
    *fetchPromoteAttentionAmountDetail({ payload }, { call, put, select }) {
      try {
        const { promoteAttention } = yield select(
          state => state.businessYilianWechatStatisticDatas.searchParam
        );
        const { way, page } = payload;
        let params = '';
        if (promoteAttention && promoteAttention.chooseStartTime) {
          params += `&startTime=${promoteAttention.chooseStartTime}`;
        }
        if (promoteAttention && promoteAttention.chooseEndTime) {
          params += `&endTime=${promoteAttention.chooseEndTime}`;
        }
        if (promoteAttention && promoteAttention.origin) {
          params += `&origin=${promoteAttention.origin}`;
        }
        if (promoteAttention && promoteAttention.hosName) {
          params += `&hosName=${promoteAttention.hosName}`;
        }
        if (promoteAttention && promoteAttention.hosGrade) {
          params += `&hosGrade=${promoteAttention.hosGrade}`;
        }
        if (promoteAttention && promoteAttention.channel) {
          params += `&promoCode=${promoteAttention.channel}`;
        }
        if (promoteAttention && promoteAttention.group) {
          params += `&group=${promoteAttention.group}`;
        }
        if (promoteAttention && !promoteAttention.isExport) {
          params += `&isExport=${promoteAttention.isExport}`;
        }
        const res = yield call(fetchPromoteAttentionAmountService, params, page, 10, way);
        if (res && res.code === 200) {
          yield put({
            type: 'updateDetailList',
            payload: {
              key: 'promoteAttention',
              list: res.data.content,
              currentPage: page,
              totalElements: res.data.totalElements,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    *fetchAppointmentsData({ payload }, { call, select, put }) {
      const { appointmentAttention } = yield select(
        state => state.businessYilianWechatStatisticDatas.searchParam
      );
      const { page } = payload;
      let params = '';
      if (appointmentAttention && appointmentAttention.startTime) {
        params += `&startTime=${appointmentAttention.startTime}`;
      }
      if (appointmentAttention && appointmentAttention.endTime) {
        params += `&endTime=${appointmentAttention.endTime}`;
      }
      if (appointmentAttention && appointmentAttention.type) {
        params += `&countType=${appointmentAttention.countType}`;
      }
      if (appointmentAttention && appointmentAttention.cityName) {
        params += `&cityName=${appointmentAttention.cityName}`;
      }
      if (appointmentAttention && appointmentAttention.hosOrgCode) {
        params += `&hosOrgCode=${appointmentAttention.hosOrgCode}`;
      }
      if (appointmentAttention && appointmentAttention.visitLevelCode) {
        params += `&visitLevelCode=${appointmentAttention.visitLevelCode}`;
      }
      if (appointmentAttention && appointmentAttention.orderStatus) {
        params += `&orderStatus=${appointmentAttention.orderStatus}`;
      }
      if (appointmentAttention && appointmentAttention.regChannel) {
        params += `&regChannel=${appointmentAttention.regChannel}`;
      }
      if (appointmentAttention && !appointmentAttention.isExport) {
        params += `&isExport=${appointmentAttention.isExport}`;
      }
      const res = yield call(fetchAppointmentsDataService, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'appointmentAttention',
            list: res.data.content,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
        });
      }
    },
    *downloadAppointmentsData({ payload }, { call, select }) {
      const { appointmentAttention } = yield select(
        state => state.businessYilianWechatStatisticDatas.searchParam
      );
      const { page } = payload;
      let params = '';
      if (appointmentAttention && appointmentAttention.startTime) {
        params += `&startTime=${appointmentAttention.startTime}`;
      }
      if (appointmentAttention && appointmentAttention.endTime) {
        params += `&endTime=${appointmentAttention.endTime}`;
      }
      if (appointmentAttention && appointmentAttention.type) {
        params += `&countType=${appointmentAttention.countType}`;
      }
      if (appointmentAttention && appointmentAttention.cityName) {
        params += `&cityName=${appointmentAttention.cityName}`;
      }
      if (appointmentAttention && appointmentAttention.hosOrgCode) {
        params += `&hosOrgCode=${appointmentAttention.hosOrgCode}`;
      }
      if (appointmentAttention && appointmentAttention.visitLevelCode) {
        params += `&visitLevelCode=${appointmentAttention.visitLevelCode}`;
      }
      if (appointmentAttention && appointmentAttention.orderStatus) {
        params += `&orderStatus=${appointmentAttention.orderStatus}`;
      }
      if (appointmentAttention && appointmentAttention.regChannel) {
        params += `&regChannel=${appointmentAttention.regChannel}`;
      }
      if (appointmentAttention && appointmentAttention.isExport) {
        params += `&isExport=${appointmentAttention.isExport}`;
      }
      const res = yield call(fetchAppointmentsDataService, params, page, 10);
      let returnData = null;
      if (res && res.code === 200 && res.msg) {
        returnData = res.msg;
      }
      return returnData;
    },
    *fetchAppointmentsDataDetail({ payload }, { call, select, put }) {
      const { appointmentAttention } = yield select(
        state => state.businessYilianWechatStatisticDatas.searchParam
      );
      const { way, page } = payload;
      let params = '';
      if (appointmentAttention && appointmentAttention.chooseStartTime) {
        params += `&startTime=${appointmentAttention.chooseStartTime}`;
      }
      if (appointmentAttention && appointmentAttention.chooseEndTime) {
        params += `&endTime=${appointmentAttention.chooseEndTime}`;
      }
      if (appointmentAttention && appointmentAttention.type) {
        params += `&countType=${appointmentAttention.type}`;
      }
      if (appointmentAttention && appointmentAttention.cityName) {
        params += `&cityName=${appointmentAttention.cityName}`;
      }
      if (appointmentAttention && appointmentAttention.hosOrgCode) {
        params += `&hosOrgCode=${appointmentAttention.hosOrgCode}`;
      }
      if (appointmentAttention && appointmentAttention.visitLevelCode) {
        params += `&visitLevelCode=${appointmentAttention.visitLevelCode}`;
      }
      if (appointmentAttention && appointmentAttention.orderStatus) {
        params += `&orderStatus=${appointmentAttention.orderStatus}`;
      }
      if (appointmentAttention && appointmentAttention.regChannel) {
        params += `&regChannel=${appointmentAttention.regChannel}`;
      }
      if (appointmentAttention && !appointmentAttention.isExport) {
        params += `&isExport=${appointmentAttention.isExport}`;
      }
      const res = yield call(fetchAppointmentsDataService, params, page, 10, way);
      if (res && res.code === 200) {
        yield put({
          type: 'updateDetailList',
          payload: {
            key: 'appointmentAttention',
            list: res.data.content,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
        });
      }
    },
    *fetchHosType({ payload }, { call, select, put }) {
      const { appointmentAttention } = yield select(
        state => state.businessYilianWechatStatisticDatas.searchParam
      );
      const { page } = payload;
      let params = '';
      if (appointmentAttention && appointmentAttention.cityName) {
        params += `&cityName=${appointmentAttention.cityName}`;
      }
      const res = yield call(fetchHosTypeService, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'typeHosName',
            list: res.data,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
        });
      }
    },
    *fetchHosGroup({ payload }, { call, select, put }) {
      const { promoteAttention } = yield select(
        state => state.businessYilianWechatStatisticDatas.searchParam
      );
      const { page } = payload;
      let params = '';
      if (promoteAttention && promoteAttention.group) {
        params += `&groupId=${promoteAttention.group}`;
      }
      const res = yield call(fetchHosGroupService, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'groupHosName',
            list: res.data,
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
    updateChart(state, { payload }) {
      return {
        ...state,
        chart: {
          ...state.chart,
          [payload.key]: payload.chart,
          [payload.pageKey]: {
            ...state.chart[payload.pageKey],
            [payload.typeKey]: payload.chart,
          },
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
