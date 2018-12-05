import * as MyProfileActionTypes from '../actionTypes/MyProfileActionTypes';

export const getDefaultProfile = values => ({
    type: MyProfileActionTypes.GET_DEFAULT_PROFILE,
    payload: values,
});

export const accountManagementDeletePopupClose = (values = {}) => ({
    type: MyProfileActionTypes.RESET_DELETE_POPUP_OPEN,
    payload: values
});

export const MyProfileRequest = values => ({
    type: MyProfileActionTypes.GET_PROFILE_REQUEST,
    payload: values,
});

export const accountManagementGetUserRoleRequest = (values = {}) => ({
    type: MyProfileActionTypes.ACCOUNT_MANAGEMENT_GET_USER_ROLE_REQUEST,
    payload: values,
});

export const accountManagementDeleteUser = (values = {}) => ({
    type: MyProfileActionTypes.ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_REQUEST,
    payload: values,
});

export const profileImageUploadRequest = values => ({
    type: MyProfileActionTypes.MY_PROFILE_PROFILE_IMAGE_UPLOAD_REQUEST,
    payload: values,
});

export const updateMyProfileRequest = values => ({
    type: MyProfileActionTypes.UPDATE_MY_PROFILE_REQUEST,
    payload: values,
});

export const updateMyProfileSuccess = values => ({
    type: MyProfileActionTypes.UPDATE_MY_PROFILE_SUCCESS,
    payload: values,
});

export const updateMyProfileError = values => ({
    type: MyProfileActionTypes.UPDATE_MY_PROFILE_ERROR,
    payload: values,
});

export const isSaveBtnDisabled = values => ({
    type: MyProfileActionTypes.IS_SAVE_BUTTON_DISABLED,
    payload: values,
});

export const getMyProfileImageRequest = values => ({
    type: MyProfileActionTypes.GET_MY_PROFILE_IMAGE_REQUEST,
    payload: values,
});

export const updateProfileDataRequest = values => ({
    type: MyProfileActionTypes.UPDATE_PROFILE_DATA_REQUEST,
    payload: values,
});

export const updateProfileDataSuccess = values => ({
    type: MyProfileActionTypes.UPDATE_PROFILE_DATA_SUCCESS,
    payload: values,
});

export const updateProfileDataError = values => ({
    type: MyProfileActionTypes.UPDATE_PROFILE_DATA_ERROR,
    payload: values,
});

export const resetServerAlert = (values = '') => ({
    type: MyProfileActionTypes.RESEST_SERVER_ERROR_MSG,
    payload: values,
});

export default {
    MyProfileRequest,
    accountManagementGetUserRoleRequest,
    profileImageUploadRequest,
    updateMyProfileRequest,
    updateMyProfileSuccess,
    updateMyProfileError,
    isSaveBtnDisabled,
    getMyProfileImageRequest,
    resetServerAlert,
    updateProfileDataRequest,
    updateProfileDataSuccess,
    updateProfileDataError
};
