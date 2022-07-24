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
   USER_UPDATE_FAIL,
   USER_UPDATE_SUCCESS,
   USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_SUCCESS,
   USER_UPDATE_PROFILE_FAIL,
   USER_UPDATE_PROFILE_RESET,
} from '../constants/userConstant';

const initialState = {
   userLoading: false,
   user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
   isAuthenticated: localStorage.getItem('user') ? true : null,
   token: localStorage.getItem('userToken'),
   userList: [],
   singleUser: null,
   updateSuccess: false,
   userUpdated: false,
};

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
      case USER_REGISTER_REQUEST:
      case USER_LIST_REQUEST:
      case USER_DELETE_REQUEST:
      case USER_DETAILS_REQUEST:
      case USER_UPDATE_REQUEST:
      case USER_UPDATE_PROFILE_REQUEST:
         return {
            ...state,
            userLoading: true,
         };
      case USER_LOGIN_SUCCESS:
      case USER_REGISTER_SUCCESS:
         return {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isAuthenticated: true,
            userLoading: false,
         };
      case USER_UPDATE_PROFILE_SUCCESS:
         return {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isAuthenticated: true,
            userLoading: false,
            userUpdated: true,
         };
      case USER_LOGIN_FAIL:
      case USER_REGISTER_FAIL:
      case USER_LOGOUT_SUCCESS:
      case USER_LIST_FAIL:
      case USER_DELETE_FAIL:
      case USER_DETAILS_FAIL:
      case USER_UPDATE_FAIL:
      case USER_UPDATE_PROFILE_FAIL:
         localStorage.removeItem('userToken');
         localStorage.removeItem('user');
         localStorage.removeItem('cartItems');
         return {
            ...state,
            userLoading: false,
            user: null,
            isAuthenticated: false,
            token: null,
         };
      case USER_UPDATE_PROFILE_RESET:
         return {
            ...state,
            userLoading: false,
         };
      case USER_LIST_SUCCESS:
         return {
            ...state,
            userLoading: false,
            userList: action.payload,
            singleUser: null,
            updateSuccess: null,
         };
      case USER_DELETE_SUCCESS:
         return {
            ...state,
            userList: state.userList.filter(
               (user) => user._id !== action.payload
            ),
            userLoading: false,
         };
      case USER_DETAILS_SUCCESS:
         return {
            ...state,
            singleUser: action.payload,
            userLoading: false,
         };
      case USER_UPDATE_SUCCESS:
         return {
            ...state,
            userLoading: false,
            updateSuccess: true,
         };
      default:
         return state;
   }
}
