/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { extend } from 'umi-request';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 错误提示
 */
const showError = (message, fn) => {
  //    notification.error({
  //      message: `请求错误`, description: message, duration: 2, onClose() {
  //        if (fn) {
  //          fn()
  //        }
  //      }
  //    });
  console.log(message);
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response, name, message } = error;
  // 处理response返回为null的情况
  const newResponse = response || {};
  const errorText = codeMessage[newResponse.status] || newResponse.statusText || message;
  const status = newResponse.status || name;

  if (status === 401 || status === -1) {
    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
      type: 'account/refreshToken'
    });
  } else {
    showError(errorText);
  }


  // environment should not be used
  // if (status <= 504 && status >= 500) {
  //   router.push('/exception/500');
  //   return;
  // }
  // if (status >= 404 && status < 422) {
  //   router.push('/exception/404');
  // }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  method: 'post', // 默认请求方式
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

/**
 * request 拦截器
 * 可改变url 或 options.
 */
request.interceptors.request.use(async (url, options) => {
  const token = await AsyncStorage.getItem("token");
  return ({
    url,
    options: {
      ...options,
      data: options.data || {},
      headers: { ...options.headers, Authorization: token },
    },
  })
});

/**
 * response 拦截器
 * 对于状态码实际是 200 的业务逻辑错误
 */
request.interceptors.response.use(async (response, req) => {
  if (response && response.status === 200) {
    const { responseType = "json", responseCode = 0 } = req;
    // 默认json的处理方式
    if (responseType === "json") {
      const data = await response.clone().json();
      if (data && data.code === responseCode) {
        return response;
      }
      const error = new Error(data.info || '操作异常');
      error.name = data.code;
      throw error;
    }
    // 返回值是文件流的话直接将数据流返回给前端处理
    return response;
  }
  const error = new Error("账号过期，请重新登录");
  error.response = response;
  throw error;
});




export default request;
