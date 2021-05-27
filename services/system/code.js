import request from '@/utils/request';
import {code as api} from '@/services/api';


export function execute(params) {
  return request(api.execute,  {data: params})
}

export function getConfig(params) {
  return request(api.getConfig, {data: params})
}
