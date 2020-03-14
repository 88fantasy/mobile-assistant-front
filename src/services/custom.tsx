// @ts-ignore
import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCustoms(params) {
  return request(`/rest/assistant/getCustoms?${stringify(params)}`);
}

export async function queryCustomInfo(params) {
  return request(`/rest/assistant/getCustomInfo?${stringify(params)}`);
}

export async function queryProducts(params) {
  return request(`/rest/assistant/product?${stringify(params)}`);
}

export async function queryOrders(params) {
  return request(`/rest/assistant/getOrders?${stringify(params)}`);
}

export async function queryArrears(params) {
  return request(`/rest/assistant/getArrears?${stringify(params)}`);
}
