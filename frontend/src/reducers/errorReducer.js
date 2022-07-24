import { GET_ERRORS, CLEAR_ERRORS } from '../constants/errorConstant';

const initialState = {
   message: null,
};

export default function errorReducer(state = initialState, action) {
   switch (action.type) {
      case GET_ERRORS:
         return {
            message: action.payload.message,
         };
      case CLEAR_ERRORS:
         return {
            message: null,
         };
      default:
         return state;
   }
}
