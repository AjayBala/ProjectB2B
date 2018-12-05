import * as AccountManagementActionTypes from '../actionTypes/AccountManagementActionTypes';

export const UpdateCompanyProfile = values => ({
    type: AccountManagementActionTypes.UPDATE_COMPANY_PROFILE_REQUEST,
    payload: values
});

export const CompanyProfileError = error => ({
    type: AccountManagementActionTypes.COMPANY_PROFILE_ERROR,
    payload: error
});

export const CompanyProfileSuccess = data => ({
    type: AccountManagementActionTypes.COMPANY_PROFILE_SUCCESS,
    payload: data
});

export const getDefaultCompanyProfile = (values = {}) => ({
    type: AccountManagementActionTypes.DEFAULT_COMPANY_PROFILE,
    payload: values,
});

export const isButtonDisabled = value => ({
    type: AccountManagementActionTypes.IS_BUTTON_DISABLED,
    payload: value,
});

export const resetServerAlert = (values = '') => ({
    type: AccountManagementActionTypes.RESEST_SERVER_ERROR_MSG,
    payload: values,
});

export const companyProfileImageUploadRequest = values => ({
    type: AccountManagementActionTypes.COMPANY_PROFILE_IMAGE_UPLOAD_REQUEST,
    payload: values,
});

export const getCompanyProfileImageRequest = values => ({
    type: AccountManagementActionTypes.GET_COMPANY_PROFILE_IMAGE_REQUEST,
    payload: values,
});

export default {
    UpdateCompanyProfile,
    CompanyProfileError,
    CompanyProfileSuccess,
    getDefaultCompanyProfile,
    isButtonDisabled,
    resetServerAlert,
    companyProfileImageUploadRequest,
    getCompanyProfileImageRequest,
};
