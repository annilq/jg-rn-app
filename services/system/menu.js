import request from '@/utils/request';
import {menu as api} from '@/services/api';

export async function list(params) {
  return request(api.list, {data: params});
}

export async function query(params) {
  return request(api.query, {data: params});
}

export async function remove(params) {
  return request(api.remove, {data: params});
}

export async function add(params) {
  return request(api.add, {data: params});
}

export async function update(params) {
  return request(api.update, {data: params});
}

export async function all(params) {
  return request(api.all, {data: params});
}

export async function roleMenu(params) {
  return request(api.roleMenu, {data: params});
}

export async function saveRoleMenu(params) {
  return request(api.saveRoleMenu, {data: params});
}

export async function enable(params) {
  return request(api.enable, {data: params});
}
export async function disable(params) {
  return request(api.disable, {data: params});
}
