// @ts-ignore
import {
  queryCustoms,
  queryCustomInfo,
  queryProducts,
  queryOrders,
  queryArrears,
  queryReceives,
} from '@/services/custom';
import { Toast } from 'antd-mobile';
// import { router } from 'dva/router';

export default {
  namespace: 'custom',
  state: {
    customData: [],
    customInfo: {},
    productData: [],
    orderData: [],
    arrearData: [],
    receiveData: [],
  },
  effects: {
    *queryCustoms({ payload, callback }, { call, put }) {
      Toast.loading('正在获取客户列表...');
      const response = yield call(queryCustoms, payload);
      yield put({
        type: 'saveCustomData',
        payload: {
          ...response,
        },
      });
      Toast.hide();
      if (callback) {
        callback(response, true);
      }
    },
    *queryCustomInfo({ payload, callback }, { call, put }) {
      Toast.loading('正在获取客户基本信息...');
      const response = yield call(queryCustomInfo, payload);
      yield put({
        type: 'saveCustomBaseCardData',
        payload: {
          ...response,
        },
      });
      Toast.hide();
      if (callback) {
        callback(response);
      }
    },
    *queryProducts({ payload, callback }, { call, put }) {
      Toast.loading('正在查询货品...');
      const response = yield call(queryProducts, payload);
      yield put({
        type: 'saveProductResult',
        payload: {
          ...response,
        },
      });
      Toast.hide();
      if (callback) {
        callback(response);
      }
    },
    *queryOrders({ payload, callback }, { call, put }) {
      Toast.loading('正在查询订单...');
      const response = yield call(queryOrders, payload);
      yield put({
        type: 'saveOrderResult',
        payload: {
          ...response,
        },
      });
      Toast.hide();
      if (callback) {
        callback(response);
      }
    },
    *queryArrears({ payload, callback }, { call, put }) {
      Toast.loading('正在查询欠款...');
      const response = yield call(queryArrears, payload);
      yield put({
        type: 'saveArrearResult',
        payload: {
          ...response,
        },
      });
      Toast.hide();
      if (callback) {
        callback(response);
      }
    },
    *queryReceives({ payload, callback }, { call, put }) {
      Toast.loading('正在查询冲收...');
      const response = yield call(queryReceives, payload);
      yield put({
        type: 'saveReceiveResult',
        payload: {
          ...response,
        },
      });
      Toast.hide();
      if (callback) {
        callback(response);
      }
    },
  },
  reducers: {
    saveCustomBaseCardData(state, { payload }) {
      return {
        ...state,
        customInfo: payload.data,
      };
    },
    saveCustomData(state, { payload }) {
      return {
        ...state,
        customData: payload.data || [],
      };
    },
    saveProductResult(state, { payload }) {
      return {
        ...state,
        productData: payload.data || [],
      };
    },
    saveOrderResult(state, { payload }) {
      return {
        ...state,
        orderData: payload.data || [],
      };
    },
    saveArrearResult(state, { payload }) {
      return {
        ...state,
        arrearData: payload.data || [],
      };
    },
    saveReceiveResult(state, { payload }) {
      return {
        ...state,
        receiveData: payload.data || [],
      };
    },
  },
};
