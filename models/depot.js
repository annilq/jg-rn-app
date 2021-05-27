import { list } from '@/services/supply/depotDetail';

export default {
  namespace: 'depot',

  state: {
    params: {},
    data: {
      list: [],
      pagination: {},
    },
  },

  reducers: {
    // 列表数据
    list(state, { payload }) {
      return {
        ...state,
        data: { list: payload.list, pagination: payload.pagination },
        params: payload.params,
      };
    },
  },

  effects: {
    // 列表
    *listRemote({ payload }, { call, put }) {
      const response = yield call(list, payload);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'list',
          payload: {
            list: resp.list,
            pagination: {
              current: resp.currentPage,
              pageSize: resp.pageSize,
              total: resp.totalSize,
            },
            params: payload,
          },
        });
      }
    },

    // 分页
    *pageRemote({ payload }, { put, select }) {
      const params = yield select(({ depot }) => depot.params);
      yield put({ type: 'listRemote', payload: { ...params, ...payload } });
    },
  },
};
