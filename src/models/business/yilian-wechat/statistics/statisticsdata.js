import moment from 'moment';

import {
  fetchPromoteAttentionAmountService,
  fetchAllHosNameService,
  fetchAllGroupNameService,
  fetchAppointmentsDataService,
  fetchHosTypeService,
  fetchHosGroupService,
  // 写完下行注释
  fetchAppointmentReportService,
  fetchAppointmentReportType1Service,
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
        // startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
        startTime: moment(new Date().valueOf() - 31536000000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        countType: 'week',
        cityName: null,
        hosOrgCode: null,
        visitLevelCode: null,
        orderStatus: null,
        regChannel: null,
        type: 'day',
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
        channel: '微信',
        hosType: null,
        orderStatus: null,
        // 医联微信
        orderStatusWechat: null,
        // 医联App
        orderStatusApp: null,

        // promoCode  hosName  groupId   hosType
      },
      appointmentReport: {
        startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
        // startTime: moment(new Date().valueOf() - 31536000000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        groupId: '1组',
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
      // 按类型查询到的医院名
      typeHosName: null,
      // 按小组查询到的医院名
      groupHosName: null,
      // 修改预约数据统计
      appointments: {
        // 预约数据统计列表
        origin: null,
        [APPOINTMENTS_REPORT_TYPE.TYPE1]: null,
      },
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
      appointments: {
        origin: 0,
        [APPOINTMENTS_REPORT_TYPE.TYPE1]: 0,
      },
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
    // 修改预约数据统计
    searchGroupList: [],
    reportType: {
      appointments: APPOINTMENTS_REPORT_TYPE.TYPE1,
    },
    // searchParams: {
    //   appointments: {
    //     // 预约数据统计搜索条件
    //     origin: {},
    //     [APPOINTMENTS_REPORT_TYPE.TYPE1]: {
    //       startTime: moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD'),
    //       endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
    //       countType: 'day',
    //       groupName: '',
    //     },
    //   },
    // },
    // lists: {
    //   appointments: {
    //     // 预约数据统计列表
    //     origin: null,
    //     [APPOINTMENTS_REPORT_TYPE.TYPE1]: null,
    //   },
    // },
    // currentPages: {
    //   appointments: {
    //     origin: 0,
    //     [APPOINTMENTS_REPORT_TYPE.TYPE1]: 0,
    //   },
    // },
    // totalElement: {
    //   appointments: {
    //     origin: 0,
    //     [APPOINTMENTS_REPORT_TYPE.TYPE1]: 0,
    //   },
    // },
    // charts: {
    //   appointments: {
    //     origin: 0,
    //     [APPOINTMENTS_REPORT_TYPE.TYPE1]: 0,
    //   },
    // },
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
      // console.log(appointmentAttention);
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
    *fetchAppointmentsDataDetail({ payload }, { call, select, put }) {
      console.log(payload);
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
      // console.log(appointmentAttention);
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
    *fetchAppointmentReport({ payload }, { call, put, select }) {
      const { appointmentReport } = yield select(
        state => state.businessYilianWechatStatisticDatas.searchParam
      );
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
      const res = yield call(fetchAppointmentReportService, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'appointmentReport',
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
    // 修改预约数据统计
    *fetchSearchGroupList(_, { call, put, select }) {
      const { searchGroupList } = yield select(state => state.businessYilianWechatStatisticDatas);
      if (searchGroupList && searchGroupList.length === 0) {
        const res = yield call(fetchAllGroupNameService);
        if (res && res.code === 200 && res.data && res.data[0]) {
          yield put({
            type: 'updateSearchGroupList',
            payload: res.data,
          });
          yield put({
            type: 'updateSearchParam',
            payload: {
              pageKey: 'appointments',
              typeKey: APPOINTMENTS_REPORT_TYPE.TYPE1,
              key: 'groupName',
              value: res.data[0].name,
            },
          });
        }
      }
    },
    *fetchAppointmentReportType1({ payload }, { call, put, select }) {
      console.log('report');
      yield put({ type: 'fetchSearchGroupList' });
      const searchParam = yield select(
        state =>
          state.businessYilianWechatStatisticDatas.searchParam.appointments[
            APPOINTMENTS_REPORT_TYPE.TYPE1
          ]
      );
      const { page } = payload;
      let params = '';
      if (searchParam && searchParam.startTime) {
        params += `&startTime=${searchParam.startTime}`;
      }
      if (searchParam && searchParam.endTime) {
        params += `&endTime=${searchParam.endTime}`;
      }
      if (searchParam && searchParam.groupName) {
        params += `&groupId=${searchParam.groupName}`;
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
    *fetchAppointmentChartType1(_, { call, put, select }) {
      try {
        const searchParam = yield select(
          state =>
            state.businessYilianWechatStatisticDatas.searchParam.appointments[
              APPOINTMENTS_REPORT_TYPE.TYPE1
            ]
        );
        let params = '';
        if (searchParam && searchParam.startTime) {
          params += `&startTime=${searchParam.startTime}`;
        }
        if (searchParam && searchParam.endTime) {
          params += `&endTime=${searchParam.endTime}`;
        }
        if (searchParam && searchParam.groupName) {
          params += `&groupId=${searchParam.groupName}`;
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
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    updateSearchParam(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        searchParam: {
          ...state.searchParam,
          [payload.origin]: {
            ...state.searchParam[payload.origin],
            [payload.key]: payload.value,
          },

          // [payload.pageKey]: {
          //   ...state.searchParam[payload.pageKey],
          //   [payload.typeKey]: {
          //     ...state.searchParam[payload.pageKey][payload.typeKey],
          //     [payload.key]: payload.value,
          //   },
          // },
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
    // 修改预约数据统计
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
    // updateSearchParams(state, { payload }) {
    //   return {
    //     ...state,
    //     searchParams: {
    //       ...state.searchParams,
    //       [payload.pageKey]: {
    //         ...state.searchParams[payload.pageKey],
    //         [payload.typeKey]: {
    //           ...state.searchParams[payload.pageKey][payload.typeKey],
    //           [payload.key]: payload.value,
    //         },
    //       },
    //     },
    //   };
    // },
    // updateLists(state, { payload }) {
    //   return {
    //     ...state,
    //     lists: {
    //       ...state.list,
    //       [payload.pageKey]: {
    //         ...state.lists[payload.pageKey],
    //         [payload.typeKey]: payload.lists,
    //       },
    //     },
    //     currentPages: {
    //       ...state.currentPages,
    //       [payload.pageKey]: {
    //         ...state.currentPages[payload.pageKey],
    //         [payload.typeKey]: payload.currentPages,
    //       },
    //     },
    //     totalElements: {
    //       ...state.totalElements,
    //       [payload.pageKey]: {
    //         ...state.totalElements[payload.pageKey],
    //         [payload.typeKey]: payload.totalElements,
    //       },
    //     },
    //   };
    // },
    // updateCharts(state, { payload }) {
    //   return {
    //     ...state,
    //     chart: {
    //       ...state.chart,
    //       [payload.pageKey]: {
    //         ...state.chart[payload.pageKey],
    //         [payload.typeKey]: payload.chart,
    //       },
    //     },
    //   };
    // },
  },
};
