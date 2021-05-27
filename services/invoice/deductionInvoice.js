import request from '@/utils/request';
import { bizInvoiceDeduction as api } from '@/services/api';

export async function list(params) {
  return request(api.list, { data: params });
}

export async function query(params) {
  return request(api.query, { data: params });
}

export async function calc(params) {
  return request(api.calc, { data: params });
}
