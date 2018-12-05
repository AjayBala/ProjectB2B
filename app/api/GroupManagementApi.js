import RestClient from './RestClient';
import { OverstockRestConfig, defaultHeaders } from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';

export function getUserGroupsData(data) {
    const config = {};
    config.data = data.payload;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.GROUP_MANAGEMENT}${ApiConstants.USER_GROUP}${ApiConstants.BUSINESS_ID}${data.payload}`;
    config.headers = defaultHeaders;

    return RestClient.get(config)
        .then(json => json);
}


export function getGroupsList(data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.NEW_GROUP_MANAGEMENT}${ApiConstants.BUSINESS_ID}${data.payload}`;
    config.headers = defaultHeaders;

    return RestClient.get(config)
        .then(json => json);
}
export function deleteGroupData (data) {
    const config = {};
    const { businessId, groupId } = data.payload;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.GROUP_MANAGEMENT_BUSSINESS_ID}${businessId}${ApiConstants.GROUP_ID}${groupId}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.delete(config)
        .then(json => json);
}

export function updateUserGroup(data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.GROUP_MANAGEMENT}${ApiConstants.USER_GROUP}${ApiConstants.BUSINESS_ID}${data.payload.bussinessId}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.put(config)
        .then(json => json);
}

export function moveUserbetweenGroups(data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.GROUP_MANAGEMENT}${ApiConstants.USER_GROUP}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.put(config)
        .then(json => json);
}

export function createGroupCall(data) {
    const config = {};
    config.data = data.payload;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.GROUP_MANAGEMENT_CREATE_GROUP}`;
    config.headers = defaultHeaders;

    return RestClient.post(config)
        .then(json => json);
}

export function editGroupCall(data) {
    const config = {};
    config.data = data.payload;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.GROUP_MANAGEMENT_UPDATE_GROUP}${data.payload.id}`;
    config.headers = defaultHeaders;

    return RestClient.put(config)
        .then(json => json);
}

export function removeUserData(data) {
    const config = {};
    const { businessId } = data.payload;
    config.data = data.payload;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.GROUP_MANAGEMENT_REMOVE_USER}/${businessId}`;
    config.headers = defaultHeaders;

    return RestClient.delete(config)
        .then(json => json);
}
export default {
    getUserGroupsData,
    getGroupsList,
    deleteGroupData,
    createGroupCall,
    editGroupCall,
    removeUserData
};
