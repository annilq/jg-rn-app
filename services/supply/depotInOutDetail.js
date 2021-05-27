import request from '@/utils/request';
import { depotInOutDetail as api } from '@/services/api';

export async function list(params) {
  return request(api.list, { data: params });
}

export async function query(params) {
  return request(api.query, { data: params });
}

export async function add(params) {
  return request(api.add, { data: params });
}

export async function update(params) {
  return request(api.update, { data: params });
}
export async function remove(params) {
  return request(api.remove, { data: params });
}

export async function pageListByMaterial(params) {
  return request(api.pageListByMaterial, { data: params });
}
