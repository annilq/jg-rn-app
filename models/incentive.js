import { add} from '@/services/field/inspectionRap';

export default {
  namespace: 'qualityIncentive',

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
  },
};
