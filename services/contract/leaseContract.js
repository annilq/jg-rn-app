import * as outContract from './outContract';

const { query, remove, checkExceed } = outContract

export { query, remove, checkExceed };
const contractCate = "0"

export async function add(params) {
  return outContract.add({ ...params, contractCate });
}

export async function update(params) {
  return outContract.update({ ...params, contractCate });
}

export async function list(params) {
  return outContract.list({ ...params, contractCate });
}

export async function exportList(params) {
  return outContract.exportList({ ...params, contractCate });
}

export async function approve(params) {
  return outContract.approve({ ...params, contractCate });
}