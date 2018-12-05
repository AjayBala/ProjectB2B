import * as SignUpActionTypes from '../actionTypes/SignUpActionTypes';

export const signUpRequest = values => ({
    type: SignUpActionTypes.SIGN_UP_REQUEST,
    payload: values,
});

export const getSignUpDetails = (values = {}) => ({
    type: SignUpActionTypes.GET_SIGN_UP_DETAILS,
    payload: values,
});

export default {
    signUpRequest,
};
