import request from '@/utils/request';
import { schedule as api } from '@/services/api';

export async function getScheduleByMonth(params) {
  return request(api.getScheduleByMonth, { data: params });
}

export async function getTaskByDate(params) {
  return request(api.getTaskByDate, { data: params });
}
