import { takeLatest, put, call, all } from 'redux-saga/effects';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';
import _map from 'lodash/map';
import _compact from 'lodash/compact';
import _flatMap from 'lodash/flatMap';
// import _map from 'lodash/map';
import _orderBy from 'lodash/orderBy';
import * as GroupManagementActionTypes from '../actionTypes/GroupManagementActionTypes';
import { getUserGroupsData, updateUserGroup, deleteGroupData, createGroupCall, editGroupCall, getGroupsList, removeUserData } from '../api/GroupManagementApi';
import { getProfileImg } from '../api/MyProfileApi';

const resultData = [];
const filterImageIDs = data => {
    _map(data, item => {
        if (item.users) {
            _map(item.users, userData => {
                if (userData.profileImageId) {
                    resultData.push(userData.profileImageId);
                }
            });
        }
        if (item.userGroups) {
            filterImageIDs(item.userGroups);
        }
    });

    return resultData;
};

const setImgData = (data, imgResp) => {
    return _forEach(data, item => {
        if (item.users) {
            _forEach(item.users, userData => {
                if (userData.profileImageId === imgResp.imgId) {
                    userData.profileImgResponse = imgResp.imgData;
                }
            });
        }
        if (item.userGroups) {
            setImgData(item.userGroups, imgResp);
        }
    });
};

function* GetUserGroups(action) {
    try {
        const getUserGroupsResponse = yield call(getUserGroupsData, action);
        const { data } = getUserGroupsResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: GroupManagementActionTypes.GET_USER_GROUPS_ERROR, error: message });
        } else {
            let profileImageResponse = [];

            const profileImgIds = filterImageIDs(data.userGroups);
            if (profileImgIds.length) {
                profileImageResponse = yield profileImgIds.map(id => (
                    call(getProfileImg, { payload: id })
                ));
            }
            _forEach(profileImageResponse, obj => {
                setImgData(data.userGroups, obj);
            });


            yield put({ type: GroupManagementActionTypes.GET_USER_GROUPS_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: GroupManagementActionTypes.GET_USER_GROUPS_ERROR, error }),
        ]);
    }
}
function* deleteGroup(action) {
    try {
        const getUserGroupsResponse = yield call(deleteGroupData, action);
        const { data } = getUserGroupsResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: GroupManagementActionTypes.DELETE_GROUP_ERROR, error: message });
        } else {
            const { businessId } = action.payload;
            yield all([
                yield put({ type: GroupManagementActionTypes.DELETE_GROUP_SUCCESS, data }),
                put({ type: GroupManagementActionTypes.GET_USER_GROUPS_REQUEST, payload: businessId }),
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: GroupManagementActionTypes.DELETE_GROUP_ERROR, error }),
        ]);
    }
}

function* removeUser(action) {
    try {
        const getUserGroupsResponse = yield call(removeUserData, action);
        const { data } = getUserGroupsResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: GroupManagementActionTypes.REMOVE_USER_ERROR, error: message });
        } else {
            const { businessId } = action.payload;
            yield all([
                put({ type: GroupManagementActionTypes.REMOVE_USER_SUCCESS, data }),
                put({ type: GroupManagementActionTypes.GET_USER_GROUPS_REQUEST, payload: businessId }),
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: GroupManagementActionTypes.REMOVE_USER_ERROR, error }),
        ]);
    }
}

function* GetProfileImage(action) {
    try {
        const getProfileImageResponse = yield call(getProfileImg, action);
        const data = {
            imageID: action.payload,
            imgData: getProfileImageResponse
        };
        if (data.error) {
            const message = 'Error in fetching image';
            yield put({ type: GroupManagementActionTypes.GET_PROFILE_IMAGE_ERROR, error: message });
        } else {
            yield put({ type: GroupManagementActionTypes.GET_PROFILE_IMAGE_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: GroupManagementActionTypes.GET_PROFILE_IMAGE_ERROR, error }),
        ]);
    }
}

function* CreateGroup(action) {
    try {
        const createGroupResponse = yield call(createGroupCall, action);
        const { data } = createGroupResponse;
        if (data.error) {
            const message = data.message;
            yield put({ type: GroupManagementActionTypes.CREATE_GROUP_ERROR, error: message });
        } else {
            const { businessId } = action.payload;
            yield all([
                put({ type: GroupManagementActionTypes.CREATE_GROUP_SUCCESS, data }),
                put({ type: GroupManagementActionTypes.GET_USER_GROUPS_REQUEST, payload: businessId }),
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: GroupManagementActionTypes.CREATE_GROUP_ERROR, error }),
        ]);
    }
}

function* UpdateGroup(action) {
    try {
        const editGroupResponse = yield call(editGroupCall, action);
        const { data = {} } = editGroupResponse;
        if (data.error) {
            const message = 'Error in  Editing Group';
            yield put({ type: GroupManagementActionTypes.EDIT_GROUP_ERROR, error: message });
        } else {
            const { businessId } = action.payload;
            yield all([
                put({ type: GroupManagementActionTypes.EDIT_GROUP_SUCCESS, data }),
                put({ type: GroupManagementActionTypes.GET_USER_GROUPS_REQUEST, payload: businessId }),
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: GroupManagementActionTypes.EDIT_GROUP_ERROR, error }),
        ]);
    }
}

function* UpdateUserInGroup(action) {
    try {
        const updateUserGroupResponse = yield call(updateUserGroup, action);
        const { data } = updateUserGroupResponse;
        const { bussinessId } = action.payload;
        if (data.error) {
            const { message } = data;
            yield all([
             put({ type: GroupManagementActionTypes.GET_USER_GROUPS_REQUEST, payload: bussinessId }),
             put({ type: GroupManagementActionTypes.UPDATE_USER_BETWEEN_GROUPS_ERROR, error: message })
            ]);
        } else {
            yield all([
             put({ type: GroupManagementActionTypes.GET_USER_GROUPS_REQUEST, payload: bussinessId }),
             put({ type: GroupManagementActionTypes.UPDATE_USER_BETWEEN_GROUPS_SUCCESS, data })
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: GroupManagementActionTypes.UPDATE_USER_BETWEEN_GROUPS_ERROR, error }),
        ]);
    }
}

function* GetGroupsListRequest(action) {
    try {
        const getGroupsListResponse = yield call(getGroupsList, action);
        const { data } = getGroupsListResponse;
        let { groups = [] } = data;
        if (groups && !_isEmpty(groups)) {
            groups = groups.map(Obj => {
                Obj.value = Obj.groupName;
                Obj.text = Obj.groupName;
                delete Obj.groupName;
                delete Obj.createdDate;
                delete Obj.lastModifiedDate;
                delete Obj.parentGroup;

                return Obj;
            });
            groups = _orderBy(groups, [groups => groups.value.toLowerCase()], ['asc']);
        } else {
            const noGroups = { text: 'Unassaigned', value: 'Unassaigned' };
            groups.push(noGroups);
        }
        yield all([
            put({ type: GroupManagementActionTypes.GET_GROUPS_LIST_SUCCESS, groups })
        ]);
    } catch (error) {
        yield all([
            put({ type: GroupManagementActionTypes.GET_GROUPS_LIST_ERROR, error }),
        ]);
    }
}

export default function* watchGroupManagementSaga() {
    yield all([
        takeLatest(GroupManagementActionTypes.GET_USER_GROUPS_REQUEST, GetUserGroups),
        takeLatest(GroupManagementActionTypes.GET_GROUPS_LIST_REQUEST, GetGroupsListRequest),
        takeLatest(GroupManagementActionTypes.GET_PROFILE_IMAGE_REQUEST, GetProfileImage),
        takeLatest(GroupManagementActionTypes.CREATE_GROUP_REQUEST, CreateGroup),
        takeLatest(GroupManagementActionTypes.UPDATE_USER_BETWEEN_GROUPS_REQUEST, UpdateUserInGroup),
        takeLatest(GroupManagementActionTypes.DELETE_GROUP_REQUEST, deleteGroup),
        takeLatest(GroupManagementActionTypes.REMOVE_USER_REQUEST, removeUser),
        takeLatest(GroupManagementActionTypes.EDIT_GROUP_REQUEST, UpdateGroup)
    ]);
}
