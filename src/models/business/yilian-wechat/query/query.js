import moment from 'moment';
import { message } from 'antd';

import {
  fetchGroupPerformanceService,
  fetchGroupPerformanceDetailService,
  createGroupMonthService,
  fetchMemberService,
  fetchMemberPerformanceDetailService,
  createMemberMonthService,
  fetchLocationService,
  fetchLocationPerformanceDetailService,
  getQueryMessageService,
  fetchGroupMonthService,
  fetchMemberMonthService,
  fetchMembershipPerformanceDetail,
  fetchHosnameService,
  fetchallPersonService,
  fetchAppointmentService,
} from '@/services/business/yilian-wechat/query/query';

const getListCounts = list => {
  let listCopy = [];
  if (list && Array.isArray(list)) {
    listCopy = [...list];
    const initialValue = {
      counts: 0,
      hos: 0,
      online: 0,
      person: 0,
      unFollow: 0,
    };
    if (listCopy.length > 0) {
      const listCounts = listCopy.reduce(
        (preObj, obj) => ({
          counts: preObj.counts + obj.counts,
          hos: preObj.hos + obj.hos,
          online: preObj.online + obj.online,
          person: preObj.person + obj.person,
          unFollow: preObj.unFollow + obj.unFollow,
        }),
        initialValue
      );
      listCounts.appName = '合计';
      listCopy.push(listCounts);
    }
  }
  return listCopy;
};

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
      membership: {
        type: '0',
        startTime: moment(new Date().valueOf() - 2592000000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        name: '',
        hosName: '',
        queryType: null,
      },
      // 预约查询
      appointment: {
        type: 'create_time',
        startTime: moment(new Date().valueOf() - 2592000000).format('YYYY-MM-DD'),
        endTime: moment(new Date().valueOf()).format('YYYY-MM-DD'),
        // 预约状态
        orderStatus: '',
        // 预约来源
        regChannel: '',
        // 患者姓名
        patientName: '',
        // 患者手机
        patientPhone: '',
        // 患者卡号
        mediCardId: '',
        // 患者身份证号
        patientCardId: '',
        // 医生工号
        hosDocCode: '',
      },
    },
    list: {
      // 小组列表
      group: null,
      // 人员列表
      member: null,
      // 推广地点列表
      location: null,
      // 会员关注列表
      following: null,
      // 会员注册列表
      registration: null,
      // 预约列表
      appointmentList: null,
      // 小组列表
      queryMessage: null,
      fetchMessage: null,
      fetchMemberMessage: null,
      // 医院列表
      fetchhosName: null,
      // 所有推广人员列表
      fetchallPerson: null,
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
      try {
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
      } catch (err) {
        console.log(err);
      }
    },
    *createGroupMonthAmount({ payload }, { call, put }) {
      const { postData } = payload;
      const res = yield call(createGroupMonthService, postData);
      let ifsuccess = false;
      if (res && res.code === 200) {
        ifsuccess = true;
        yield put({ type: 'fetchGroupPerformance', payload: { page: 0 } });
        message.success('设置小组月指标量成功！');
      } else {
        message.error('设置小组月指标量失败！');
      }
      return ifsuccess;
    },
    *fetchMembership(_, { call, put, select }) {
      try {
        const { membership } = yield select(state => state.businessYilianWechatQuery.searchParam);
        let params = '';
        if (membership && membership.type !== '') {
          params += `?type=${membership.type}`;
        }
        if (membership && membership.startTime) {
          params += `&startTime=${membership.startTime}`;
        }
        if (membership && membership.endTime) {
          params += `&endTime=${membership.endTime}`;
        }
        if (membership && membership.name) {
          params += `&name=${membership.name}`;
        }
        if (membership && membership.hosName) {
          params += `&hosName=${membership.hosName}`;
          // yield put({
          //   type: 'updateSearchParam',
          //   payload: {
          //     key: 'membership',
          //     hosName: membership.hosName,
          //     name:'',
          //   },
          // });
        }
        const res = yield call(fetchMembershipPerformanceDetail, params, 0, 10);
        if (res && res.code === 200) {
          yield put({
            type: 'updateList',
            payload: {
              key: 'following',
              list: getListCounts(res.data.focus),
              currentPage: 0,
              totalElements: 0,
            },
          });
          yield put({
            type: 'updateList',
            payload: {
              key: 'registration',
              list: getListCounts(res.data.register),
              currentPage: 0,
              totalElements: 0,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    *fetchMemberPerformance({ payload }, { call, put, select }) {
      const { member } = yield select(state => state.businessYilianWechatQuery.searchParam);
      const { page } = payload;
      let params = '';
      if (member && member.startTime) {
        params += `&startTime=${member.startTime}`;
      }
      if (member && member.endTime) {
        params += `&endTime=${member.endTime}`;
      }
      if (member && member.name) {
        params += `&name=${member.name}`;
      }
      // if (member && member.source) {
      //   params += `&source=${member.source}`;
      // }
      const res = yield call(fetchMemberService, params, page, 10);
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
    *fetchMemberPerformanceDetail({ payload }, { call, select, put }) {
      try {
        const { member } = yield select(state => state.businessYilianWechatQuery.searchParam);
        const { way, name } = payload;
        let params = '';
        if (member && member.startTime) {
          params += `?startTime=${member.startTime}`;
        }
        if (member && member.endTime) {
          params += `&endTime=${member.endTime}`;
        }
        if (name) {
          params += `&name=${name}`;
        }
        const res = yield call(fetchMemberPerformanceDetailService, way, params);
        if (res && res.code === 200) {
          yield put({
            type: 'updateDetailList',
            payload: {
              key: 'member',
              list: res.data.content,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    *createMemberMonthAmount({ payload }, { call, put }) {
      const { postData } = payload;
      const res = yield call(createMemberMonthService, postData);
      let ifsuccess = false;
      if (res && res.code === 200) {
        ifsuccess = true;
        yield put({ type: 'fetchMemberPerformance', payload: { page: 0 } });
        message.success('设置成员月指标量成功！');
      } else {
        message.error('设置成员月指标量失败！');
      }
      return ifsuccess;
    },
    *fetchLocationPerformance({ payload }, { call, put, select }) {
      const { location } = yield select(state => state.businessYilianWechatQuery.searchParam);
      const { page } = payload;
      let params = '';
      if (location && location.startTime) {
        params += `&startTime=${location.startTime}`;
      }
      if (location && location.endTime) {
        params += `&endTime=${location.endTime}`;
      }
      if (location && location.name) {
        params += `&name=${location.name}`;
      }
      // if (location && location.source) {
      //   params += `&source=${location.source}`;
      // }
      const res = yield call(fetchLocationService, params, page, 10);
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
    *fetchLocationPerformanceDetail({ payload }, { call, select, put }) {
      const { location } = yield select(state => state.businessYilianWechatQuery.searchParam);
      const { way, name, page } = payload;
      let params = '';
      if (location && location.startTime) {
        params += `&startTime=${location.startTime}`;
      }
      if (location && location.endTime) {
        params += `&endTime=${location.endTime}`;
      }
      if (name) {
        params += `&name=${name}`;
      }
      const res = yield call(fetchLocationPerformanceDetailService, way, params, page, 10);
      if (res && res.code === 200) {
        yield put({
          type: 'updateDetailList',
          payload: {
            key: 'location',
            list: res.data.content,
            currentPage: page,
            totalElements: res.data.totalElements,
          },
        });
      }
    },
    *getQueryMessage(_, { call, put }) {
      const res = yield call(getQueryMessageService);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'queryMessage',
            list: res.data,
          },
        });
      }
    },
    *fetchGroupMonth({ payload }, { call, put }) {
      const { value } = payload;
      const res = yield call(fetchGroupMonthService, value);
      // console.log(res);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'fetchMessage',
            list: res.data,
          },
        });
      }
    },
    *fetchMemberMonth({ payload }, { call, put }) {
      const { value } = payload;
      const res = yield call(fetchMemberMonthService, value);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'fetchMemberMessage',
            list: res.data,
          },
        });
      }
    },
    *fetchHosname(_, { call, put }) {
      const res = yield call(fetchHosnameService);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'fetchhosName',
            list: res.data.sites,
          },
        });
      }
    },
    *fetchallPerson(_, { call, put }) {
      const res = yield call(fetchallPersonService);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'fetchallPerson',
            list: res.data,
          },
        });
      }
    },
    *fetchAppointmentPerformance({ payload }, { call, put, select }) {
      try {
        const { page } = payload;
        const { appointment } = yield select(state => state.businessYilianWechatQuery.searchParam);
        let params = '';
        if (appointment && appointment.startTime) {
          params += `&startTime=${appointment.startTime}`;
        }
        if (appointment && appointment.endTime) {
          params += `&endTime=${appointment.endTime}`;
        }
        if (appointment && appointment.type) {
          params += `&dateType=${appointment.type}`;
        }
        if (appointment && appointment.orderStatus) {
          params += `&orderStatus=${appointment.orderStatus}`;
        }
        if (appointment && appointment.regChannel) {
          params += `&regChannel=${appointment.regChannel}`;
        }
        if (appointment && appointment.patientName) {
          params += `&patientName=${appointment.patientName}`;
        }
        if (appointment && appointment.patientPhone) {
          params += `&patientPhone=${appointment.patientPhone}`;
        }
        if (appointment && appointment.mediCardId) {
          params += `&mediCardId=${appointment.mediCardId}`;
        }
        if (appointment && appointment.patientCardId) {
          params += `&patientCardId=${appointment.patientCardId}`;
        }
        if (appointment && appointment.hosDocCode) {
          params += `&hosDocCode=${appointment.hosDocCode}`;
        }
        const res = yield call(fetchAppointmentService, params, page, 10);
        if (res && res.code === 200) {
          // console.log(res);
          yield put({
            type: 'updateList',
            payload: {
              key: 'appointment',
              // list: res.data.content,
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
