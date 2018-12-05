import { takeLatest, put, call, all } from 'redux-saga/effects';
import _forEach from 'lodash/forEach';
import { deleteUserAccount, getProfileImg } from '../api/MyProfileApi';
import { getUsersList, deleteInvitedUserAccount, inviteUserIntoCompany, editUserInCompany } from '../api/UserManagementApi';
import * as UserManagementActionTypes from '../actionTypes/UserManagementActionTypes';

function* getDetailedUsersList(action) {
    try {
        const getUsersResponse = yield call(getUsersList, action);
        const { data } = getUsersResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: UserManagementActionTypes.GET_USERS_LIST_FAILED, error: message });
        } else {
            const { onScroll } = action.payload;
            data.onScroll = onScroll;
            const profileImgDetails = [];
            const setUndefined = 0;
            const setFalse = 'fasle';
            let profileImageResponse = [];

            // Getting the array profile image ids
            _forEach(data.usersInfo, obj => {
                if (obj.profileImageId) {
                    profileImgDetails.push({ id: obj.id, profileImageId: obj.profileImageId });
                }
            });

            // Triggering the profile image call only for the users with profile image ids
            profileImageResponse = yield profileImgDetails.map(obj => (
                call(getProfileImg, { payload: obj.profileImageId })
            ));

            // Binding the profile image response to the user list
            _forEach(profileImageResponse, obj => {
                _forEach(data.usersInfo, value => {
                    if (value.profileImageId === obj.imgId) {
                        value.profileImgResponse = obj.imgData;
                    }
                });
            });

            yield all([
                put({ type: UserManagementActionTypes.GET_USERS_LIST_SUCCESS, data }),
                put({ type: UserManagementActionTypes.EDIT_ROW_EVENT_ID, setUndefined }),
                put({ type: UserManagementActionTypes.ADD_USER_EVENT_ENABLE, setFalse }),
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: UserManagementActionTypes.GET_USERS_LIST_FAILED, error }),
        ]);
    }
}

function* DeleteUsersPermission(action) {
    try {
        const deleteUsersResponse = yield call(deleteUserAccount, action);
        const { data = {} } = deleteUsersResponse;
        if (data.error) {
            const { message } = deleteUsersResponse;
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_ERROR, error: message });
        } else {
            const payload = { businessId: action.payload.bussinessId, pageIndex: 1, size: 10, onScroll: false, order: 'asc', orderByField: 'firstName' };
            yield all([
                put({ type: UserManagementActionTypes.DELETE_USER_SUCCESS, data }),
                put({ type: UserManagementActionTypes.GET_USERS_LIST_REQUEST, payload }),
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_ERROR, error }),
        ]);
    }
}

function* DeleteInvitedUsersPermission(action) {
    try {
        const deleteInvitedUsersResponse = yield call(deleteInvitedUserAccount, action);
        const { data = {} } = deleteInvitedUsersResponse;
        if (data.error) {
            const { message } = deleteInvitedUsersResponse;
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_INVITEDUSER_ERROR, error: message });
        } else {
            const payload = { businessId: action.payload.bussinessId, pageIndex: 1, size: 10, onScroll: false, order: 'asc', orderByField: 'firstName' };
            yield all([
                put({ type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_INVITEDUSER_SUCCESS, data }),
                put({ type: UserManagementActionTypes.GET_USERS_LIST_REQUEST, payload }),
            ]);
}
            // yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_INVITEDUSER_SUCCESS, data });
    } catch (error) {
        yield all([
            put({ type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_INVITEDUSER_ERROR, error }),
        ]);
    }
}

function* inviteUserIntoCompanyRequest(action) {
    try {
        const inviteUserResponse = yield call(inviteUserIntoCompany, action);
        const { data = {} } = inviteUserResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: UserManagementActionTypes.INVITE_USER_INTO_COMPANY_ERROR, error: message });
        } else {
            const payload = { businessId: action.payload.companyInfo.id, pageIndex: 1, size: 10, onScroll: false, order: 'asc', orderByField: 'firstName' };
            yield all([
                put({ type: UserManagementActionTypes.INVITE_USER_INTO_COMPANY_SUCCESS, data }),
                put({ type: UserManagementActionTypes.GET_USERS_LIST_REQUEST, payload }),
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: UserManagementActionTypes.INVITE_USER_INTO_COMPANY_ERROR, error }),
        ]);
    }
}

function* editUserInCompanyRequest(action) {
    try {
        const editUserResponse = yield call(editUserInCompany, action);
        const { data = {} } = editUserResponse;
        if (data.error) {
            const { message } = editUserResponse;
            yield put({ type: UserManagementActionTypes.EDIT_USER_IN_COMPANY_ERROR, error: message });
        } else {
            const payload = { businessId: action.payload.companyInfo.id, pageIndex: 1, size: 10, onScroll: false, order: 'asc', orderByField: 'firstName' };
            yield all([
                put({ type: UserManagementActionTypes.EDIT_USER_IN_COMPANY_SUCCESS, data }),
                put({ type: UserManagementActionTypes.GET_USERS_LIST_REQUEST, payload }),
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: UserManagementActionTypes.EDIT_USER_IN_COMPANY_ERROR, error }),
        ]);
    }
}

export default function* watchUserManagementSaga() {
    yield all([
        takeLatest(UserManagementActionTypes.GET_USERS_LIST_REQUEST, getDetailedUsersList),
        takeLatest(UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_REQUEST, DeleteUsersPermission),
        takeLatest(UserManagementActionTypes.USER_MANAGEMENT_DELETE_INVITEDUSER_REQUEST, DeleteInvitedUsersPermission),
        takeLatest(UserManagementActionTypes.INVITE_USER_INTO_COMPANY_REQUEST, inviteUserIntoCompanyRequest),
        takeLatest(UserManagementActionTypes.EDIT_USER_IN_COMPANY_REQUEST, editUserInCompanyRequest)
    ]);
}
