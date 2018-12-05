import _isEmpty from 'lodash/isEmpty';
import * as types from '../actionTypes/UserManagementActionTypes';

export default function(state = {}, action) {
    let newState = {};

    switch (action.type) {
        case types.USER_MANAGEMENT_MEMBERS_LIST_REQUEST:
        newState = Object.assign({}, state);
        const data = action.data;
        newState.userList = data;

            return newState;

        case types.USER_MANAGEMENT_MEMBERS_LIST_SUCCESS:
        newState = Object.assign({}, state);
        const dataValue = action.data.UserDetail;
        newState.userListResponse = dataValue;

            return newState;

        case types.USER_MANAGEMENT_MEMBERS_LIST_ERROR:
        newState = Object.assign({}, state);
        newState.error = action.error;

            return newState;

        case types.ENABLE_ACTION_BUTTONS:
            newState.isButtonEnabled = true;

            return newState;

        case types.GET_USERS_LIST_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

            return newState;

        case types.GET_USERS_LIST_SUCCESS:
            newState = Object.assign({}, state);
            const { onScroll } = action.data;
            newState.scrolled = false;
            if (onScroll && !_isEmpty(newState.usersList)) {
                const { usersInfo = [] } = action.data;
                const { usersInfo: previousMembersList } = newState.usersList;
                const addMembersOnScroll = [...previousMembersList, ...usersInfo];
                action.data.usersInfo = addMembersOnScroll;
                newState.usersList = action.data;
            } else {
                newState.usersList = action.data;
            }

        return newState;

        case types.GET_USERS_LIST_FAILED:
            newState = Object.assign({}, state);
            newState.error = action.error;

            return newState;

        case types.GET_USER_LIST_DATA:
            newState = Object.assign({}, state);
            newState.viewProfileDetail = action.payload;

            return newState;

            case types.GET_GROUP_MANAGEMENT_USER_DATA:
            newState = Object.assign({}, state);
            newState.viewProfileDetail = action.payload;

            return newState;

       case types.USER_MANAGEMENT_DELETE_USER_SUCCESS:
            newState = Object.assign({}, state);
            const deleteUserSuccess = action.data;
            newState.userDataSuccess = deleteUserSuccess;

             return newState;

       case types.USER_MANAGEMENT_DELETE_USER_ERROR:
           newState = Object.assign({}, state);
           newState.error = action.error;

            return newState;

        case types.USER_MANAGEMENT_DELETE_USER_REQUEST:
           newState = Object.assign({}, state);
           newState.payload = action.payload;

            return newState;

        case types.ADD_USER_EVENT_ENABLE:
            newState = Object.assign({}, state);
            newState.addUserEventEnable = action.payload;

            return newState;

        case types.USER_MANAGEMENT_DELETE_INVITEDUSER_SUCCESS:
            newState = Object.assign({}, state);
            const deleteInvitedUserSuccess = action.data;
            newState.userDataSuccess = deleteInvitedUserSuccess;

            return newState;

        case types.USER_MANAGEMENT_DELETE_INVITEDUSER_ERROR:
           newState = Object.assign({}, state);
           newState.error = action.error;

            return newState;

        case types.USER_MANAGEMENT_DELETE_INVITEDUSER_REQUEST:
           newState = Object.assign({}, state);
           newState.payload = action.payload;

             return newState;

        case types.INVITE_USER_INTO_COMPANY_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

            return newState;

        case types.INVITE_USER_INTO_COMPANY_SUCCESS:
            newState = Object.assign({}, state);
            newState.inviteUserInfo = action.data;
            newState.pageIndex = 1;
            newState.size = 10;
            newState.scrolled = false;
            newState.order = 'asc';

            return newState;

        case types.INVITE_USER_INTO_COMPANY_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

            return newState;

        case types.SET_EDIT_INITIAL_VALUES:
        newState = Object.assign({}, state);
        newState.userEditInitialValues = action.payload;

        return newState;

        case types.EDIT_USER_IN_COMPANY_REQUEST:
        newState = Object.assign({}, state);
        newState.payload = action.payload;

        return newState;

        case types.EDIT_USER_IN_COMPANY_SUCCESS:
        newState = Object.assign({}, state);
        newState.editUserInfo = action.data;
        newState.pageIndex = 1;
        newState.size = 10;
        newState.scrolled = false;
        newState.order = 'asc';

        return newState;

        case types.EDIT_USER_IN_COMPANY_ERROR:
        newState = Object.assign({}, state);
        newState.error = action.error;

        return newState;

        case types.EDIT_ROW_EVENT_ID:
        newState = Object.assign({}, state);
        newState.editRowEventId = action.payload;

        return newState;

        case types.RESET_USER_SERVER_ERROR_MSG:
        newState = Object.assign({}, state);
        newState.error = action.payload;

        return newState;

        case types.GET_DEFAULT_LAZYLOAD_PARAMS:
        newState = Object.assign({}, state);
        newState.pageIndex = 1;
        newState.size = 10;
        newState.scrolled = false;
        newState.order = 'asc';
        newState.usersList = {};

        return newState;

        case types.IS_SCROLL_DOWN:
        newState = Object.assign({}, state);
        const { scrolled, pageIndex } = action.payload;
        newState.scrolled = scrolled;
        newState.pageIndex = pageIndex;
        newState.order = 'asc';

        return newState;

        case types.GET_SORTED_USER_LIST:
        newState = Object.assign({}, state);
        newState.sortedUserList = action.payload;

        return newState;

        case types.USER_MANAGEMENT_UPDATE_MEMBER_ERROR:
        newState = Object.assign({}, state);
        newState.error = action.error;

        return newState;


        default:
            return state;
    }
}
