import axios from 'axios';

import {
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_LOGOUT_SUCCESS,
   USER_LIST_REQUEST,
   USER_LIST_SUCCESS,
   USER_LIST_FAIL,
   USER_DELETE_REQUEST,
   USER_DELETE_SUCCESS,
   USER_DELETE_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_DETAILS_FAIL,
   USER_UPDATE_REQUEST,
   USER_UPDATE_SUCCESS,
   USER_UPDATE_FAIL,
   USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_SUCCESS,
   USER_UPDATE_PROFILE_RESET,
   USER_UPDATE_PROFILE_FAIL,
   FORGOT_PASSWORD_REQUEST,
   FORGOT_PASSWORD_SUCCESS,
   FORGOT_PASSWORD_FAIL,
   RESET_PASSWORD_REQUEST,
   RESET_PASSWORD_SUCCESS,
   RESET_PASSWORD_FAIL,
} from '../constants/userConstant';
import { REMOVE_SHIPPING_ADDRESS } from '../constants/shippingConstant';
import { returnErrors } from '../actions/errorActions';
import { CART_REMOVE_ALL_PRODUCTS } from '../constants/cartConstant';
import { CLEAR_ERRORS } from '../constants/errorConstant';

// Login existing user
export const loginUser = (user) => (dispatch) => {
   dispatch({
      type: USER_LOGIN_REQUEST,
   });

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   axios
      .post('/api/auth', user, config)
      .then((res) => {
         dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data,
         });

         localStorage.setItem('userToken', res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data.user));
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({
            type: USER_LOGIN_FAIL,
         });
      });
};

// Register a new user
export const registerUser = (user) => (dispatch) => {
   dispatch({
      type: USER_REGISTER_REQUEST,
   });

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   axios
      .post('/api/users', user, config)
      .then((res) => {
         dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data,
         });

         localStorage.setItem('userToken', res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data.user));
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({
            type: USER_REGISTER_FAIL,
         });
      });
};

// Logout a user
export const logout = () => (dispatch) => {
   dispatch({
      type: USER_LOGOUT_SUCCESS,
   });
   dispatch({
      type: REMOVE_SHIPPING_ADDRESS,
   });
   dispatch({
      type: CART_REMOVE_ALL_PRODUCTS,
   });

   localStorage.removeItem('userToken');
   localStorage.removeItem('user');
   localStorage.removeItem('cartItems');
   localStorage.removeItem('shippingAddress');
};

// Get user list
export const getUserList = () => (dispatch, getState) => {
   dispatch({
      type: USER_LIST_REQUEST,
   });

   const user = getState().user.user;
   if (user.isAdmin) {
      axios
         .get('/api/users', tokenConfig(getState))
         .then((res) => {
            dispatch({
               type: USER_LIST_SUCCESS,
               payload: res.data,
            });
         })
         .catch((err) => {
            dispatch(returnErrors(err.response.data.message));
            dispatch({
               type: USER_LIST_FAIL,
            });
         });
   } else {
      dispatch({
         type: USER_LIST_FAIL,
      });
   }
};

export const getUser = (id) => (dispatch, getState) => {
   dispatch({ type: USER_DETAILS_REQUEST });

   const user = getState().user.user;

   if (user.isAdmin) {
      axios
         .get(`/api/users/${id}`, tokenConfig(getState))
         .then((res) => {
            dispatch({
               type: USER_DETAILS_SUCCESS,
               payload: res.data,
            });
         })
         .catch((err) => {
            dispatch(returnErrors(err.response.data.message));
            dispatch({ type: USER_DETAILS_FAIL });
         });
   } else {
      dispatch({
         type: USER_DETAILS_FAIL,
      });
   }
};

// Update user to admin
export const updateUser = (id, updatedUser) => (dispatch, getState) => {
   dispatch({ type: USER_UPDATE_REQUEST });

   const user = getState().user.user;
   if (user.isAdmin) {
      axios
         .put(`/api/users/${id}`, updatedUser, tokenConfig(getState))
         .then((res) => {
            dispatch({
               type: USER_UPDATE_SUCCESS,
               payload: res.data,
            });
         })
         .catch((err) => {
            dispatch(returnErrors(err.response.data.message));
            dispatch({
               type: USER_UPDATE_FAIL,
            });
         });
   } else {
      dispatch({
         type: USER_UPDATE_FAIL,
      });
   }
};

// Update user profile
export const updateUserProfile = (user) => (dispatch, getState) => {
   dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
   axios
      .put('/api/users/profile/mine', user, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: res.data,
         });

         localStorage.setItem('userToken', res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data.user));
         dispatch({ type: USER_UPDATE_PROFILE_RESET });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({ type: USER_UPDATE_PROFILE_FAIL });
      });
};

// Delete a User
export const deleteUser = (id) => (dispatch, getState) => {
   dispatch({
      type: USER_DELETE_REQUEST,
   });

   axios
      .delete(`/api/users/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: USER_DELETE_SUCCESS,
            payload: id,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({
            type: USER_DELETE_FAIL,
         });
      });
};

// Forgot a User password
export const forgotPassword = (email) => (dispatch, getState) => {
   dispatch({
      type: FORGOT_PASSWORD_REQUEST,
   });

   axios
      .post(`/api/password-reset`, email, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: res.data,
         });
         dispatch({ type: CLEAR_ERRORS });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({
            type: FORGOT_PASSWORD_FAIL,
         });
      });
};

// Forgot a User password
export const resetPassword = (url, password) => (dispatch, getState) => {
   dispatch({
      type: RESET_PASSWORD_REQUEST,
   });

   axios
      .post(url, { password }, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: res.data,
         });
         dispatch({ type: CLEAR_ERRORS });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({
            type: RESET_PASSWORD_FAIL,
         });
      });
};

export const tokenConfig = (getState) => {
   const token = getState().user.token;

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   if (token) {
      config.headers['authorization'] = token;
   }

   return config;
};
