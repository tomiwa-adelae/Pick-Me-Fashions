import axios from 'axios';
import {
   CART_ADD_PRODUCT_REQUEST,
   CART_ADD_PRODUCT_SUCCESS,
   CART_ADD_PRODUCT_FAIL,
   CART_REMOVE_PRODUCT_SUCCESS,
} from '../constants/cartConstant';
import { returnErrors } from './errorActions';

// Add to cart
export const addToCart = (id, qty) => (dispatch, getState) => {
   dispatch({
      type: CART_ADD_PRODUCT_REQUEST,
   });

   axios
      .get(`/api/products/${id}`)
      .then((res) => {
         const { name, image, price, _id, countInStock } = res.data.product;

         dispatch({
            type: CART_ADD_PRODUCT_SUCCESS,
            payload: { name, image, price, countInStock, id: _id, qty },
         });

         localStorage.setItem(
            'cartItems',
            JSON.stringify(getState().cart.cartItems)
         );
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.message));
         dispatch({
            type: CART_ADD_PRODUCT_FAIL,
         });
      });
};

// Remove from cart
export const removeFromCart = (id) => (dispatch, getState) => {
   dispatch({
      type: CART_REMOVE_PRODUCT_SUCCESS,
      payload: id,
   });

   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
