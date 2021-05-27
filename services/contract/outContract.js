import request from '@/utils/request';
import { contract as api } from '@/services/api';

// common api
export async function list(params) {
  return request(api.list, { data: { ...params, type: 'out' } });
}

export async function add(params) {
  return request(api.add, { data: params });
}

export async function remove(params) {
  return request(api.remove, { data: params });
}
export async function query(params) {
  return request(api.query, { data: params });
}

export async function update(params) {
  return request(api.update, { data: params });
}

export async function approve(params) {
  return request(api.approve, { data: params });
}

export async function exportList(params) {
  return request(api.exportList, { data: params, responseType: 'blob' });
}

export async function checkExceed(params) {
  return request(api.checkExceed, { data: params });
}
