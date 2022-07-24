import axios from 'axios';
import {
   ORDER_CREATE_FAIL,
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS,
   ORDER_DELIVER_FAIL,
   ORDER_DELIVER_REQUEST,
   ORDER_DELIVER_SUCCESS,
   ORDER_DETAILS_FAIL,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_SUCCESS,
   ORDER_LIST_FAIL,
   ORDER_LIST_REQUEST,
   ORDER_LIST_SUCCESS,
   ORDER_MY_LIST_FAIL,
   ORDER_MY_LIST_REQUEST,
   ORDER_MY_LIST_SUCCESS,
   ORDER_PAY_FAIL,
   ORDER_PAY_REQUEST,
   ORDER_PAY_SUCCESS,
} from '../constants/orderConstant';
import { returnErrors } from './errorActions';
import { tokenConfig } from './userActions';

export const getOrders = () => (dispatch, getState) => {
   dispatch({
      type: ORDER_LIST_REQUEST,
   });
   axios
      .get('/api/orders', tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({ type: ORDER_LIST_FAIL });
      });
};

export const createOrder = (order) => (dispatch, getState) => {
   dispatch({ type: ORDER_CREATE_REQUEST });

   axios
      .post('/api/orders', order, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: res.data,
         });
         localStorage.removeItem('cartItems');
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({ type: ORDER_CREATE_FAIL });
      });
};

export const getOrder = (id) => (dispatch, getState) => {
   dispatch({ type: ORDER_DETAILS_REQUEST });
   axios
      .get(`/api/orders/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({ type: ORDER_DETAILS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({ type: ORDER_DETAILS_FAIL });
      });
};

export const payOrder = (orderId, paymentResult) => (dispatch, getState) => {
   dispatch({ type: ORDER_PAY_REQUEST });
   axios
      .put(`/api/orders/${orderId}/pay`, paymentResult, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({ type: ORDER_PAY_FAIL });
      });
};

export const payCashOrder = (orderId) => (dispatch, getState) => {
   dispatch({ type: ORDER_PAY_REQUEST });
   axios
      .put(`/api/orders/${orderId}/pay/cash`, {}, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({ type: ORDER_PAY_FAIL });
      });
};

export const deliverOrder = (order) => (dispatch, getState) => {
   dispatch({ type: ORDER_DELIVER_REQUEST });

   axios
      .put(`/api/orders/${order._id}/deliver`, order, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({ type: ORDER_DELIVER_FAIL });
      });
};

export const listMyOrders = () => (dispatch, getState) => {
   dispatch({ type: ORDER_MY_LIST_REQUEST });
   axios
      .get('/api/orders/myorders/mine', tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({ type: ORDER_MY_LIST_FAIL });
      });
};
