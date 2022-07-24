import { GET_ERRORS, CLEAR_ERRORS } from '../constants/errorConstant';

export const returnErrors = (message) => {
   return {
      type: GET_ERRORS,
      payload: { message },
   };
};

export const clearErrors = () => {
   return {
      type: CLEAR_ERRORS,
   };
};
