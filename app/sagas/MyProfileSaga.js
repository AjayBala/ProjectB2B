import { takeLatest, put, call, all } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import { getProfile, getUserProfile, deleteUserAccount, updateUserProfile, getProfileImg, updateProfileData } from '../api/MyProfileApi';
import { uploadFileCompanyInformation } from '../api/ProfessionalApi';
// import getUsersList from '../api/UserManagementApi';
import * as GetProfileActionTypes from '../actionTypes/MyProfileActionTypes';
import * as UserManagementActionTypes from '../actionTypes/UserManagementActionTypes';
import * as GroupManagementActionTypes from '../actionTypes/GroupManagementActionTypes';


function* getRole(action) {
    try {
        const getUsersResponse = yield call(getProfile, action);
        const { data } = getUsersResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: GetProfileActionTypes.GET_PROFILE_ERROR, error: message });
        } else {
            yield put({ type: GetProfileActionTypes.GET_PROFILE_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: GetProfileActionTypes.GET_PROFILE_ERROR, error }),
        ]);
    }
}

function* updateMyProfileData(action) {
    try {
        const getUsersDetailResponse = yield call(updateProfileData, action);
        const { data } = getUsersDetailResponse;
        const { futureName } = action.payload;
        if (data.error) {
            const { message } = data;
            if (futureName === 'userManagement') {
                 yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_UPDATE_MEMBER_ERROR, error: message });
             } else if (futureName === 'groupManagement') {
                 yield put({ type: GroupManagementActionTypes.GROUP_MANAGEMENT_UPDATE_MEMBER_ERROR, error: message });
             }
        } else {
            const { businessId } = action.payload;
            if (futureName === 'groupManagement') {
                yield put({ type: UserManagementActionTypes.GET_GROUP_MANAGEMENT_USER_DATA, payload: data });
            }
            yield all([
            put({ type: GetProfileActionTypes.UPDATE_PROFILE_DATA_SUCCESS, data }),
            put({ type: UserManagementActionTypes.GET_USERS_LIST_REQUEST, payload: { businessId, pageIndex: 1, size: 10, onScroll: false, order: 'asc', orderByField: 'firstName' } }),
            put({ type: GroupManagementActionTypes.GET_USER_GROUPS_REQUEST, payload: businessId }),
        ]);
        }
    } catch (error) {
        const { futureName } = action.payload;
        if (futureName === 'userManagement') {
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_UPDATE_MEMBER_ERROR, error });
        } else if (futureName === 'groupManagement') {
            yield put({ type: GroupManagementActionTypes.GROUP_MANAGEMENT_UPDATE_MEMBER_ERROR, error });
        }
    }
}

function* getUserRole(action) {
    try {
        const getUsersRoleResponse = yield call(getUserProfile, action);
        const { data } = getUsersRoleResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: GetProfileActionTypes.ACCOUNT_MANAGEMENT_GET_USER_ROLE_ERROR, error: message });
        } else {
            yield put({ type: GetProfileActionTypes.ACCOUNT_MANAGEMENT_GET_USER_ROLE_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: GetProfileActionTypes.ACCOUNT_MANAGEMENT_GET_USER_ROLE_ERROR, error }),
        ]);
    }
}

function* uploadProfileImg(action) {
    try {
        const { uploadFile } = action.payload;
        const getImgUploadResponse = yield call(uploadFileCompanyInformation, uploadFile);
        const { data } = getImgUploadResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: GetProfileActionTypes.MY_PROFILE_PROFILE_IMAGE_UPLOAD_ERROR, error: message });
        } else {
            const updateData = action.payload;
            updateData.profileImageId = data.id;
            yield all([
                put({ type: GetProfileActionTypes.UPDATE_MY_PROFILE_REQUEST, payload: updateData }),
                put({ type: GetProfileActionTypes.MY_PROFILE_PROFILE_IMAGE_UPLOAD_SUCCESS, data })
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: GetProfileActionTypes.MY_PROFILE_PROFILE_IMAGE_UPLOAD_ERROR, error }),
        ]);
    }
}

function* deleteUserAccountProfile(action) {
    try {
        const userRoleResponse = yield call(deleteUserAccount, action);
        const { data } = userRoleResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: GetProfileActionTypes.ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_ERROR, error: message });
        } else {
            yield put({ type: GetProfileActionTypes.ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: GetProfileActionTypes.ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_ERROR, error }),
        ]);
    }
}

function* updateMyProfile(action) {
    try {
        const getProfileUpdateResponse = yield call(updateUserProfile, action.payload);
        const { data } = getProfileUpdateResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: GetProfileActionTypes.UPDATE_MY_PROFILE_ERROR, error: message });
        } else {
            let signedInUser = Cookies.get('signUserDetails');
            if (signedInUser) {
                signedInUser = JSON.parse(signedInUser);
                signedInUser.firstName = data.firstName;
                signedInUser.lastName = data.lastName;
                if (data.profileImageId) {
                    signedInUser.profileImageId = data.profileImageId;
                    yield put({ type: GetProfileActionTypes.GET_MY_PROFILE_IMAGE_REQUEST, payload: data.profileImageId });
                }

                signedInUser.phoneNumber = data.phoneNumber;
                signedInUser.communicationPref = data.communicationPref;
            } else {
                signedInUser = data;
            }

            Cookies.set('signUserDetails', signedInUser);

            yield all([
                put({ type: GetProfileActionTypes.GET_DEFAULT_PROFILE, data }),
                put({ type: GetProfileActionTypes.UPDATE_MY_PROFILE_SUCCESS, data }),
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: GetProfileActionTypes.UPDATE_MY_PROFILE_ERROR, error }),
        ]);
    }
}

function* getProfileImage(action) {
    try {
        const getImageResponse = yield call(getProfileImg, action);

        if (!getImageResponse) {
            const { message } = 'Error in fetching image';
            yield put({ type: GetProfileActionTypes.GET_MY_PROFILE_IMAGE_ERROR, error: message });
        } else {
            const data = getImageResponse;
            yield put({ type: GetProfileActionTypes.GET_MY_PROFILE_IMAGE_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: GetProfileActionTypes.GET_MY_PROFILE_IMAGE_ERROR, error }),
        ]);
    }
}

export default function* watchMyProfileSaga() {
    yield all([
        takeLatest(GetProfileActionTypes.GET_PROFILE_REQUEST, getRole),
        takeLatest(GetProfileActionTypes.ACCOUNT_MANAGEMENT_GET_USER_ROLE_REQUEST, getUserRole),
        takeLatest(GetProfileActionTypes.MY_PROFILE_PROFILE_IMAGE_UPLOAD_REQUEST, uploadProfileImg),
        takeLatest(GetProfileActionTypes.ACCOUNT_MANAGEMENT_DELETE_USER_ROLE_REQUEST, deleteUserAccountProfile),
        takeLatest(GetProfileActionTypes.UPDATE_MY_PROFILE_REQUEST, updateMyProfile),
        takeLatest(GetProfileActionTypes.GET_MY_PROFILE_IMAGE_REQUEST, getProfileImage),
        takeLatest(GetProfileActionTypes.UPDATE_PROFILE_DATA_REQUEST, updateMyProfileData)
    ]);
}
