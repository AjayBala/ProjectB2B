import * as GroupManagementActionTypes from '../actionTypes/GroupManagementActionTypes';

export const getGroupsRequest = values => ({
    type: GroupManagementActionTypes.GET_USER_GROUPS_REQUEST,
    payload: values,
});

export const getGroupsListRequest = values => ({
    type: GroupManagementActionTypes.GET_GROUPS_LIST_REQUEST,
    payload: values,
});
export const getProfileImageRequest = values => ({
    type: GroupManagementActionTypes.GET_PROFILE_IMAGE_REQUEST,
    payload: values,
});

export const deleteGroupRequest = obj => ({
    type: GroupManagementActionTypes.DELETE_GROUP_REQUEST,
    payload: obj,
});

export const moveUserBetweenGroups = values => ({
    type: GroupManagementActionTypes.UPDATE_USER_BETWEEN_GROUPS_REQUEST,
    payload: values,
});

export const triggerCreateGroup = values => ({
    type: GroupManagementActionTypes.TRIGGER_CREATE_GROUP,
    payload: values,
});

export const createGroupRequest = values => ({
    type: GroupManagementActionTypes.CREATE_GROUP_REQUEST,
    payload: values,
});

export const editGroupRequest = values => ({
    type: GroupManagementActionTypes.EDIT_GROUP_REQUEST,
    payload: values,
});

export const removeUserRequest = values => ({
    type: GroupManagementActionTypes.REMOVE_USER_REQUEST,
    payload: values,
});

export const resetGroupServerErrorAlert = value => ({
    type: GroupManagementActionTypes.RESET_GROUP_SERVER_ERROR_MSG,
    payload: value,
});

export const setClearGroupName = (value = true) => ({
    type: GroupManagementActionTypes.SET_CLEAR_GROUP_NAME,
    payload: value,
});

export default {
    getGroupsRequest,
    getGroupsListRequest,
    getProfileImageRequest,
    triggerCreateGroup,
    createGroupRequest,
    moveUserBetweenGroups,
    deleteGroupRequest,
    editGroupRequest,
    removeUserRequest,
    resetGroupServerErrorAlert
};
