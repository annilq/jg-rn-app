
import { findMenuList } from '@/services/system/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 获取当前的的router配置项，里面包含service，formcode
export const getCurRouterConfigByParams = (params, routerData = []) => {
  const compareArr = Object.keys(params).filter(item => !!params[item]);
  const routesIterator = [...routerData];
  const matchRouter = [];
  while (routesIterator.length > 0) {
    const curRouter = routesIterator.shift();
    const match = compareArr.every(key => params[key] === curRouter[key] && curRouter.formCode);
    if (match) {
      matchRouter.push(curRouter);
    }
    if (curRouter.routes) {
      const router = getCurRouterConfigByParams(params, curRouter.routes);
      if (router.length > 0) {
        matchRouter.push(...router);
      }
    }
  }
  return matchRouter;
};

export default {
  namespace: 'menu',

  state: {
    menuData: [],
    routerData: [],
    breadcrumbNameMap: {},
    curRouter: {},
  },

  effects: {
    *getMenuData({ callback }, { put, call }) {
      const response = yield call(findMenuList);
      if (response) {
        const { data } = response;
        yield AsyncStorage.setItem('menu', JSON.stringify(data));
        yield put({
          type: 'save',
          payload: { menuData: data },
        });
        if (callback) {
          callback(data)
        }
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setCurRouter(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
