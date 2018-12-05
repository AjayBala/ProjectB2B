import Cookies from 'js-cookie';
import _isEmpty from 'lodash/isEmpty';
import * as types from '../actionTypes/MyProfileActionTypes';
import { phoneNumberFormatting } from '../common/Utils';


const constractMyProfile = (data = {}) => {
    const { phoneNumber = '' } = data;
    data.phoneNumber = phoneNumberFormatting((phoneNumber || '').toString());

return data;
};

export default function(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case types.GET_DEFAULT_PROFILE:
            newState = Object.assign({}, state);
            const signUser = Cookies.get('signUserDetails');
            const signUpDetails = signUser ? JSON.parse(signUser) : {};
            signUpDetails.password = '12345678';
            newState.myProfileInitValues = !_isEmpty(signUpDetails) ? constractMyProfile(signUpDetails) : {};
            newState.payload = action.payload;

            return newState;

        case types.GET_PROFILE_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

            return newState;

        case types.GET_PROFILE_SUCCESS:
            newState = Object.assign({}, state);
            const data = action.data;
            newState.UserDetails = data;

            return newState;

        case types.GET_PROFILE_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

            return newState;

        case types.ACCOUNT_MANAGEMENT_GET_USER_ROLE_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

            return newState;

        case types.ACCOUNT_MANAGEMENT_GET_USER_ROLE_SUCCESS:
            newState = Object.assign({}, state);
            // const userRoleValue = action.data;
            newState.userRoleResponse = action.data;
            newState.isOpenDeletePopup = true;

            return newState;

        case types.ACCOUNT_MANAGEMENT_GET_USER_ROLE_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;
            newState.isOpenDeletePopup = false;

            return newState;

        case types.MY_PROFILE_PROFILE_IMAGE_UPLOAD_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

            return newState;

        case types.MY_PROFILE_PROFILE_IMAGE_UPLOAD_SUCCESS:
            newState = Object.assign({}, state);
            newState.imageUploadResponse = action.data;

            return newState;

        case types.MY_PROFILE_PROFILE_IMAGE_UPLOAD_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

            return newState;

        case types.ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_SUCCESS:
            newState = Object.assign({}, state);
            newState.userDeleteResposne = action.data;

        return newState;

        case types.ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.UPDATE_MY_PROFILE_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

            return newState;

        case types.UPDATE_MY_PROFILE_SUCCESS:
            newState = Object.assign({}, state);
            newState.profileUpdateResponse = action.data;
            newState.isSaveBtnDisabled = true;

            return newState;

        case types.UPDATE_MY_PROFILE_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

            return newState;

        case types.RESET_DELETE_POPUP_OPEN:
            newState = Object.assign({}, state);
            newState.isOpenDeletePopup = false;

            return newState;

        case types.IS_SAVE_BUTTON_DISABLED:
            newState = Object.assign({}, state);
            newState.isSaveBtnDisabled = action.payload;

            return newState;

        case types.GET_MY_PROFILE_IMAGE_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

            return newState;

        case types.GET_MY_PROFILE_IMAGE_SUCCESS:
            newState = Object.assign({}, state);
            newState.myProfileImageResponse = action.data;

            return newState;

        case types.GET_MY_PROFILE_IMAGE_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

            return newState;

        case types.RESEST_SERVER_ERROR_MSG:
            newState = Object.assign({}, state);
            newState.error = action.payload;

            return newState;

            case types.UPDATE_PROFILE_DATA_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

            return newState;

        case types.UPDATE_PROFILE_DATA_SUCCESS:
            newState = Object.assign({}, state);
            newState.profileUpdateDataResponse = action.data;

            return newState;

        case types.UPDATE_PROFILE_DATA_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

            return newState;

        default:
            return state;
    }
}
