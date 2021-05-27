import { getServiceAndFormCodeFromPath } from '@/components/CustomForm/FormCodeService';
import { isProjectMode } from "@/utils/utils"

export function flatdata(data) {
  const { exts, ...rest } = data || {};
  let newexts;
  try {
    newexts = exts && JSON.parse(exts);
  } catch (error) {
    console.log('JSON parse Error', exts);
  }
  if (!newexts) {
    return rest;
  }
  const { versionId, sysVersionId, controls } = newexts;
  return { versionId, sysVersionId, ...controls, ...rest };
}
// 根据serviceType来判断是那个模块发起的请求
export default {
  namespace: 'jgTableModel',

  state: {
    params: {},
    data: {
      list: [],
      currentPage: 1,
      totalPage: 0
    },
    item: {},
    editVisible: false,
    detailVisible: false,
    dataId: ""
  },

  reducers: {
    // 列表数据
    list(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    // 参数
    params(state, { payload }) {
      return {
        ...state,
        params: payload,
      };
    },

    // 条目数据
    item(state, { payload }) {
      return { ...state, item: payload };
    },

    // 详细开关
    toggleDetail(state, { payload }) {
      return { ...state, detailVisible: payload };
    },

    // 编辑开关
    toggleEdit(state, { payload }) {
      return { ...state, editVisible: payload, item: payload ? {} : state.item }; // 避免关闭体验不佳
    },

    dataId(state, { payload }) {
      return { ...state, dataId: payload };
    },
  },

  effects: {
    // 列表
    listRemote: [
      function* ({ payload = {}, path }, { call, select, put }) {
        const data = yield select(({ jgTableModel }) => jgTableModel.data);
        // const curRouter = yield select(({ menu }) => menu.curRouter);
        // const project = yield select(({ project }) => project.project);
        // console.log(curRouter);
        console.log(path);

        const { service: serviceObject, formCode } = getServiceAndFormCodeFromPath(path);
        // console.log(serviceObject);
        if (!serviceObject) {
          return;
        }
        const { pageRemote, ...params } = payload
        const response = yield call(serviceObject.list, {
          ...params,
          // 自定义表单需要formCode,统一添加
          formCode,
          // ...(curRouter.params || {}),
        });
        if (response) {
          const { resp } = response;
          const list = resp.list.map(flatdata);
          yield put({
            type: 'list',
            payload: {
              ...resp,
              list: pageRemote ? data.list.concat(list) : list,
            },
          });
          yield put({
            type: 'params',
            payload: params,
          });
        }
      },
      { type: 'throttle', ms: 100 },
    ],

    // 列表中新增
    *addRemote({ payload, callback, path }, { call, put, select }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      // console.log(curRouter);
      const { service: serviceObject, formCode } = getServiceAndFormCodeFromPath(path);
      const response = yield call(serviceObject.add, {
        ...payload,
        ...(curRouter.params || {}),
      });
      if (response) {
        yield put({ type: 'dataId', payload: response.resp });
        if (callback) callback(response);
      }
    },

    // 修改
    *updateRemote({ payload, callback, path }, { call, select }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      // console.log(curRouter);
      const { service: serviceObject, formCode } = getServiceAndFormCodeFromPath(path);
      const response = yield call(serviceObject.update, {
        ...payload,
        ...(curRouter.params || {}),
      });
      if (response) {
        if (callback) callback(response);
      }
    },

    // 删除
    *removeRemote({ payload, callback, path }, { call, put, select }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      // console.log(curRouter);
      const { service: serviceObject, formCode } = getServiceAndFormCodeFromPath(path);
      const response = yield call(serviceObject.remove, { id: payload });
      if (response) {
        if (callback) callback();
      }
    },

    // 分页
    *pageRemote({ payload, path }, { put, select }) {
      const params = yield select(({ jgTableModel }) => jgTableModel.params);
      yield put({ type: 'listRemote', payload: { ...params, ...payload, pageRemote: true }, path });
    },

    *queryRemote({ payload, callback, path }, { put, select, call }) {
      const { service: serviceObject, formCode } = getServiceAndFormCodeFromPath(path);
      if (!serviceObject) {
        console.log('no service');
        return;
      }
      
      yield put({ type: 'dataId', payload });
      // 根据id在基础表查基础数据，在子表查询拓展数据
      const baseResp = yield call(serviceObject.query, (typeof payload === "object") ? payload : { id: payload });
      if (baseResp) {
        const { resp } = baseResp;
        if (resp) {
          // 将用户自定义的字段数据提取出来
          // 需要将拓展字段exts格式打平，提升到data中，方便回显表单数据
          const newData = flatdata(resp);
          yield put({ type: 'item', payload: newData });
          if (callback) callback(newData);
        } else {
          console.warn('no query data');
        }
      }
    },

    *exportRemote({ callback, path }, { select, call }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      const params = yield select(({ jgTableModel }) => jgTableModel.params);
      // console.log(curRouter);
      const { service: serviceObject, formCode } = getServiceAndFormCodeFromPath(path);
      // 根据id在基础表查基础数据，在子表查询拓展数据
      const baseResp = yield call(
        serviceObject.exportList,
        params
      );
      if (baseResp) {
        callback(baseResp)
      }
    },

    // 提交审批
    *approve({ payload, callback, path }, { call, select }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      // console.log(curRouter);
      const { service: serviceObject, formCode } = getServiceAndFormCodeFromPath(path);
      if (!serviceObject.approve) {
        console.warn('no approve function');
      }
      const response = yield call(serviceObject.approve, {
        ...payload,
        ...(curRouter.params || {})
      });
      if (response) {
        if (callback) callback();
      }
    },

    // 预警
    *checkExceed({ payload, callback, path }, { call, select }) {
      const curRouter = yield select(({ menu }) => menu.curRouter);
      // console.log(curRouter);
      const { service: serviceObject, formCode } = getServiceAndFormCodeFromPath(path);
      if (!serviceObject.checkExceed) {
        console.warn('no approve function');
      }
      const response = yield call(serviceObject.checkExceed, {
        ...payload,
        ...(curRouter.params || {}),
      });
      if (response) {
        if (callback) callback(response.resp);
      }
    },
  },
};
