import request from '@/utils/request';
import { task as api } from '@/services/api';

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

export async function beginTask(params) {
  return request(api.beginTask, { data: params });
}

export async function cancelTask(params) {
  return request(api.cancelTask, { data: params });
}

export async function getSubTask(params) {
  return request(api.getSubTask, { data: params });
}

export async function stopTask(params) {
  return request(api.stopTask, { data: params });
}

export async function rejectTask(params) {
  return request(api.rejectTask, { data: params });
}
export async function approveTask(params) {
  return request(api.approveTask, { data: params });
}
export async function submitTask(params) {
  return request(api.submitTask, { data: params });
}
export async function feedBack(params) {
  return request(api.feedBack, { data: params });
}
export async function taskProgress(params) {
  return request(api.taskProgress, { data: params });
}

// 负责的
async function chargeList(params) {
  return request(api.chargeList, { data: params });
}

// 当前用户创建
async function createList(params) {
  return request(api.createList, { data: params });
}
// 当前用户参与
async function participateList(params) {
  return request(api.participateList, { data: params });
}
// 我确认的
async function confirmList(params) {
  return request(api.confirmList, { data: params });
}

export const Charge = {
  list: chargeList,
  query,
  remove,
  add,
  update,
};

export const ConfirmList = {
  list: confirmList,
  query,
  remove,
  add,
  update,
};
export const CreateList = {
  list: createList,
  query,
  remove,
  add,
  update,
};
export const ParticipateList = {
  list: participateList,
  query,
  remove,
  add,
  update,
};
