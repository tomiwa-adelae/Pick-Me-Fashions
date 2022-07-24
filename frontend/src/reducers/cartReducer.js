import {
   CART_ADD_PRODUCT_REQUEST,
   CART_ADD_PRODUCT_SUCCESS,
   CART_REMOVE_ALL_PRODUCTS,
   CART_REMOVE_PRODUCT_SUCCESS,
} from '../constants/cartConstant';

const initialState = {
   cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
   cartLoading: false,
};

export default function cartReducer(state = initialState, action) {
   switch (action.type) {
      case CART_ADD_PRODUCT_REQUEST:
         return {
            ...state,
            cartLoading: true,
         };
      case CART_ADD_PRODUCT_SUCCESS:
         const item = action.payload;
         const existItem = state.cartItems.find((x) => x.id === item.id);
         if (existItem) {
            return {
               ...state,
               cartItems: state.cartItems.map((x) =>
                  x.id === existItem.id ? item : x
               ),
               cartLoading: false,
            };
         } else {
            return {
               ...state,
               cartItems: [item, ...state.cartItems],
               cartLoading: false,
            };
         }
      case CART_REMOVE_PRODUCT_SUCCESS:
         return {
            ...state,
            cartItems: state.cartItems.filter((x) => x.id !== action.payload),
            cartLoading: false,
         };
      case CART_REMOVE_ALL_PRODUCTS:
         return {
            ...state,
            cartItems: [],
         };
      default:
         return state;
   }
}
