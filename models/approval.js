import getServiceFromFormCode from '@/components/CustomForm/FormCodeService';
import {
  approval,
  reject,
  revoke,
  pass,
  forcePass,
  viewProcess,
  auditList,
  getCanModifyColumn,
  findProcessList,
  getPrevNodes,
  remind,
} from '@/services/workflow/approval';

export default {
  namespace: 'workflow',
  state: {
    params: {},
    data: {
      list: [],
    },
    curRouter: {},
    detail: {},
    flowData: {},
    editVisible: false,
    workFlowData: {},
    auditList: [],
    canModifyColumn: [],
    processList: [],
    prevApprovers: [],
  },

  reducers: {
    // 列表数据
    list(state, { payload }) {
      return {
        ...state,
        data: payload,
        params: payload.params,
      };
    },

    // 条目数据
    flowData(state, { payload }) {
      return { ...state, flowData: payload };
    },

    // 编辑开关
    toggleEdit(state, { payload }) {
      return { ...state, editVisible: payload, item: payload ? {} : state.item }; // 避免关闭体验不佳
    },

    // 流程执行数据
    workFlowData(state, { payload }) {
      return { ...state, ...payload };
    },

    // 流程执行数据
    auditList(state, { payload }) {
      return { ...state, ...payload };
    },

    curRouter(state, { payload }) {
      return { ...state, curRouter: payload };
    },
    // 可以修改的表单
    canModifyColumn(state, { payload }) {
      return { ...state, ...payload };
    },

    // 可以选择的流程
    processList(state, { payload }) {
      return { ...state, ...payload };
    },

    // 驳回到列表
    prevApprovers(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    // 列表
    *listRemote({ payload = {} }, { call, put, select }) {
      const data = yield select(({ workflow }) => workflow.data);
      const curRouter = yield select(({ workflow }) => workflow.curRouter);
      const serviceObject = getServiceFromFormCode(curRouter.formCode, curRouter.serviceType);
      const { pageRemote, ...params } = payload

      const response = yield call(serviceObject.list, params);
      if (response) {
        const { resp } = response;
        yield put({
          type: 'list',
          payload: {
            ...resp,
            list: pageRemote ? data.list.concat(resp.list) : resp.list,
            params: payload,
          },
        });
      }
    },

    // 审批通过
    *approval({ payload, callback }, { call }) {
      const response = yield call(approval, payload);
      if (response) {
        // const params = yield select(({ workflow }) => workflow.params);
        // yield put({ type: 'listRemote', payload: params });
        if (callback) callback();
      }
    },

    // 审批驳回
    *reject({ payload, callback }, { call }) {
      const response = yield call(reject, payload);
      if (response) {
        // const params = yield select(({ workflow }) => workflow.params);
        // yield put({ type: 'listRemote', payload: params });
        if (callback) callback();
      }
    },

    // 审批撤回
    *revoke({ payload, callback }, { call }) {
      const response = yield call(revoke, payload);
      if (response) {
        // const params = yield select(({ workflow }) => workflow.params);
        // yield put({ type: 'listRemote', payload: params });
        if (callback) callback();
      }
    },

    // 跳过
    *pass({ payload, callback }, { call }) {
      const response = yield call(pass, payload);
      if (response) {
        // const params = yield select(({ workflow }) => workflow.params);
        // yield put({ type: 'listRemote', payload: params });
        if (callback) callback();
      }
    },
    // 强制通过
    *forcePass({ payload, callback }, { call }) {
      const response = yield call(forcePass, payload);
      if (response) {
        if (callback) callback();
      }
    },

    // 催办
    *remind({ payload, callback }, { call }) {
      const response = yield call(remind, payload);
      if (response) {
        if (callback) callback();
      }
    },

    // 分页
    *pageRemote({ payload }, { put, select }) {
      const params = yield select(({ workflow }) => workflow.params);
      yield put({ type: 'listRemote', payload: { ...params, ...payload, pageRemote: true } });
    },

    // 查询流程图进度
    *queryWorkFlow({ payload = {}, callback }, { put, call }) {
      // yield put({ type: 'toggleEdit', payload: true });
      const response = yield call(viewProcess, payload);

      if (response) {
        const { resp } = response;
        yield put({ type: 'workFlowData', payload: { workFlowData: resp } });
        if (callback) callback(resp);
      }
    },

    // 查询审批记录
    *queryAuditList({ payload = {} }, { put, call }) {
      const response = yield call(auditList, payload);

      if (response) {
        const { resp } = response;
        yield put({ type: 'auditList', payload: { auditList: resp } });
      }
    },
    // 查询审批记录
    *getCanModifyColumn({ payload = {} }, { put, call }) {
      const response = yield call(getCanModifyColumn, payload);

      if (response) {
        const { resp } = response;
        yield put({ type: 'canModifyColumn', payload: { canModifyColumn: resp } });
      }
    },

    // 查询当前流程的审批选项列表
    *getPrevNodesRemote({ payload = {} }, { put, call }) {
      const response = yield call(getPrevNodes, payload);
      if (response) {
        const { resp } = response;
        yield put({ type: 'prevApprovers', payload: { prevApprovers: resp } });
      }
    },
    // 查询当前流程的审批选项列表
    *processListRemote({ payload = {} }, { put, select, call }) {
      const { id } = yield select(({ project }) => project.project);
      const response = yield call(findProcessList, {
        ...payload,
        ...(id && { projectId: id }),
      });
      if (response) {
        const { resp } = response;
        yield put({ type: 'processList', payload: { processList: resp } });
      }
    },
  },
};
