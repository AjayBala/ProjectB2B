import Cookies from 'js-cookie';
import * as types from '../actionTypes/SignUpActionTypes';

export default function(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case types.SIGN_UP_REQUEST:
            newState = Object.assign({}, state);
            Cookies.remove('signUserDetails');
            newState.payload = action.payload;
            newState.error = '';

            return newState;

        case types.SIGN_UP_SUCCESS:
            newState = Object.assign({}, state);
            const data = action.data;
            Cookies.set('signUserDetails', data);
            newState.signUpDetails = data;

            return newState;

        case types.SIGN_UP_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

            return newState;

        case types.GET_SIGN_UP_DETAILS:
            newState = Object.assign({}, state);
            const signUser = Cookies.get('signUserDetails');
            newState.signUpDetails = signUser ? JSON.parse(signUser) : {};

        return newState;

        default:
            return state;
    }
}
