import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login } from '@/services/auth';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    currentUser: null,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload.userName, payload.password);
      // Login successfully
      if (response && response.code === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            currentAuthority: 'admin',
            status: true,
            type: 'account',
          },
        });
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        message.error((response && response.msg) || '登录错误！');
      }
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      yield put({
        type: 'saveCurrentUser',
        payload: null,
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    saveCurrentUser(state, { payload }) {
      setAuthority(payload);
      return {
        ...state,
        currentUser: payload,
      };
    },
  },
};
