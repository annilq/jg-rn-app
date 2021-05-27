import request from '@/utils/request';
import { projectCategory as api } from '@/services/api';

export async function treeList(params) {
  return request(api.treeList, { data: params });
}

export async function query(params) {
  return request(api.query, { data: params });
}

export async function remove(params) {
  return request(api.remove, { data: params });
}

export async function add(params) {
  return request(api.add, { data: params });
}

export async function update(params) {
  return request(api.update, { data: params });
}
