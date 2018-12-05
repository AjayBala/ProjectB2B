import * as ProfessionalActionTypes from '../actionTypes/ProfessionalActionTypes';

export const getBusinessCategorys = (values = {}) => ({
    type: ProfessionalActionTypes.GET_BUSINESS_CATEGORYS_REQUEST,
    payload: values,
});

export const getSignupCustomerById = (values = null) => ({
    type: ProfessionalActionTypes.GET_SIGNUP_CUSTOMER_BY_ID_REQUEST,
    payload: values,
});


export const createCompanyInfo = (values = {}) => ({
    type: ProfessionalActionTypes.CREATE_COMPANY_INFO_REQUEST,
    payload: values,
});

export const uploadFileCompanyInfo = (values = {}) => ({
    type: ProfessionalActionTypes.UPLOAD_FILE_COMPANY_INFO_REQUEST,
    payload: values,
});

export const createCardDetails = (values = {}) => ({
    type: ProfessionalActionTypes.CREATE_CARD_DETAILS_REQUEST,
    payload: values,
});

export const createShoppingPreferences = (values = {}) => ({
    type: ProfessionalActionTypes.CREATE_SHOPPING_PREFERENCES_REQUEST,
    payload: values,
});

export const incrementStage = (index = 0) => ({
    type: ProfessionalActionTypes.INCREMENT_STAGE,
    payload: index,
});

export const decrementStage = (index = 1) => ({
    type: ProfessionalActionTypes.DECREMENT_STAGE,
    payload: index,
});

export const fileChange = (values = 'No file Chosen') => ({
    type: ProfessionalActionTypes.FILE_CHANGE,
    payload: values,
});

export const businessCategoryHasUpload = values => ({
    type: ProfessionalActionTypes.BUSINESS_CATEGORY_HAS_UPLOAD,
    payload: values,
});

export const businessCategoryHasValue = values => ({
    type: ProfessionalActionTypes.BUSINESS_CATEGORY_HAS_VALUE,
    payload: values,
});

export const shoppingPreferenceHasValue = values => ({
    type: ProfessionalActionTypes.SHOPPING_PREFERENCE_HAS_VALUE,
    payload: values,
});

export const selectedBusinessCategory = (values = []) => ({
    type: ProfessionalActionTypes.SELECTED_BUSINESS_CATEGORYS,
    payload: values,
});

export const nextToSkipForNow = values => ({
    type: ProfessionalActionTypes.NEXT_TO_SKIP_FOR_NOW,
    payload: values,
});

export default {
    getBusinessCategorys,
    createCompanyInfo,
    uploadFileCompanyInfo
};
