import request from '@/utils/request';
import { workflowApproval as api } from '@/services/api';

export async function list(params) {
  return request(api.list, { data: params });
}

export async function query(params) {
  return request(api.list, { data: params });
}

export async function approval(params) {
  return request(api.approve, { data: params });
}

export async function reject(params) {
  return request(api.reject, { data: params });
}
export async function revoke(params) {
  return request(api.revoke, { data: params });
}

export async function pass(params) {
  return request(api.pass, { data: params });
}

export async function forcePass(params) {
  return request(api.forcePass, { data: params });
}

export async function remind(params) {
  return request(api.urge, { data: params });
}

export async function auditList(params) {
  return request(api.auditList, { data: params });
}

export async function viewProcess(params) {
  return request(api.viewProcess, { data: params });
}

export async function myCreated(params) {
  return request(api.myCreated, { data: params });
}

export async function processList(params) {
  return request(api.processList, { data: params });
}

export async function copyToMeList(params) {
  return request(api.copyToMeList, { data: params });
}
export async function rejectList(params) {
  return request(api.rejectList, { data: params });
}

export async function findProcessList(params) {
  return request(api.findProcessList, { data: params });
}

export async function getCanModifyColumn(params) {
  return request(api.getCanModifyColumn, { data: params });
}

export async function getPrevNodes(params) {
  return request(api.getPrevNodes, { data: params });
}

export const myhandle = {
  list,
  query,
  approval,
  reject,
  pass,
  auditList,
  viewProcess,
};
export const mycreate = {
  list: myCreated,
  query,
  auditList,
  viewProcess,
};
export const finish = {
  list: processList,
  query,
  auditList,
  viewProcess,
};
export const copytome = {
  list: copyToMeList,
  query,
  auditList,
  viewProcess,
};

export const rejectservice = {
  list: rejectList,
  query,
  auditList,
  viewProcess,
};
