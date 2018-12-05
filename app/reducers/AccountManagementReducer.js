import Cookies from 'js-cookie';
import * as types from '../actionTypes/AccountManagementActionTypes';
import { einNumberFormater, companyPhoneNumberFormatting } from '../common/Utils';

export default function(state = {}, action) {
    let newState = {};

    switch (action.type) {
        case types.GET_COMPANY_PROFILE_REQUEST:
            newState = Object.assign({}, state);
            newState.error = '';
            newState.isValuesUpdated = false;

            return newState;

        case types.UPDATE_COMPANY_PROFILE_REQUEST:
            newState = Object.assign({}, state);
            newState.error = '';
            newState.isValuesUpdated = false;

            return newState;

        case types.COMPANY_PROFILE_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

            return newState;

        case types.COMPANY_PROFILE_SUCCESS:
            newState = Object.assign({}, state);
            newState.companyProfileInitValues = action.updatedData;
            newState.isValuesUpdated = true;

            return newState;

        case types.IS_BUTTON_DISABLED:
            newState = Object.assign({}, state);
            newState.isButtonDisabled = action.payload;

            return newState;

        case types.DEFAULT_COMPANY_PROFILE:
            newState = Object.assign({}, state);
            const signedInUser = Cookies.get('signUserDetails') ? Cookies.get('signUserDetails') : {};
            let signUserDetails = {};
            newState.companyProfileInitValues = {};
            newState.isValuesUpdated = false;

            if (signedInUser) {
                signUserDetails = JSON.parse(signedInUser);
                const { address = '', roleType = '', companyInfo = {} } = signUserDetails;
                const { name: nameOfBusiness = '', phoneNumber: profilePhone = '', ein = '' } = companyInfo;
                companyInfo.ein = einNumberFormater((ein || '').toString());
                companyInfo.address = address;
                companyInfo.roleType = roleType;
                companyInfo.nameOfBusiness = nameOfBusiness;
                companyInfo.profilePhone = companyPhoneNumberFormatting((profilePhone || '').toString());
                newState.companyProfileInitValues = companyInfo;
                newState.error = '';
            }

            return newState;

            case types.RESEST_SERVER_ERROR_MSG:
                newState = Object.assign({}, state);
                newState.error = action.payload;

            return newState;

            case types.COMPANY_PROFILE_IMAGE_UPLOAD_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

            return newState;

            case types.COMPANY_PROFILE_IMAGE_UPLOAD_SUCCESS:
                newState = Object.assign({}, state);
                newState.imageUploadResponse = action.data;

                return newState;

            case types.COMPANY_PROFILE_IMAGE_UPLOAD_ERROR:
                newState = Object.assign({}, state);
                newState.error = action.error;

                return newState;

            case types.GET_COMPANY_PROFILE_IMAGE_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

            return newState;

            case types.GET_COMPANY_PROFILE_IMAGE_SUCCESS:
            newState = Object.assign({}, state);
            newState.companyProfileImageResponse = action.data;

            return newState;

            case types.GET_COMPANY_PROFILE_IMAGE_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

            return newState;

        default:
            return state;
    }
}
