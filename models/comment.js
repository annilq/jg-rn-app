import { list, query, remove, add, update } from '../services/system/comment';
export default {
  namespace: 'comment',

  state: {
    params: {},
    data: {
      list: [],
      pagination: {},
    },
    item: {},
    editVisible: false,
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

    // 编辑开关
    toggleEdit(state, { payload }) {
      return { ...state, editVisible: payload, item: payload ? {} : state.item }; // 避免关闭体验不佳
    },

  },

  effects: {
    // 列表
    *listRemote({ payload }, { call, put, select }) {
      const response = yield call(list, { ...payload, pageSize: 10 });
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

    *addRemote({ payload, callback }, { call, put, select }) {
      const response = yield call(add, payload);
      if (response) {
        const { info } = response;
        const params = yield select(({ comment }) => comment.params);
        yield put({ type: 'listRemote', payload: params });
        if (callback) callback(info);
      }
    },

    // 修改
    *updateRemote({ payload, callback }, { call, put, select }) {
      const response = yield call(update, payload);
      if (response) {
        const { info } = response;
        if (callback) callback(info);
      }
    },

    // 删除
    *removeRemote({ payload, callback }, { call, put, select }) {
      const response = yield call(remove, { id: payload.id });
      if (response) {
        const { info } = response;
        const params = yield select(({ comment }) => comment.params);
        yield put({ type: 'listRemote', payload: params });
        if (callback) callback(info);
      }
    },

    *queryRemote({ payload = {}, callback }, { put, call, select }) {
      const response = yield call(query, payload);
      if (response) {
        const { resp } = response;

        if (callback) callback();
      }
    },

  },
};
