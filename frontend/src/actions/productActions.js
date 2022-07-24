import axios from 'axios';
import {
   MOST_RATED_PRODUCT_LIST_FAIL,
   MOST_RATED_PRODUCT_LIST_REQUEST,
   MOST_RATED_PRODUCT_LIST_SUCCESS,
   PRODUCT_CREATE_FAIL,
   PRODUCT_CREATE_REQUEST,
   PRODUCT_CREATE_REVIEW_FAIL,
   PRODUCT_CREATE_REVIEW_REQUEST,
   PRODUCT_CREATE_REVIEW_SUCCESS,
   PRODUCT_CREATE_SUCCESS,
   PRODUCT_DELETE_FAIL,
   PRODUCT_DELETE_REQUEST,
   PRODUCT_DELETE_SUCCESS,
   PRODUCT_DETAILS_FAIL,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
} from '../constants/productConstant';
import { returnErrors } from './errorActions';
import { tokenConfig } from './userActions';

export const getProducts = () => (dispatch) => {
   dispatch({
      type: PRODUCT_LIST_REQUEST,
   });

   axios
      .get('/api/products')
      .then((res) => {
         dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         const message = 'An Error has occured!';
         dispatch(returnErrors(message));
         dispatch({
            type: PRODUCT_LIST_FAIL,
         });
      });
};

export const getProduct = (id) => (dispatch) => {
   dispatch({
      type: PRODUCT_DETAILS_REQUEST,
   });

   axios
      .get(`/api/products/${id}`)
      .then((res) => {
         dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({
            type: PRODUCT_DETAILS_FAIL,
         });
      });
};

// Delete a product
export const deleteProduct = (id) => (dispatch, getState) => {
   dispatch({
      type: PRODUCT_DELETE_REQUEST,
   });

   axios
      .delete(`/api/products/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: id,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({
            type: PRODUCT_DELETE_FAIL,
         });
      });
};

// Create a product
export const createProduct = (product) => (dispatch, getState) => {
   dispatch({ type: PRODUCT_CREATE_REQUEST });

   const user = getState().user.user;

   if (user.isAdmin) {
      axios
         .post('/api/products', product, tokenConfig(getState))
         .then((res) => {
            dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: res.data });
         })
         .catch((err) => {
            dispatch(returnErrors(err.response.data.message));
            dispatch({ type: PRODUCT_CREATE_FAIL });
         });
   } else {
      dispatch({
         type: PRODUCT_CREATE_FAIL,
      });
   }
};

export const createProductReviews = (id, review) => (dispatch, getState) => {
   dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

   axios
      .post(`/api/products/${id}/reviews`, review, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
         });
      });
};

export const mostRatedProducts = () => (dispatch) => {
   dispatch({ type: MOST_RATED_PRODUCT_LIST_REQUEST });

   axios
      .get('/api/products/most/rated')
      .then((res) => {
         dispatch({
            type: MOST_RATED_PRODUCT_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         const message = 'An Error has occured!';
         dispatch(returnErrors(message));
         dispatch({
            type: MOST_RATED_PRODUCT_LIST_FAIL,
         });
      });
};
