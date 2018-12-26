import { message } from 'antd';
import {
  fetchGroupListService,
  fetchMemberListService,
  fetchLocationListService,
  createGroupService,
  createMemberService,
  createLocationService,
  modifyGroupService,
  modifyMemberService,
  modifyLocationService,
  deleteGroupService,
  deleteMemberService,
  deleteLocationService,
  getMemberService,
  fetchAllHosNameService,
  fetchAllGroupNameService,
  addHosToGroupService,
  fetchGroupExportService,
  fetchMemberExportService,
  fetchLocationExportService,
} from '@/services/business/yilian-wechat/management/management';

export default {
  namespace: 'businessYilianWechatManagement',

  state: {
    searchParam: {
      groupName: '',
      memberName: '',
      locationName: '',
      groupDownload: false,
      memberDownload: false,
      locationDownload: false,
    },
    list: {
      group: null,
      member: null,
      location: null,
      person: null,
      // 所有医院名称
      allHosName: null,
      // 所有小组类别
      allGroupName: null,
    },
    currentPage: {
      group: 0,
      member: 0,
      location: 0,
    },
    totalElements: {
      group: 0,
      member: 0,
      location: 0,
    },
  },

  effects: {
    *fetchGroupList({ payload }, { call, put, select }) {
      const searchParam = yield select(state => state.businessYilianWechatManagement.searchParam);
      const { page } = payload;
      let params = '';
      if (searchParam && searchParam.groupName) {
        params += `&name=${searchParam.groupName}`;
      }
      if (searchParam && !searchParam.groupDownload) {
        params += `&isExport=${searchParam.groupDownload}`;
      }
      const res = yield call(fetchGroupListService, params, page, 10);
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
    *downloadGroupList(_, { call, select }) {
      const searchParam = yield select(state => state.businessYilianWechatManagement.searchParam);
      let params = '';
      if (searchParam && searchParam.groupName) {
        params += `&name=${searchParam.groupName}`;
      }
      const res = yield call(fetchGroupExportService, params);
      let returnData = null;
      if (res && res.code === 200 && res.msg) {
        returnData = res.msg;
      }
      return returnData;
    },
    *fetchMemberList({ payload }, { call, put, select }) {
      const searchParam = yield select(state => state.businessYilianWechatManagement.searchParam);
      const { page } = payload;
      let params = '';
      if (searchParam && searchParam.memberName) {
        params += `&name=${searchParam.memberName}`;
      }
      if (searchParam && !searchParam.memberDownload) {
        params += `&isExport=${searchParam.memberDownload}`;
      }
      const res = yield call(fetchMemberListService, params, page, 10);
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
    *downloadMemberList(_, { call, select }) {
      const searchParam = yield select(state => state.businessYilianWechatManagement.searchParam);
      let params = '';
      if (searchParam && searchParam.memberName) {
        params += `&name=${searchParam.memberName}`;
      }
      const res = yield call(fetchMemberExportService, params);
      let returnData = null;
      if (res && res.code === 200 && res.msg) {
        returnData = res.msg;
      }
      return returnData;
    },
    *getMemberMessage(_, { call, put }) {
      const res = yield call(getMemberService);
      if (res && res.code === 200) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'person',
            list: res.data,
          },
        });
      }
    },
    *fetchLocationList({ payload }, { call, put, select }) {
      const searchParam = yield select(state => state.businessYilianWechatManagement.searchParam);
      const { page } = payload;
      let params = '';
      if (searchParam && searchParam.locationName) {
        params += `&name=${searchParam.locationName}`;
      }
      if (searchParam && !searchParam.locationDownload) {
        params += `&isExport=${searchParam.locationDownload}`;
      }
      const res = yield call(fetchLocationListService, params, page, 10);
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
    *downloadLocationList(_, { call, select }) {
      const searchParam = yield select(state => state.businessYilianWechatManagement.searchParam);
      let params = '';
      if (searchParam && searchParam.locationName) {
        params += `&name=${searchParam.locationName}`;
      }
      const res = yield call(fetchLocationExportService, params);
      let returnData = null;
      if (res && res.code === 200 && res.msg) {
        returnData = res.msg;
      }
      return returnData;
    },
    *createGroup({ payload }, { call, put }) {
      const { postData } = payload;
      const res = yield call(createGroupService, postData);
      let ifsuccess = false;
      if (res && res.code === 200) {
        ifsuccess = true;
        yield put({ type: 'fetchGroupList', payload: { page: 0 } });
        message.success('新增小组成功！');
      } else {
        message.error('新增小组失败！');
      }
      return ifsuccess;
    },
    *modifyGroup({ payload }, { call, put }) {
      const { postData } = payload;
      const res = yield call(modifyGroupService, postData);
      let ifsuccess = false;
      if (res && res.code === 200) {
        ifsuccess = true;
        yield put({ type: 'fetchGroupList', payload: { page: 0 } });
        message.success('修改小组信息成功！');
      } else {
        message.error('修改小组信息失败！');
      }
      return ifsuccess;
    },
    *deleteGroup({ payload }, { call, put }) {
      const { id } = payload;
      const res = yield call(deleteGroupService, id);
      if (res && res.code === 200) {
        yield put({ type: 'fetchGroupList', payload: { page: 0 } });
        message.success('删除小组成功！');
      } else {
        message.error('删除小组失败！');
      }
    },
    *createMember({ payload }, { call, put }) {
      const { postData } = payload;
      const res = yield call(createMemberService, postData);
      let ifsuccess = false;
      if (res && res.code === 200) {
        ifsuccess = true;
        yield put({ type: 'fetchMemberList', payload: { page: 0 } });
        message.success('新增人员成功！');
      } else {
        message.error('新增人员失败！');
      }
      return ifsuccess;
    },
    *modifyMember({ payload }, { call, put }) {
      const { postData } = payload;
      const res = yield call(modifyMemberService, postData);
      let ifsuccess = false;
      if (res && res.code === 200) {
        ifsuccess = true;
        yield put({ type: 'fetchMemberList', payload: { page: 0 } });
        message.success('修改人员信息成功！');
      } else {
        message.error('修改人员信息失败！');
      }
      return ifsuccess;
    },
    *deleteMember({ payload }, { call, put }) {
      const { id } = payload;
      const res = yield call(deleteMemberService, id);
      if (res && res.code === 200) {
        yield put({ type: 'fetchMemberList', payload: { page: 0 } });
        message.success('删除人员成功！');
      } else {
        message.error('删除人员失败！');
      }
    },
    *createLocation({ payload }, { call, put }) {
      const { postData } = payload;
      const res = yield call(createLocationService, postData);
      let ifsuccess = false;
      if (res && res.code === 200) {
        ifsuccess = true;
        yield put({ type: 'fetchLocationList', payload: { page: 0 } });
        message.success('新增地点成功！');
      } else {
        message.error('新增地点失败！');
      }
      return ifsuccess;
    },
    *modifyLocation({ payload }, { call, put }) {
      const { postData } = payload;
      const res = yield call(modifyLocationService, postData);
      let ifsuccess = false;
      if (res && res.code === 200) {
        ifsuccess = true;
        yield put({ type: 'fetchLocationList', payload: { page: 0 } });
        message.success('修改地点信息成功！');
      } else {
        message.error('修改地点信息失败！');
      }
      return ifsuccess;
    },
    *deleteLocation({ payload }, { call, put }) {
      const { id } = payload;
      const res = yield call(deleteLocationService, id);
      if (res && res.code === 200) {
        yield put({ type: 'fetchLocationList', payload: { page: 0 } });
        message.success('删除地点成功！');
      } else {
        message.error('删除地点失败！');
      }
    },
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
    *addHosToGroup({ payload }, { call }) {
      const { postData } = payload;
      const { name, hosName } = postData;
      // 小组名转字符串
      const newname = name.toString();
      // 医院id转字符串
      const newhosName = hosName.join(',');
      // 定义新参数
      const newPostData = {
        name: newname,
        hosName: newhosName,
      };
      const res = yield call(addHosToGroupService, newPostData);
      let ifsuccess = false;
      if (res && res.code === 200) {
        ifsuccess = true;
        message.success('编辑小组信息成功！');
      } else {
        message.error('编辑小组信息失败！');
      }
      return ifsuccess;
    },
  },

  reducers: {
    updateSearchParam(state, { payload }) {
      return {
        ...state,
        searchParam: {
          ...state.searchParam,
          [payload.key]: payload.value,
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
        // wechatCode: {
        //   ...state.wechatCode,
        //   [payload.key]: payload.wechatCode,
        // },
      };
    },
  },
};
