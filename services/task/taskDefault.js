import request from '@/utils/request';
import { taskDefault as api } from '@/services/api';

// 所有的
async function list(params) {
  return request(api.pageList, { data: params });
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

export async function getDefaultByProjectId(params) {
  return request(api.getDefaultByProjectId, { data: params });
}

export default {
  getDefaultByProjectId,
  list,
  query,
  remove,
  add,
  update,
};
