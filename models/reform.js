import { add, checkPass, checkReject, feedback } from '@/services/field/inspectionReform';

export default {
  namespace: 'qualityReform',

  state: {
    listdata: { list: [] },
    item: {},
    editVisible: false,
  },

  effects: {
    // 新增
    *addRemote({ payload, callback }, { call, select, put }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      const response = yield call(add, { ...payload, ...curRouter.params });
      if (response) {
        if (callback) callback();
      }
    },
    // 通过
    *checkPass({ payload = {}, callback }, { call }) {
      const response = yield call(checkPass, payload);
      if (response) {
        const { resp } = response;
        callback && callback(resp);
      }
    },

    // 拒绝
    *checkReject({ payload = {}, callback }, { call }) {
      const response = yield call(checkReject, payload);
      if (response) {
        const { resp } = response;
        callback && callback(resp);
      }
    },

    // 反馈
    *feedback({ payload = {}, callback }, { call }) {
      const response = yield call(feedback, payload);
      if (response) {
        const { resp } = response;
        callback && callback(resp);
      }
    },
  },
};
