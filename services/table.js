import request from '@/utils/request';
import { tableConfig as api } from '@/services/api';
import { getStateData } from '@/models/menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFormConfig = async params => {
  const user = await AsyncStorage.getItem('user');
  const data = await request(api.query, { data: { ...params, ...user && { cid: JSON.parse(user).tenantId } } });
  if (data) {
    const { containers, ...rest } = data.resp;
    // 设置版本号
    return { ...rest, containers: JSON.parse(containers) };
  }
  return false
};

export async function systemList(params) {
  return request(api.system, { data: { ...params, pageSize: 1000 } });
}

export async function listSetquery(params) {
  return request(api.listSetquery, {
    params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded ' },
  });
}

export async function listSetsave(params) {
  return request(api.listSetsave, { data: params });
}
