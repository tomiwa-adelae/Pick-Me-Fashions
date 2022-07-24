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

const initialState = {
   products: [],
   product: {},
   productLoading: false,
   createSuccess: false,
   reviews: [],
   reviewSuccess: false,
   reviewFail: null,
   mostRated: [],
};

export default function productReducer(state = initialState, action) {
   switch (action.type) {
      case PRODUCT_LIST_REQUEST:
      case PRODUCT_DETAILS_REQUEST:
      case PRODUCT_DELETE_REQUEST:
      case PRODUCT_CREATE_REQUEST:
      case PRODUCT_CREATE_REVIEW_REQUEST:
      case MOST_RATED_PRODUCT_LIST_REQUEST:
         return {
            ...state,
            productLoading: true,
            createSuccess: false,
         };
      case PRODUCT_LIST_SUCCESS:
         return {
            ...state,
            products: action.payload,
            productLoading: false,
         };
      case PRODUCT_LIST_FAIL:
         return {
            ...state,
            products: [],
            productLoading: false,
         };
      case PRODUCT_DETAILS_SUCCESS:
         return {
            ...state,
            product: action.payload.product,
            reviews: action.payload.reviews,
            productLoading: false,
         };
      case PRODUCT_DETAILS_FAIL:
         return {
            ...state,
            product: {},
            productLoading: false,
         };
      case PRODUCT_DELETE_SUCCESS:
         return {
            ...state,
            productLoading: false,
            products: state.products.filter(
               (product) => product._id !== action.payload
            ),
         };
      case PRODUCT_DELETE_FAIL:
         return {
            ...state,
            productLoading: false,
         };
      case PRODUCT_CREATE_SUCCESS:
         return {
            ...state,
            createSuccess: true,
            productLoading: false,
         };
      case PRODUCT_CREATE_FAIL:
         return {
            ...state,
            createSuccess: false,
            productLoading: false,
         };
      case PRODUCT_CREATE_REVIEW_SUCCESS:
         return {
            ...state,
            productLoading: false,
            reviewSuccess: true,
            reviewFail: false,
         };
      case PRODUCT_CREATE_REVIEW_FAIL:
         return {
            ...state,
            productLoading: false,
            reviewSuccess: false,
            reviewFail: action.payload,
         };
      case MOST_RATED_PRODUCT_LIST_SUCCESS:
         return {
            ...state,
            mostRated: action.payload,
            productLoading: false,
         };
      case MOST_RATED_PRODUCT_LIST_FAIL:
         return {
            ...state,
            productLoading: false,
         };
      default:
         return state;
   }
}
