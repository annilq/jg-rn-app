import request from '@/utils/request';
import { account as api } from '@/services/api';

export async function logout(params) {
  return request(api.logout, {data: params});
}

export async function login(params) {
  return request(api.login, {data: params});
}

export  function user(params) {
  return request(api.user, { data: params });
}
