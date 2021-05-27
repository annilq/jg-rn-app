import request from '@/utils/request';
import {unit as api} from '@/services/api';

export async function all() {
  return request(api.all, {});
}

