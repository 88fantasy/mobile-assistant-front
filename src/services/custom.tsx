// @ts-ignore
import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryCustoms(params) {
  return request(`http://localhost:8160/rest/assistant/getCustoms?${stringify(params)}`);
}

export async function queryCustomInfo(params) {
  return request(`http://localhost:8160/rest/assistant/getCustomInfo?${stringify(params)}`);
}

export async function queryProducts(params) {
  return request(`http://localhost:8160/rest/assistant/product?${stringify(params)}`);
}

export async function queryOrders(params) {
  return request(`http://localhost:8160/rest/assistant/getOrders?${stringify(params)}`);
}

export async function queryArrears(params) {
  return request(`http://localhost:8160/rest/assistant/getArrears?${stringify(params)}`);
}

export async function queryReceives(params) {
  return request(`http://localhost:8160/rest/assistant/getReceives?${stringify(params)}`);
}
