import * as types from '../actionTypes/GroupManagementActionTypes';

export default function(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case types.GET_USER_GROUPS_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.GET_USER_GROUPS_SUCCESS:
            newState = Object.assign({}, state);
            const { userGroups, totalGroups } = action.data;
            newState.userGroups = userGroups;
            newState.totalGroups = totalGroups;

        return newState;

        case types.GET_USER_GROUPS_ERROR:
            newState = Object.assign({}, state);
            newState.payload = action.error;

        return newState;

        case types.GET_PROFILE_IMAGE_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.GET_PROFILE_IMAGE_SUCCESS:
            newState = Object.assign({}, state);
            newState.profileImageResp = action.data;

        return newState;

        case types.GET_PROFILE_IMAGE_ERROR:
            newState = Object.assign({}, state);
            newState.payload = action.error;

        return newState;

        case types.GET_GROUPS_LIST_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.GET_GROUPS_LIST_SUCCESS:
            newState = Object.assign({}, state);
            newState.groupList = action.groups;

        return newState;

        case types.GET_GROUPS_LIST_ERROR:
            newState = Object.assign({}, state);
            newState.payload = action.error;

        return newState;

        case types.DELETE_GROUP_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.DELETE_GROUP_SUCCESS:
            newState = Object.assign({}, state);
            newState.profileImageResp = action.data;

        return newState;

        case types.DELETE_GROUP_ERROR:
            newState = Object.assign({}, state);
            newState.payload = action.error;

        return newState;

        case types.UPDATE_USER_BETWEEN_GROUPS_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.UPDATE_USER_BETWEEN_GROUPS_SUCCESS:
            newState = Object.assign({}, state);
            newState.updateUserSuccess = action.data;

        return newState;

        case types.UPDATE_USER_BETWEEN_GROUPS_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.TRIGGER_CREATE_GROUP:
            newState = Object.assign({}, state);
            newState.isCreateGroupClicked = action.payload;

        return newState;

        case types.CREATE_GROUP_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.CREATE_GROUP_SUCCESS:
            newState = Object.assign({}, state);
            newState.createSuccess = action.data;
            newState.clearGroupName = true;

        return newState;

        case types.CREATE_GROUP_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.EDIT_GROUP_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.EDIT_GROUP_SUCCESS:
            newState = Object.assign({}, state);
            newState.editSuccess = action.data;
            newState.clearGroupName = true;

        return newState;

        case types.EDIT_GROUP_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.REMOVE_USER_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.REMOVE_USER_SUCCESS:
            newState = Object.assign({}, state);
            newState.editSuccess = action.data;

        return newState;

        case types.REMOVE_USER_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.GROUP_MANAGEMENT_UPDATE_MEMBER_ERROR:
        newState = Object.assign({}, state);
        newState.error = action.error;

        return newState;

        case types.RESET_GROUP_SERVER_ERROR_MSG:
        newState = Object.assign({}, state);
        newState.error = action.payload;

        return newState;

        case types.SET_CLEAR_GROUP_NAME:
        newState = Object.assign({}, state);
        newState.clearGroupName = action.payload;

        return newState;

        default:
            return state;
    }
}
