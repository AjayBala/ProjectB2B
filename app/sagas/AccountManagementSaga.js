import { put, all, call, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import updateCompanyProfile from '../api/AccountManagementApi';
import * as AccountManagementActionTypes from '../actionTypes/AccountManagementActionTypes';
import { einNumberFormater, companyPhoneNumberFormatting } from '../common/Utils';
import { uploadFileCompanyInformation } from '../api/ProfessionalApi';
import { getProfileImg } from '../api/MyProfileApi';

function* UpdateCompanyProfileDetails(action) {
    try {
        const companyProfileResponse = yield call(updateCompanyProfile, action);
        const { data } = companyProfileResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: AccountManagementActionTypes.COMPANY_PROFILE_ERROR, error: message });
        } else {
            const existingData = Cookies.get('signUserDetails') ? JSON.parse(Cookies.get('signUserDetails')) : {};
            let { phoneNumber: profilePhone = '' } = data;
            const { name: nameOfBusiness = '' } = data;
            profilePhone = companyPhoneNumberFormatting((profilePhone || '').toString());
            data.ein = einNumberFormater((data.ein || '').toString());
            const updatedData = Object.assign({}, data, { nameOfBusiness, profilePhone });
            updatedData.roleType = existingData.roleType;
            existingData.companyInfo = data;
            Cookies.set('signUserDetails', existingData);
            yield put({ type: AccountManagementActionTypes.COMPANY_PROFILE_SUCCESS, updatedData });
        }
    } catch (error) {
        yield all([
            put({ type: AccountManagementActionTypes.COMPANY_PROFILE_ERROR, error }),
        ]);
    }
}

function* uploadCompanyProfileImg(action) {
    try {
        const { uploadFile } = action.payload;
        const getImgUploadResponse = yield call(uploadFileCompanyInformation, uploadFile);
        const { data } = getImgUploadResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: AccountManagementActionTypes.COMPANY_PROFILE_PROFILE_IMAGE_UPLOAD_ERROR, error: message });
        } else {
            const updateData = action.payload;
            updateData.profileImageId = data.id;
            yield all([
                put({ type: AccountManagementActionTypes.UPDATE_COMPANY_PROFILE_REQUEST, payload: updateData }),
                put({ type: AccountManagementActionTypes.COMPANY_PROFILE_IMAGE_UPLOAD_SUCCESS, data })
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: AccountManagementActionTypes.COMPANY_PROFILE_IMAGE_UPLOAD_ERROR, error }),
        ]);
    }
}

function* getCompanyProfileImage(action) {
    try {
        const getImageResponse = yield call(getProfileImg, action);
        if (!getImageResponse) {
            const { message } = 'Error in fetching image';
            yield put({ type: AccountManagementActionTypes.GET_COMPANY_PROFILE_IMAGE_ERROR, error: message });
        } else {
            const data = getImageResponse;
            yield put({ type: AccountManagementActionTypes.GET_COMPANY_PROFILE_IMAGE_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: AccountManagementActionTypes.GET_COMPANY_PROFILE_IMAGE_ERROR, error }),
        ]);
    }
}
export default function* watchAccountManagementSaga() {
    yield all([
        takeLatest(AccountManagementActionTypes.UPDATE_COMPANY_PROFILE_REQUEST, UpdateCompanyProfileDetails),
        takeLatest(AccountManagementActionTypes.COMPANY_PROFILE_IMAGE_UPLOAD_REQUEST, uploadCompanyProfileImg),
        takeLatest(AccountManagementActionTypes.GET_COMPANY_PROFILE_IMAGE_REQUEST, getCompanyProfileImage),
    ]);
}
