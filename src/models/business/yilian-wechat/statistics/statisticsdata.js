import moment from 'moment';

import {
  fetchPromoteAttentionAmountService,
  fetchAllHosNameService,
  fetchAllGroupNameService,
  fetchAppointmentsDataService,
  fetchAppointmentReportService,
} from '@/services/business/yilian-wechat/statistics/statisticsdata';

export default {
  namespace: 'businessYilianWechatStatisticDatas',

  state: {
    searchParam: {
      // 预约数据统计
      appointmentAttention: {
        // startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
        startTime: moment(new Date().valueOf() - 31536000000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        countType: null,
        cityName: null,
        hosOrgCode: null,
        visitLevelCode: null,
        orderStatus: null,
        regChannel: null,
      },
      // 推广数据统计
      promoteAttention: {
        way: 'week',
        startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
        // startTime: moment(new Date().valueOf() - 31536000000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        origin: '',
        // 医院名字
        hosName: '',
        // 医院等级
        hosGrade: null,
        group: null,
        channel: null,
        orderStatus: null,
        // 医联微信
        orderStatusWechat: null,
        // 医联App
        orderStatusApp: null,
      },
      appointmentReport: {
        startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
        // startTime: moment(new Date().valueOf() - 31536000000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        groupId: '',
        show: 'chart',
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
      // 按小组显示各医院预约量对比
      appointmentReport: null,
    },
    currentPage: {
      appointmentAttention: 0,
      promoteAttention: 0,
      appointmentReport: 0,
    },
    totalElements: {
      appointmentAttention: 0,
      promoteAttention: 0,
      appointmentReport: 0,
    },
    chart: {
      appointmentReport: null,
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
        // console.log(payload);
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
          params += `&channel=${promoteAttention.channel}`;
        }
        if (promoteAttention && promoteAttention.group) {
          params += `&groupId=${promoteAttention.group}`;
        }
        const res = yield call(fetchPromoteAttentionAmountService, way, params, page, 10);
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
    *fetchPromoteAttentionAmountDetail({ payload }, { call, put, select }) {
      console.log(payload);
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
          params += `&channel=${promoteAttention.channel}`;
        }
        if (promoteAttention && promoteAttention.group) {
          params += `&group=${promoteAttention.group}`;
        }
        const res = yield call(fetchPromoteAttentionAmountService, way, params, page, 10);
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
      console.log(appointmentAttention);
      const { page } = payload;
      let params = '';
      if (appointmentAttention && appointmentAttention.startTime) {
        params += `&startTime=${appointmentAttention.startTime}`;
      }
      if (appointmentAttention && appointmentAttention.endTime) {
        params += `&endTime=${appointmentAttention.endTime}`;
      }
      if (appointmentAttention && appointmentAttention.countType) {
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
      const res = yield call(fetchAppointmentsDataService, params, page, 10);
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
    *fetchAppointmentsDataDetail({ payload }, { call, select, put }) {
      const { appointmentAttention } = yield select(
        state => state.businessYilianWechatStatisticDatas.searchParam
      );
      const { way, page } = payload;
      let params = '';
      if (appointmentAttention && appointmentAttention.startTime) {
        params += `&startTime=${appointmentAttention.startTime}`;
      }
      if (appointmentAttention && appointmentAttention.endTime) {
        params += `&endTime=${appointmentAttention.endTime}`;
      }
      if (appointmentAttention && appointmentAttention.countType) {
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
      const res = yield call(fetchAppointmentsDataService, way, params, page, 10);
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
    *fetchAppointmentReport({ payload }, { call, put, select }) {
      const { appointmentReport } = yield select(
        state => state.businessYilianWechatStatisticDatas.searchParam
      );
      // const searchParams = yield select(
      //   state =>
      //     state.businessYilianWechatStatisticDatas.searchParams.popularization[
      //       POPULARIZATION_REPORT_TYPE.TYPE4
      //     ]
      // );
      const { page } = payload;
      let params = '';
      if (appointmentReport && appointmentReport.startTime) {
        params += `&startTime=${appointmentReport.startTime}`;
      }
      if (appointmentReport && appointmentReport.endTime) {
        params += `&endTime=${appointmentReport.endTime}`;
      }
      if (appointmentReport && appointmentReport.groupId) {
        params += `&groupId=${appointmentReport.groupId}`;
      }
      // if (searchParams && searchParams.time) {
      //   params += `&time=${searchParams.time}`;
      // }
      const res = yield call(fetchAppointmentReportService, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'appointmentReport',
            // typeKey: POPULARIZATION_REPORT_TYPE.TYPE4,
            list: res.data.content,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
        });
      }
    },
    *fetchAppointmentChart(_, { call, put, select }) {
      try {
        const { appointmentReport } = yield select(
          state => state.businessYilianWechatStatisticDatas.searchParam
        );
        // const { page } = payload;
        let params = '';
        if (appointmentReport && appointmentReport.startTime) {
          params += `&startTime=${appointmentReport.startTime}`;
        }
        if (appointmentReport && appointmentReport.endTime) {
          params += `&endTime=${appointmentReport.endTime}`;
        }
        if (appointmentReport && appointmentReport.groupId) {
          params += `&groupId=${appointmentReport.groupId}`;
        }
        const res = yield call(fetchAppointmentReportService, params, 0, 99999);
        if (res && res.code === 200) {
          yield put({
            type: 'updateChart',
            payload: {
              key: 'appointmentReport',
              chart: res.data.content,
              currentPage: 0,
              totalElements: res.data.totalElements,
            },
          });
        }
      } catch (err) {
        console.log(err);
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
      };
    },
    updateChart(state, { payload }) {
      return {
        ...state,
        chart: {
          ...state.chart,
          [payload.key]: payload.chart,
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
