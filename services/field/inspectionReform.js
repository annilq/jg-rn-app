import request from '@/utils/request';
import { inspectionReform as api } from '@/services/api';

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
export async function checkPass(params) {
  return request(api.checkPass, { data: params });
}
export async function checkReject(params) {
  return request(api.checkReject, { data: params });
}
export async function feedback(params) {
  return request(api.feedback, { data: params });
}
