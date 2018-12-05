import * as UserManagementActionTypes from '../actionTypes/UserManagementActionTypes';

export const userManagementMembersListRequest = (values = {}) => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_REQUEST,
    payload: values,
});

export const userManagementMembersListSuccess = value => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_SUCCESS,
    payload: value,
});

export const userManagementMembersListError = value => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_ERROR,
    payload: value,
});

export const enableButtons = value => ({
    type: UserManagementActionTypes.ENABLE_ACTION_BUTTONS,
    payload: value
});

export const getUsersList = data => ({
    type: UserManagementActionTypes.GET_USERS_LIST_REQUEST,
    payload: data
});

export const getUserListData = data => ({
    type: UserManagementActionTypes.GET_USER_LIST_DATA,
    payload: data
});

export const getGroupManagementUserData = data => ({
    type: UserManagementActionTypes.GET_GROUP_MANAGEMENT_USER_DATA,
    payload: data
});

export const listOfUsersDetails = data => ({
    type: UserManagementActionTypes.GET_USERS_LIST_SUCCESS,
    usersDetails: data
});

export const usersListErrorMsg = error => ({
    type: UserManagementActionTypes.GET_USERS_LIST_FAILED,
    payload: error
});

export const userManagementDeleteUserRequest = Values => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_REQUEST,
    payload: Values,
});

export const userManagementDeleteUserSuccess = Values => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_SUCCESS,
    payload: Values,
});

export const userManagementDeleteUserError = Values => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_ERROR,
    payload: Values,
});

export const addUserEventEnable = value => ({
    type: UserManagementActionTypes.ADD_USER_EVENT_ENABLE,
    payload: value,
});


export const userManagementdeleteInivtedUserRequest = values => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_INVITEDUSER_REQUEST,
    payload: values,
});

export const userManagementdeleteInivtedUserSuccess = values => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_INVITEDUSER_SUCCESS,
    payload: values,
});

export const userManagementdeleteInivtedUserError = values => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_INVITEDUSER_ERROR,
    payload: values,
});

export const inviteUserIntoCompanyRequest = values => ({
    type: UserManagementActionTypes.INVITE_USER_INTO_COMPANY_REQUEST,
    payload: values,
});

export const setEditInitialValues = values => ({
    type: UserManagementActionTypes.SET_EDIT_INITIAL_VALUES,
    payload: values,
});

export const editUserInCompanyRequest = values => ({
    type: UserManagementActionTypes.EDIT_USER_IN_COMPANY_REQUEST,
    payload: values,
});

export const editRowEventId = value => ({
    type: UserManagementActionTypes.EDIT_ROW_EVENT_ID,
    payload: value,
});

export const resetUserServerErrorAlert = value => ({
    type: UserManagementActionTypes.RESET_USER_SERVER_ERROR_MSG,
    payload: value,
});

export const getDefaultLazyLoadParams = value => ({
    type: UserManagementActionTypes.GET_DEFAULT_LAZYLOAD_PARAMS,
    payload: value,
});
export const isScrollDown = (value = {}) => ({
    type: UserManagementActionTypes.IS_SCROLL_DOWN,
    payload: value,
});

export const getSortedUserList = value => ({
    type: UserManagementActionTypes.GET_SORTED_USER_LIST,
    payload: value,
});

export default {
    userManagementMembersListRequest,
    userManagementMembersListSuccess,
    userManagementMembersListError,
    enableButtons,
    getUsersList,
    getUserListData,
    getGroupManagementUserData,
    listOfUsersDetails,
    addUserEventEnable,
    usersListErrorMsg,
    userManagementDeleteUserRequest,
    userManagementDeleteUserSuccess,
    userManagementDeleteUserError,
    userManagementdeleteInivtedUserRequest,
    userManagementdeleteInivtedUserSuccess,
    userManagementdeleteInivtedUserError,
    inviteUserIntoCompanyRequest,
    editUserInCompanyRequest,
    editRowEventId,
    getDefaultLazyLoadParams,
    getSortedUserList
};
