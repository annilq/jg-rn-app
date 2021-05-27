import { queryConstant, queryData } from '@/services/system/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    appCollapsed: true,
    ConstantMap: {},
    // ConstantMap: wx.getStorageSync('globalConstantMap') || {},
    // 后台接口数据,根据Url区分,主要用与自定义表单数据源为后台接口的组件
    // 防止在组件内部加载数据，造成接口重复调用的问题
    BackEndData: {},
  },

  reducers: {
    changeAppCollapsed(state, { payload }) {
      return {
        ...state,
        appCollapsed: payload,
      };
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    setConstantMap(state, { payload }) {
      AsyncStorage.setItem('globalConstantMap', JSON.stringify(payload));
      return {
        ...state,
        ConstantMap: payload,
      };
    },

    queryData(state, { payload }) {
      const newData = { ...state.BackEndData };
      const { url, data } = payload;
      newData[url] = data;
      return {
        ...state,
        BackEndData: newData,
      };
    },
  },

  effects: {
    fetchGlobalConstant: [
      function* fetchGlobalConstant(_, { put, call }) {
        const data = yield call(queryConstant);
        if (data) {
          yield put({
            type: 'setConstantMap',
            payload: data.resp,
          });
        }
      },
      { type: 'throttle', ms: 3000 },
    ],
    fetchBackEndData: [
      function* fetchBackEndData({ payload }, { put, call }) {
        const data = yield call(queryData, { url: payload.url, params: payload.params });
        if (data) {
          yield put({
            type: 'queryData',
            payload: { data: data.resp, url: payload.url },
          });
        }
      },
      { type: 'throttle', ms: 3000 },
    ],
  },
};
