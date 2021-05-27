import request from '@/utils/request';
import { processBasic as api } from '@/services/api';

export async function department(params) {
  return request(api.department, { data: params });
}

export async function role(params) {
  return request(api.role, { data: params });
}

export async function organization(params) {
  return request(api.organization, { data: params });
}

export async function user(params) {
  return request(api.user, { data: params });
}
