import request from '@/utils/request';
import { globalConstant } from '@/services/api';

// import { debounce } from 'lodash';

// const queryConstant = debounce(async params => request(globalConstant, { data: params }), 300);

export async function queryConstant(params) {
  return request(globalConstant, { data: params });
}

export async function queryData(data) {  
  return request(data.url, { data: data.params });
}

// export default queryConstant;
