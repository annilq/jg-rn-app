import { add, query, remove, list, update } from '@/services/field/inspectionSetting';

export default {
  namespace: 'qualitySetting',

  state: {
    listdata: { list: [] },
    item: {},
    parentId: null,
    editVisible: false,
  },

  reducers: {
    // 列表数据
    list(state, { payload }) {
      return {
        ...state,
        listdata: payload,
      };
    },

    // 条目数据
    item(state, { payload }) {
      return { ...state, item: payload };
    },

    // 编辑开关
    toggleEdit(state, { payload }) {
      return { ...state, editVisible: payload, item: payload ? {} : state.item }; // 避免关闭体验不佳
    },

    // 设置父级id
    parentId(state, { payload }) {
      return { ...state, parentId: payload }; // 避免关闭体验不佳
    },

    // 设置默认参数
    params(state, { payload }) {
      return { ...state, params: payload }; // 避免关闭体验不佳
    },
  },

  effects: {
    // 列表
    *listRemote({ payload, callback }, { call, select, put }) {
      const [listdata, params] = yield select(({ qualitySetting }) => [
        qualitySetting.listdata,
        qualitySetting.params,
      ]);
      const { currentPage, pageSize } = listdata;
      const response = yield call(list, { currentPage, pageSize, ...payload, ...params });
      if (response) {
        const { resp } = response;
        yield put({ type: 'list', payload: resp });
        callback && callback(resp);
      }
    },

    // 新增
    *addRemote({ payload, callback }, { call, select, put }) {
      const params = yield select(({ qualitySetting }) => qualitySetting.params);
      const response = yield call(add, { ...payload, ...params });
      if (response) {
        yield put({ type: 'listRemote' });
        yield put({ type: 'toggleEdit', payload: false });
        yield put({ type: 'parentId', payload: null });

        if (callback) callback();
      }
    },

    // 修改
    *updateRemote({ payload, callback }, { call, select, put }) {
      const params = yield select(({ qualitySetting }) => qualitySetting.params);
      const response = yield call(update, { ...payload, ...params });
      if (response) {
        yield put({ type: 'listRemote' });
        yield put({ type: 'toggleEdit', payload: false });
        if (callback) callback();
      }
    },

    // 删除
    *removeRemote({ payload, callback }, { call, put }) {
      const response = yield call(remove, { id: payload.id });
      if (response) {
        yield put({ type: 'listRemote' });

        if (callback) callback();
      }
    },

    // 查询
    *queryRemote({ payload = {} }, { put, call }) {
      yield put({ type: 'toggleEdit', payload: true });
      const response = yield call(query, { id: payload.id });
      if (response) {
        const { resp } = response;
        yield put({ type: 'item', payload: resp });
      }
    },
  },
};
