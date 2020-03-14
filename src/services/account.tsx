// @ts-ignore
import request from '@/utils/request';
import { stringify } from 'qs';

export async function login(params) {
  return request('/rest/assistant/login', {
    method: 'POST',
    expirys : false,
    body: {
      ...params,
    },
  });
}