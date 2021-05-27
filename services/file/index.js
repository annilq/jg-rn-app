import request from '@/utils/request';
import { file as api } from '@/services/api';

export async function list(params) {
  return request(api.list, { data: params });
}

export async function query(params) {
  return request(api.query, { data: params });
}

export async function save(params) {
  return request(api.save, { data: params });
}

export async function update(params) {
  return request(api.update, { data: params });
}

export async function uploadFile(params) {
  return request(api.uploadFile, { data: params });
}

export async function uploadPicture(params) {
  return request(api.uploadPicture, { data: params });
}
export async function del(params) {
  return request(api.delete, { data: params });
}

export async function viewFile({ fileId, ...params }) {
  return request(`${api.viewFile}?fileId=${fileId}`, { data: params });
}
