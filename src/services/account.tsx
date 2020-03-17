// @ts-ignore
import request from '@/utils/request';

export async function login(params) {
  return request('/rest/assistant/login', {
    method: 'POST',
    expirys: false,
    body: {
      ...params,
    },
  });
}
