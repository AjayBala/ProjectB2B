import RestClient from './RestClient';
import { OverstockRestConfig, defaultHeaders } from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';

export function getUsersList(action) {
    const config = {};
    const { businessId, pageIndex = 1, size = 10, order = 'asc', orderByField = 'firstName' } = action.payload;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.GET_USERS_LIST}${businessId}${ApiConstants.DATA_SET}${pageIndex}${ApiConstants.SIZE}${size}${ApiConstants.ORDER_BY}${orderByField}/${ApiConstants.ORDER}${order}`;
    config.headers = defaultHeaders;

    return RestClient.get(config)
        .then(json => json);
}

export function deleteInvitedUserAccount(data) {
    const config = {};
    const userId = data.payload.userId;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.USER_MANAGEMENT_DELETE_INVITEDUSER}${userId}`;
    config.headers = defaultHeaders;

    return RestClient.delete(config)
        .then(json => json);
}

export function inviteUserIntoCompany(data) {
    const config = {};
    config.data = data.payload;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.USER_MANAGEMENT_INVITE_USER}`;
    config.headers = defaultHeaders;

    return RestClient.post(config)
        .then(json => json);
}

export function editUserInCompany(data) {
    const config = {};
    config.data = data.payload;
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.USER_MANAGEMENT_CUSTOMER_ID}${data.payload.id}`;
    config.headers = defaultHeaders;

    return RestClient.put(config)
        .then(json => json);
}

export default {
    getUsersList,
    deleteInvitedUserAccount,
    inviteUserIntoCompany,
    editUserInCompany
 };
