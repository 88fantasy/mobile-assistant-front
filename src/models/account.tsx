// @ts-ignore
import { login } from '@/services/account';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

import { setAuthority, setAccount } from '@/utils/authority';

export default {
  namespace: 'account',
  state: {
    accountData: {
      accountId: '',
      stageid: 1,
      msg: '',
    },
  },
  effects: {
    *login({ payload }, { call, put, select }) {
      Toast.loading('正在登录...');
      const response = yield call(login, payload);
      yield put({
        type: 'saveAccountData',
        payload: {
          ...response,
        },
      });
      Toast.hide();

      const { accountData } = yield select(state => state.account);
      console.log(accountData);
      if (accountData.accountId !== '') {
        setAccount(accountData.accountId);
        setAuthority('user');
        yield put(routerRedux.replace('/'));
      }
    },
  },
  reducers: {
    saveAccountData(state, { payload }) {
      if (payload.success) {
        return {
          ...state,
          accountData: {
            accountId: payload.data,
            msg: '',
          },
        };
      }
      return {
        ...state,
        accountData: {
          accountId: '',
          msg: '帐号或密码错误',
        },
      };
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname, query }) => {
  //       if (pathname === '/users') {
  //         dispatch({ type: 'fetch', payload: query });
  //       }
  //     });
  //   },
  // },
};
