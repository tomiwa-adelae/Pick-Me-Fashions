import {
   SAVE_SHIPPING_ADDRESS,
   SAVE_PAYMENT_METHOD,
} from '../constants/shippingConstant';

export const saveShipping = (data) => (dispatch, getState) => {
   dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data });

   localStorage.setItem(
      'shippingAddress',
      JSON.stringify(getState().shipping.shippingAddress)
   );
};

export const savePayment = (payment) => (dispatch) => {
   dispatch({ type: SAVE_PAYMENT_METHOD, payload: payment });
};
