import { query, list as listApi } from '@/services/project';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  namespace: 'project',

  state: {
    project: {
      // 默认不先使用session的projectId，如果使用会导致ProjectSwitch组件里面的
      // dispatch({ type: 'jgTableModel/listRemote', payload: { projectId: id } });方法触发失败，因为没有配置formCode
      id: null,
    },
    data: {
      list: [],
      pagination: {},
    },
    params: {},
  },

  reducers: {
    // 项目
    project(state, { payload }) {
      AsyncStorage.setItem('projectId', payload.id);
      return {
        ...state,
        project: payload,
      };
    },

    // 列表数据
    list(state, { payload }) {
      return {
        ...state,
        data: { list: payload.list, pagination: payload.pagination },
        params: payload.params,
      };
    },

    // 瀑布数据
    allList(state, { payload }) {
      return {
        ...state,
        data: { list: state.data.list.concat(payload.list), pagination: payload.pagination },
        params: payload.params,
      };
    },
  },

  effects: {
    // 列表
    *listRemote({ payload }, { call, put }) {
      const response = yield call(listApi, { ...payload, approveStatus: 'COMPLETE' });
      if (response) {
        const { resp } = response;
        const { list, ...pagination } = resp;
        // 如果type==1，说明是分页加载更多的，否则是搜索
        if (payload && payload.type === 1) {
          yield put({
            type: 'allList',
            payload: {
              list,
              pagination,
              params: payload || {},
            },
          });
        } else {
          yield put({
            type: 'list',
            payload: {
              list,
              pagination,
              params: payload || {},
            },
          });
        }
      }
    },

    // 分页
    *pageRemote({ payload }, { put, select }) {
      const params = yield select(({ project }) => project.params);
      yield put({ type: 'listRemote', payload: { ...params, ...payload, type: 1 } });
    },

    // 查询
    *queryRemote({ payload }, { call, put }) {
      const response = yield call(query, payload);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'project',
          payload: resp,
        });
      }
    },
  },
};
