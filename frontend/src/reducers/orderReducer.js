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

const initialState = {
   orderLoading: false,
   order: null,
   orders: [],
   myOrders: [],
   loading: false,
   success: false,
   loadingDelivered: false,
   successDelivered: false,
};

export default function orderReducer(state = initialState, action) {
   switch (action.type) {
      case ORDER_CREATE_REQUEST:
      case ORDER_DETAILS_REQUEST:
      case ORDER_LIST_REQUEST:
      case ORDER_MY_LIST_REQUEST:
         return {
            ...state,
            orderLoading: true,
         };
      case ORDER_CREATE_SUCCESS:
         localStorage.removeItem('cartItems');
         return {
            ...state,
            order: action.payload,
            orderLoading: false,
         };
      case ORDER_CREATE_FAIL:
      case ORDER_DETAILS_FAIL:
      case ORDER_LIST_FAIL:
         return {
            ...state,
            orderLoading: false,
            order: null,
            orders: [],
         };
      case ORDER_DETAILS_SUCCESS:
         return {
            ...state,
            order: action.payload,
            orderLoading: false,
         };
      case ORDER_PAY_REQUEST:
         return {
            ...state,
            loading: true,
         };

      case ORDER_PAY_SUCCESS:
         return {
            ...state,
            loading: false,
            order: action.payload,
            success: true,
         };
      case ORDER_PAY_FAIL:
         return {
            ...state,
            loading: true,
            success: false,
         };
      case ORDER_DELIVER_REQUEST:
         return {
            ...state,
            loadingDelivered: true,
         };

      case ORDER_DELIVER_SUCCESS:
         return {
            ...state,
            loadingDelivered: false,
            order: action.payload,
            successDelivered: true,
         };
      case ORDER_DELIVER_FAIL:
         return {
            ...state,
            loadingDelivered: true,
            successDelivered: false,
         };
      case ORDER_LIST_SUCCESS:
         return {
            ...state,
            orders: action.payload,
            orderLoading: false,
            order: null,
         };
      case ORDER_MY_LIST_SUCCESS:
         return {
            ...state,
            myOrders: action.payload,
            orderLoading: false,
         };
      case ORDER_MY_LIST_FAIL:
         return {
            ...state,
            myOrders: [action.payload],
            orderLoading: false,
         };
      default:
         return state;
   }
}
