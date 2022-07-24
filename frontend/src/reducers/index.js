import { combineReducers } from 'redux';
import productReducer from './productReducer';
import errorReducer from './errorReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import shippingReducer from './shippingReducer';
import orderReducer from './orderReducer';

export default combineReducers({
   products: productReducer,
   error: errorReducer,
   cart: cartReducer,
   user: userReducer,
   shipping: shippingReducer,
   orders: orderReducer,
});
