import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import _isEmpty from 'lodash/isEmpty';
import * as types from '../actionTypes/ProfessionalActionTypes';
import { einNumberFormater } from '../common/Utils';

const companyInfoDetails = {
    isNonProfitOrg: false,
    isReseller: false,
    name: '',
    email: '',
    ein: '',
    uploadFile: null,
    categorys: null,
    agencyName: '',
};

const defaultCardDetails = {
    nameOnCard: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: '',
    address1: '',
    city: '',
    state: '',
    email: '',
    zip: '',
};

const constractCompanyInfo = data => {
    const { companyInfo = companyInfoDetails, firstName = '', lastName = '', emailId = '' } = data;
    const { name = '', documentProof = [], ein = '' } = companyInfo;
    companyInfo.nameOfBusiness = name;
    companyInfo.firstName = firstName;
    companyInfo.lastName = lastName;
    companyInfo.email = emailId;
    companyInfo.ein = einNumberFormater((ein || '').toString());
    const categorys = [];
    _map(companyInfo.categories, obj => {
        categorys.push(obj.categoryName);
    });
    const documentDetails = documentProof[0] || {};
    companyInfo.uploadFile = documentDetails.fileName || '';
    companyInfo.categorys = _uniq(categorys);

    return companyInfo;
};

const constrcutCardDetails = data => {
    const { creditCard = [{}], address = [] } = data;
    const { expiryDate = '' } = creditCard[0];
    const cardDetails = Object.assign({}, creditCard[0], address[0]);
    const splitDate = expiryDate.split('/');
    cardDetails.expirationMonth = splitDate[0];
    cardDetails.expirationYear = splitDate[1];
    cardDetails.cvv = '';

    return cardDetails;
};

export default function(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case types.GET_BUSINESS_CATEGORYS_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.GET_BUSINESS_CATEGORYS_SUCCESS:
            newState = Object.assign({}, state);
            newState.categorys = action.data;

        return newState;

        case types.GET_BUSINESS_CATEGORYS_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.GET_SIGNUP_CUSTOMER_BY_ID_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.GET_SIGNUP_CUSTOMER_BY_ID_SUCCESS:
            newState = Object.assign({}, state);
            const data = action.data;
            const { companyInfo = {}, creditCard = {}, emailId = '' } = data;
            companyInfoDetails.email = emailId;
            newState.companyInfoInitValues = !_isEmpty(companyInfo) ? constractCompanyInfo(data) : companyInfoDetails;
            const { documentProof = [], categories = [] } = companyInfo;
            const fileCategoryList = categories.filter(obj => obj.categoryName === 'General Contractor' || obj.categoryName === 'Real Estate Agent' || obj.categoryName === 'Contractor');
            newState.businessCategoryHasUpload = !_isEmpty(fileCategoryList) ? true : false;
            const documentDetails = documentProof[0] || {};
            newState.businessCategoryHasValue = !_isEmpty(categories) ? true : false;
            newState.selectedBusinessCategory = newState.companyInfoInitValues.categorys || [];
            newState.selectedFile = documentDetails.fileName || 'No file Chosen';
            newState.cardDetails = !_isEmpty(creditCard) ? constrcutCardDetails(data) : defaultCardDetails;
            newState.nextToSkipForNow = newState.cardDetails.cardNumber.length ? true : false;
            newState.roleType = data.roleType;

        return newState;

        case types.FILE_CHANGE:
            newState = Object.assign({}, state);
            newState.selectedFile = action.payload;

        return newState;

        case types.BUSINESS_CATEGORY_HAS_UPLOAD:
            newState = Object.assign({}, state);
            newState.businessCategoryHasUpload = action.payload;

        return newState;

        case types.BUSINESS_CATEGORY_HAS_VALUE:
            newState = Object.assign({}, state);
            newState.businessCategoryHasValue = action.payload;

        return newState;

        case types.SHOPPING_PREFERENCE_HAS_VALUE:
            newState = Object.assign({}, state);
            newState.shoppingPreferenceHasValue = action.payload;

        return newState;

        case types.SELECTED_BUSINESS_CATEGORYS:
            newState = Object.assign({}, state);
            newState.selectedBusinessCategory = action.payload;

        return newState;

        case types.GET_SIGNUP_CUSTOMER_BY_ID_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.CREATE_COMPANY_INFO_REQUEST:
            newState = Object.assign({}, state);
            newState.companyInfoError = '';
            newState.payload = action.payload;

        return newState;

        case types.CREATE_COMPANY_INFO_SUCCESS:
        newState = Object.assign({}, state);
        newState.companyInfoSuccess = action.data;

        return newState;

        case types.CREATE_COMPANY_INFO_ERROR:
        newState = Object.assign({}, state);
        newState.companyInfoError = action.error;

        return newState;

        case types.UPLOAD_FILE_COMPANY_INFO_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.UPLOAD_FILE_COMPANY_INFO_SUCCESS:
        newState = Object.assign({}, state);
        newState.uploadFileCompanyInfoSuccess = action.data;

        return newState;

        case types.UPLOAD_FILE_COMPANY_INFO_ERROR:
        newState = Object.assign({}, state);
        newState.error = action.error;

        return newState;

    case types.INCREMENT_STAGE:
        newState = Object.assign({}, state);
        newState.stageIndex = action.payload + 1;

    return newState;

    case types.DECREMENT_STAGE:
        newState = Object.assign({}, state);
        newState.stageIndex = action.payload - 1;

    return newState;

    case types.CURRENT_STAGE:
        newState = Object.assign({}, state);
        newState.stageIndex = action.signupStage;

    return newState;

    case types.SET_AUTHU_TOKEN:
        newState = Object.assign({}, state);

    return newState;

    case types.CREATE_CARD_DETAILS_REQUEST:
            newState = Object.assign({}, state);
            newState.cardDetialError = '';
            newState.payload = action.payload;

        return newState;

        case types.CREATE_CARD_DETAILS_SUCCESS:
        newState = Object.assign({}, state);
        newState.cardDetialSuccess = action.data;

    return newState;

        case types.CREATE_CARD_DETAILS_ERROR:
        newState = Object.assign({}, state);
        newState.cardDetialError = action.error;

    return newState;

    case types.CREATE_SHOPPING_PREFERENCES_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.CREATE_SHOPPING_PREFERENCES_SUCCESS:
        newState = Object.assign({}, state);
        newState.shoppingPreferenceSuccess = action.data;

    return newState;

    case types.NEXT_TO_SKIP_FOR_NOW:
        newState = Object.assign({}, state);
        newState.nextToSkipForNow = action.payload;

    return newState;

        case types.CREATE_SHOPPING_PREFERENCES_ERROR:
        newState = Object.assign({}, state);
        newState.error = action.error;

    return newState;

        default:
            return state;
    }
}
