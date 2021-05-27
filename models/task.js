import {
  getSubTask as list,
  add,
  update,
  remove,
  taskProgress,
  stopTask,
  cancelTask,
  beginTask,
  approveTask,
  rejectTask,
  submitTask,
  feedBack
} from '@/services/task';
import { getDefaultByProjectId } from '@/services/task/taskDefault';

export default {
  namespace: 'task',

  state: {
    list: [],
    progressList: [],
    defaultData: {},
  },

  reducers: {
    // 列表数据
    list(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    // 列表数据
    progressList(state, { payload }) {
      return {
        ...state,
        progressList: payload,
      };
    },

    defaultData(state, { payload }) {
      return {
        ...state,
        defaultData: payload,
      };
    },
  },

  effects: {
    // 列表
    *listRemote({ payload }, { call, put }) {
      const response = yield call(list, payload);
      if (response) {
        const { resp } = response;
        yield put({ type: 'list', payload: resp });
      }
    },

    // 新增
    *addRemote({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if (response) {
        yield put({ type: 'listRemote', payload: { id: payload.parentId } });
        // 删除新增或者编辑任务时候首页也要更新
        yield put({ type: 'jgTableModel/listRemote' });

        if (callback) callback(response);
      }
    },

    // 修改
    *updateRemote({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      if (response) {
        yield put({ type: 'listRemote', payload: { id: payload.id } });
        // 删除新增或者编辑任务时候首页也要更新
        yield put({ type: 'jgTableModel/listRemote' });

        if (callback) callback(response);
      }
    },

    // 删除
    *removeRemote(
      {
        payload: { data },
        callback,
      },
      { call, put }
    ) {
      const response = yield call(remove, { id: data.id });
      if (response) {
        yield put({ type: 'listRemote', payload: { id: data.parentId } });
        // 删除新增或者编辑任务时候首页也要更新
        yield put({ type: 'jgTableModel/listRemote' });

        if (callback) callback(response);
      }
    },

    // 删除
    *getProgressList(
      {
        payload: { taskId },
        callback,
      },
      { call, put }
    ) {
      const response = yield call(taskProgress, { taskId });
      if (response) {
        yield put({ type: 'progressList', payload: response.resp.list });
        if (callback) callback(response.resp);
      }
    },

    // 暂停任务
    *stopTask({ payload, callback }, { call }) {
      const response = yield call(stopTask, payload);
      if (response) {
        if (callback) callback(response.resp);
      }
    },

    // 取消任务
    *cancelTask({ payload, callback }, { call }) {
      const response = yield call(cancelTask, payload);
      if (response) {
        if (callback) callback(response.resp);
      }
    },

    // 开始任务
    *beginTask({ payload, callback }, { call }) {
      const response = yield call(beginTask, payload);
      if (response) {
        if (callback) callback(response.resp);
      }
    },

    // 通过任务
    *approveTask({ payload, callback }, { call }) {
      const response = yield call(approveTask, payload);
      if (response) {
        if (callback) callback(response.resp);
      }
    },

    // 驳回任务
    *rejectTask({ payload, callback }, { call }) {
      const response = yield call(rejectTask, payload);
      if (response) {
        if (callback) callback(response.resp);
      }
    },

    // 提交任务
    *submitTask({ payload, callback }, { call }) {
      const response = yield call(submitTask, payload);
      if (response) {
        if (callback) callback(response.resp);
      }
    },

    // 反馈进度
    *feedBack({ payload, callback }, { call }) {      
      const response = yield call(feedBack, payload);
      if (response) {
        if (callback) callback(response.resp);
      }
    },

    // 获取任务默认配置
    taskDefaultData: [
      function* taskDefaultData({ payload, callback }, { put, call }) {
        const response = yield call(getDefaultByProjectId, payload);
        if (response) {
          yield put({ type: 'defaultData', payload: response.resp });
          if (callback) callback(response.resp);
        }
      },
      { type: 'takeLatest' },
    ],
  },
};
