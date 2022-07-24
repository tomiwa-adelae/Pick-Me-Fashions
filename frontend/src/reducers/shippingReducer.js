import {
   REMOVE_SHIPPING_ADDRESS,
   SAVE_PAYMENT_METHOD,
   SAVE_SHIPPING_ADDRESS,
} from '../constants/shippingConstant';

const initialState = {
   shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : null,
   paymentMethod: null,
};

export default function shippingReducer(state = initialState, action) {
   switch (action.type) {
      case SAVE_SHIPPING_ADDRESS:
         return {
            ...state,
            shippingAddress: action.payload,
         };
      case SAVE_PAYMENT_METHOD:
         return {
            ...state,
            paymentMethod: action.payload,
         };
      case REMOVE_SHIPPING_ADDRESS:
         return {
            ...state,
            shippingAddress: null,
            paymentMethod: null,
         };
      default:
         return state;
   }
}
