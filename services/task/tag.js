import request from '@/utils/request';
import { taskTag as api } from '@/services/api';

// 所有的
async function list(params) {
  return request(api.list, { data: params });
}

async function query(params) {
  return request(api.query, { data: params });
}

async function remove(params) {
  return request(api.remove, { data: params });
}

async function add(params) {
  return request(api.add, { data: params });
}

async function update(params) {
  return request(api.update, { data: params });
}

export default {
  list,
  query,
  remove,
  add,
  update,
};
