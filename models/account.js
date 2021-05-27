import { user, login } from '@/services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @author hmy
 */
export default {
  namespace: 'account',

  state: {
    user: {},
    token: null
  },

  reducers: {
    user(state, { payload }) {
      return {
        ...state,
        user: payload,
      };
    },
    token(state, { payload }) {
      return {
        ...state,
        token: payload,
      };
    },
  },

  effects: {
    *userRemote({ callback }, { call, put }) {
      const response = yield call(user);
      if (response) {
        const { resp } = response;
        yield AsyncStorage.setItem('user', JSON.stringify(resp));
        yield put({
          type: 'user',
          payload: resp,
        });
        if (callback) {
          callback()
        }
      }
    },
    *login({ payload, callback }, { call, put }) {
      const response = yield call(login, payload);
      if (response) {
        const { resp } = response;
        yield AsyncStorage.setItem('token', resp.token);
        yield put({
          type: 'token',
          payload: resp.token,
        });
        if (callback) {
          callback()
        }
      }
    },

    logout: [
      function* ({ payload = {} }, { put, call }) {
        const { tokenInvalid } = payload;
        if (tokenInvalid) {
          // token失效跳转到用户中心,token跳转需带上appId以便登录成功后能正确从用户中心跳回
          // if(isProduction()){
          //   window.location.replace(
          //     isProduction()
          //       ? `${getLoginUrl()}?appId=TASK`
          //       : 'http://localhost:8001/#/user/login?appId=TASK'
          //   );  
          // }
        } else {
          // 若是用户主动退出登录则直接跳转到用户中心登录页面
          // const response = yield call();
        }
      },
      { type: 'throttle', ms: 3000 },
    ],
  },
};
